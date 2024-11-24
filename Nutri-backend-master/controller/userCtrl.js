const User = require("../models/userModel");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const Coupon = require("../models/couponModel");
const Order = require("../models/orderModel");
const uniqid = require("uniqid");

const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const validateMongoDbId = require("../utils/validateMongodbId");
const { generateRefreshToken } = require("../config/refreshtoken");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const sendEmail = require("./emailCtrl");
const { log } = require("console");
const OtpModel = require("../models/OtpModel");
const nodemailer = require("nodemailer");

const sendSignupOTPEmail = require("./sendSignupOTPEmail");
const expressAsyncHandler = require("express-async-handler");
const Newsletter = require("../models/NewsletterModel");
// Create a User ----------------------------------------------

const createUser = asyncHandler(async (req, res) => {
  try {
    const { firstname, lastname, email, mobile, password } = req.body;

    // Check if an OTP document with the same email exists
    let existingOTPDocument = await OtpModel.findOne({ email });

    // Check if the email is already taken by a user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User Already Exists!" });
    }

    if (existingOTPDocument) {
      // If an existing OTP document is found, delete it
      await existingOTPDocument.remove();
    }

    // Generate a random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Send the OTP to the user's email
    await sendSignupOTPEmail({
      firstname, // Pass the firstname from req.body
      lastname, // Pass the lastname from req.body
      email, // Pass the email from req.body
      mobile, // Pass the mobile from req.body
      password, // Pass the password from req.body
      to: email, // 'to' should be the user's email address
      otp: otp,
    });

    // Respond with a success message indicating that OTP has been sent
    res.status(200).json({ message: "OTP has been sent to your email" });
  } catch (error) {
    // Handle any errors that occurred during OTP sending
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Error sending OTP" });
  }
});


const verifyOTP = asyncHandler(async (req, res) => {
  try {
    const { otp } = req.body;

    // Find the OTP document in the database
    const existingOTPDocument = await OtpModel.findOne({ otp });

    // Check if the OTP document exists
    if (!existingOTPDocument) {
      return res.status(400).json({ message: "Invalid OTP!" });
    }

    // Extract user details from the OTP document
    const { firstname, lastname, email, mobile, password } = existingOTPDocument;

    // Create the user using the extracted details
    const newUser = new User({
      firstname,
      lastname,
      email,
      mobile,
      password,
    });

    // Save the new user to the database
    await newUser.save();

    // Remove the OTP document after creating the user
    await existingOTPDocument.remove();

    // Respond with a success message indicating that the user has been created
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    // Handle any errors that occurred during user creation
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
});


const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const findUser = await User.findOne({ email });

  if (findUser) {
    // Check if the password matches
    if (await findUser.isPasswordMatched(password)) {
      const refreshToken = await generateRefreshToken(findUser._id);
      await User.findByIdAndUpdate(
        findUser.id,
        { refreshToken: refreshToken },
        { new: true }
      );

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000,
      });

      return res.json({
        _id: findUser._id,
        firstname: findUser.firstname,
        lastname: findUser.lastname,
        email: findUser.email,
        mobile: findUser.mobile,
        token: generateToken(findUser._id),
      });
    } else {
      // If the password is incorrect
      return res.status(404).json({ message: "Wrong password. Please try again" });
    }
  } else {
    // If the user does not exist
    throw new Error("Invalid Credentials");
  }
});



const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if user exists or not
  const findAdmin = await User.findOne({ email });
  if (findAdmin.role !== "admin") throw new Error("Not Authorised");
  if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findAdmin?._id);
    const updateuser = await User.findByIdAndUpdate(
      findAdmin.id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findAdmin?._id,
      firstname: findAdmin?.firstname,
      lastname: findAdmin?.lastname,
      email: findAdmin?.email,
      mobile: findAdmin?.mobile,
      token: generateToken(findAdmin?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});


const subscribeNewsletterCtrl = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the email is already subscribed
    const existingSubscription = await Newsletter.findOne({ email });
    if (existingSubscription) {
      return res.status(400).json({ message: "Email is already subscribed to the newsletter." });
    }

    // Save the new subscription
    const newSubscription = new Newsletter({ email });
    await newSubscription.save();

    res.status(200).json({ message: "Subscribed to newsletter successfully" });
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    res.status(500).json({ message: "Error subscribing to newsletter" });
  }
});
// handle refresh token

const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) throw new Error(" No Refresh token present in db or not matched");
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("There is something wrong with refresh token");
    }
    const accessToken = generateToken(user?._id);
    res.json({ accessToken });
  });
});

// logout functionality

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  console.log(cookie,"cookie")
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204); // forbidden
  }
  await User.findOneAndUpdate(refreshToken, {
    refreshToken: "",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204); // forbidden
});

// Update a user

const updatedUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});

// save user Address

const addAddress = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        $set: {
          "shippingInfo.firstName": req.body.firstName,
          "shippingInfo.lastName": req.body.lastName,
          "shippingInfo.address": req.body.address,
          "shippingInfo.county": req.body.county,
          "shippingInfo.phoneNumber": req.body.phoneNumber,
          "shippingInfo.area": req.body.area,
          "shippingInfo.additionalNumber": req.body.additionalNumber,
        },
      },
      {
        new: true,
      }
    );
    res.json(updatedUser.shippingInfo);
  } catch (error) {
    res.status(500).json({ message: "Error updating address" });
  }
});

const getAddress = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    const user = await User.findById(_id);
    res.json(user.shippingInfo);
  } catch (error) {
    res.status(500).json({ message: "Error fetching address" });
  }
});

const updateAddress = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        $set: {
          "shippingInfo.firstName": req.body.firstName,
          "shippingInfo.lastName": req.body.lastName,
          "shippingInfo.address": req.body.address,
          "shippingInfo.county": req.body.county,
          "shippingInfo.phoneNumber": req.body.phoneNumber,
          "shippingInfo.area": req.body.area,
          "shippingInfo.additionalNumber": req.body.additionalNumber,
        },
      },
      {
        new: true,
      }
    );
    res.json(updatedUser.shippingInfo);
  } catch (error) {
    res.status(500).json({ message: "Error updating address" });
  }
});

const saveAddress = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        address: req?.body?.address,
      },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});

// Get all users

const getallUser = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find().populate("wishlist");
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

// Get a single user

const getaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const getaUser = await User.findById(id);
    res.json({
      getaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});



// Get a single user

const deleteaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const deleteaUser = await User.findByIdAndDelete(id);
    res.json({
      deleteaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const blockusr = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    res.json(blockusr);
  } catch (error) {
    throw new Error(error);
  }
});

const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const unblock = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "User UnBlocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  validateMongoDbId(_id);
  const user = await User.findById(_id);
  if (password) {
    user.password = password;
    const updatedPassword = await user.save();
    res.json(updatedPassword);
  } else {
    res.json(user);
  }
});

const forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  try {
    const token = await user.createPasswordResetToken();
    await user.save();

    const resetURL = `
      <div style="text-align: center; font-family: Arial, sans-serif; color: #333;">
        <p style="font-size: 18px; text-align: left; margin: 0;">
          Hi,<br/><br/>
          Please follow this link to reset your password. This link is valid for 10 minutes.<br/><br/>
          <a href='https://www.bestsellersshopke.com/reset-password/${token}' style="text-decoration: none; color: #007bff;">
            Click Here to Reset Your Password
          </a>
        </p>
        <br/><br/>
        <div style="text-align: center; margin-top: 20px;">
          <a href="#" style="text-decoration: none; margin: 0 10px;">
            <img src="https://ci3.googleusercontent.com/meips/ADKq_NZqVjDCetyaSxLtCMYa7niUuyl4cgoeaBe4VLQ9NqTV16--ChwzzhxKlPq0b-3GsPApEXEufLUcQP9n1NMjsklpxss-muJHgMVSTSK1g6HlVzJ80w-U5CANzyd1n3Bko6tQOlBnvNbPE-AS4gc0XA0vWQ=s0-d-e1-ft#https://img.alicdn.com/imgextra/i1/O1CN01xLrsa11jAFvuNTXkJ_!!6000000004507-2-tps-114-114.png" alt="Instagram" style="width: 24px; height: 24px;"/>
          </a>
          <a href="#" style="text-decoration: none; margin: 0 10px;">
            <img src="https://ci3.googleusercontent.com/meips/ADKq_NYz8TKpWEJM8IN900AQLGhE6UU8VSQZsvnbestS4RdRtbIapiFUm28c8phr9ZTqUW5PWgp5mHeQZYRPhEnaCYjEm8a9eQAG0rEcTB1c4DuxFnQ-M6Y_JMw7yhsv_c_7nnWv6oGj549yz31LkKnEmNth0w=s0-d-e1-ft#https://img.alicdn.com/imgextra/i1/O1CN01iBKpmg20cVpshErkl_!!6000000006870-2-tps-114-114.png" alt="Twitter" style="width: 24px; height: 24px;"/>
          </a>
          <a href="#" style="text-decoration: none; margin: 0 10px;">
            <img src="https://ci3.googleusercontent.com/meips/ADKq_NYvOG6omClLtsC-1ShfnxDl0Klcakq_ymaFADtGg4MRwEBrUOJstZp7XGAJ-y4tzV5tAQ8IKMqufie1QRRecaybwks1djpMXkf507F0wKqj5Y1wFBYdpteFWFD3MxVRLXUIVTtdyz0I2t7l-VvcsVN4iQ=s0-d-e1-ft#https://img.alicdn.com/imgextra/i2/O1CN01jle56A1kzq9jUdfNT_!!6000000004755-2-tps-114-114.png" alt="Facebook" style="width: 24px; height: 24px;"/>
          </a>
        </div>
      </div>
    `;

    const data = {
      to: email,
      text: "Hello",
      subject: "Forgot Password Link",
      html: resetURL,  // Corrected to match your sendEmail function's expectation
    };

    await sendEmail(data);
    res.json({ success: true, message: "Password reset token sent successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "An error occurred while sending the password reset token" });
  }
});




const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error(" Token Expired, Please try again later");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.json(user);
});

const getWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const findUser = await User.findById(_id).populate("wishlist");
    res.json(findUser);
  } catch (error) {
    throw new Error(error);
  }
});



const userCart = asyncHandler(async (req, res) => {
  const { productId, quantity, price } = req.body;
  const { _id } = req.user; // Extract the user ID from the authenticated user
  validateMongoDbId(_id);

  try {
    // Find the user by ID
    const user = await User.findById(_id);

    // Check if the product already exists in the user's cart
    const existingCartItemIndex = user.cart.findIndex(
      item => item.productId.toString() === productId
    );

    if (existingCartItemIndex !== -1) {
      // If the product exists in the cart, update the quantity
      user.cart[existingCartItemIndex].quantity += quantity;
    } else {
      // If the product does not exist in the cart, add a new item
      user.cart.push({ productId, quantity, price });
    }

    // Save the updated user document
    await user.save();

    res.json(user.cart); // Send back the updated cart
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ message: 'Server error' });
  }
});


const getUserCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    // Find the user by ID and populate the product details in the cart
    const user = await User.findById(_id).populate("cart.productId");
    
    // Return the cart array from the user document
    res.json(user.cart);
  } catch (error) {
    throw new Error(error);
  }
});


const removeProductFromCart = asyncHandler(async (req, res) => {
  const { _id } = req.user; // User ID
  const { cartItemId } = req.params; // Cart item ID
  validateMongoDbId(_id);

  try {
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const itemIndex = user.cart.findIndex(item => item._id.toString() === cartItemId);

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    user.cart.splice(itemIndex, 1);

    await user.save();

    res.json({ message: 'Product removed from cart', cart: user.cart });
  } catch (error) {
    console.error('Error removing product from cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


const emptyCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    // Find the user by ID
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Clear the cart array
    user.cart = [];

    // Save the updated user document
    await user.save();

    res.json({ message: 'Cart has been emptied', cart: user.cart });
  } catch (error) {
    console.error('Error emptying cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

const updateProductQuantityFromCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { cartItemId, newQuantity } = req.params;
  validateMongoDbId(_id);
  
  try {
    const cartItem = await User.findOne({ 
      _id: _id, 
      'cart._id': cartItemId 
    }, {
      'cart.$': 1 // This will project only the cart item with the matching _id
    });

    if (!cartItem || cartItem.cart.length === 0) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    cartItem.cart[0].quantity = newQuantity;

    await User.updateOne(
      { _id: _id, 'cart._id': cartItemId },
      { $set: { 'cart.$.quantity': newQuantity } }
    );

    res.json(cartItem.cart[0]);
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

const notifyAdmin = async (userId, orderItems, totalPrice, totalPriceAfterDiscount, shippingInfo) => {
  try {
    // Fetch the user's name using the userId
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    const userName = `${user.firstname} ${user.lastname}`;

    // Populate each order item with full product details and tracking info
    const populatedOrderItems = await Promise.all(
      orderItems.map(async (item) => {
        const product = await Product.findById(item.product);
        if (!product) {
          throw new Error('Product not found');
        }
        return {
          ...item,
          product: {
            title: product.title,
            images: product.images,
            price: product.price,
            description: product.description,
          },
          trackingInfo: item.trackingInfo,
        };
      })
    );

    // Create a Nodemailer transporter
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "synergyvines@gmail.com",
        pass: "qrnxkjjeeoctxkxu",
      },
    });

    // Compose the email content
    let emailContent = `
    <h2>New Order Received</h2>
  
    <div style="border: 2px solid #ced4da; background-color: #ffff;">
      <div style="padding:5px">
        <p><strong>User Name:</strong> ${userName}</p>
        <p><strong>Price:</strong> KES ${totalPrice.toLocaleString()}</p>
        <p><strong>Total Amount:</strong> KES ${totalPriceAfterDiscount.toLocaleString()}</p>
      </div>
  
      <h3 style="font-size: 16px; border-bottom: 2px solid #ced4da; margin: 0; text-align: left; padding: 5px;">Order Items:</h3>
      <ul style="padding:0px;">
        ${populatedOrderItems
          .map(
            (item) =>
              `<li style="width:100%;display:flex;list-style:none;justify-content:start;margin:0px;">
                <div style="width:30%">
                  ${item.product.images[0]?.url ? `<img src="${item.product.images[0].url}" alt="Product Image" width="100"/>` : ""}
                </div>
                <div style="flex-grow-1">
                  <p><strong>Product:</strong> ${item.product.title}</p>
                  <p><strong>Tracking Number:</strong> ${item.trackingInfo?.trackingNumber || "N/A"}</p>
                  <p><strong>Quantity:</strong> ${item.quantity}</p>
                  <p><strong>Estimated Delivery Date:</strong> ${new Date(item.trackingInfo?.startDate).toDateString()} - ${new Date(item.trackingInfo?.endDate).toDateString()}</p>
                </div>
              </li>`
          )
          .join("")}
      </ul>
      <h3 style="font-size: 16px; border-bottom: 2px solid #ced4da; margin: 0; text-align: left; padding: 5px;">Shipping Information:</h3>
      <div style="padding:5px">
        <p>${shippingInfo.firstName} ${shippingInfo.lastName}</p>
        <p><strong> Address: </strong>${shippingInfo.address}</p>
          <p><strong> Region: </strong>${shippingInfo.county}</p>
        <p><strong> Area: </strong>${shippingInfo.area}</p>
        <p><strong>Phone Number:</strong> <a style="color:black; text-decoration: underline;" href="tel:+254${shippingInfo.phoneNumber}">+254${shippingInfo.phoneNumber}</a></p>
        <p><strong>Additional Number:</strong> <a style="color:black; text-decoration: underline;" href="tel:+254${shippingInfo.additionalNumber}">+254${shippingInfo.additionalNumber}</a></p>
      </div>
    </div>
  `;
  

    // Send the email
    let info = await transporter.sendMail({
      from: '"Synergy Vines" <orders@synergy.com>',
      to: "synergyvines@gmail.com",
      subject: "New Order Notification",
      html: emailContent,
    });

    console.log("Order notification sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending order notification:", error);
    throw new Error("Failed to send order notification.");
  }
};

const notifyUser = async (userId, orderItems, totalPrice, totalPriceAfterDiscount, shippingInfo) => {
  try {
    // Fetch the user's information using the userId
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    const userName = `${user.firstname} ${user.lastname}`;

    // Populate each order item with full product details and tracking info
    const populatedOrderItems = await Promise.all(
      orderItems.map(async (item) => {
        const product = await Product.findById(item.product);
        if (!product) {
          throw new Error('Product not found');
        }
        return {
          ...item,
          product: {
            title: product.title,
            images: product.images,
            price: product.price,
            description: product.description,
          },
          trackingInfo: item.trackingInfo,
        };
      })
    );

    // Create a Nodemailer transporter
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "synergyvines@gmail.com",
        pass: "qrnxkjjeeoctxkxu",
      },
    });

    // Compose the email content for the user
    let emailContent = `
    <h2>Your Order Has Been Received</h2>
      <div style="padding:10px; background-color: #ffff;">

     <div>
      <p>Hello ${userName}</p>
      <div>
      <p>
        Thank you for your order from Synergy Vines. Once your package ships we will send an email to track your order. If you have questions about your order, you can email us at synergyvines@gmail.com or call us at 
          <a style="color:black; text-decoration: underline;" href="tel:+254 11112223333">+254 1111222333</a>.
      </p>
      </div>
     </div>

    <div style="border: 2px solid #ced4da; background-color: #ffff;">
      <div style="padding:5px">
        <p><strong>Price:</strong> KES ${totalPrice.toLocaleString()}</p>
        <p><strong>Total Amount After Discount:</strong> KES ${totalPriceAfterDiscount.toLocaleString()}</p>
      </div>
  
      <h3 style="font-size: 16px; border-bottom: 2px solid #ced4da; margin: 0; text-align: left; padding: 5px;">Order Items:</h3>
      <ul style="padding:0px;">
        ${populatedOrderItems
          .map(
            (item) =>
              `<li style="width:100%;display:flex;list-style:none;justify-content:start;margin:0px;">
                <div style="width:30%">
                  ${item.product.images[0]?.url ? `<img src="${item.product.images[0].url}" alt="Product Image" width="100"/>` : ""} 
                </div>
                <div style="flex-grow-1">
                  <p><strong>Product:</strong> ${item.product.title}</p>
                  <p><strong>Tracking Number:</strong> ${item.trackingInfo?.trackingNumber || "N/A"}</p>
                  <p><strong>Quantity:</strong> ${item.quantity}</p>
                  <p><strong>Estimated Delivery Date:</strong> ${new Date(item.trackingInfo?.startDate).toDateString()} - ${new Date(item.trackingInfo?.endDate).toDateString()}</p>
                </div>
              </li>`
          )
          .join("")}
      </ul>
      <h3 style="font-size: 16px; border-bottom: 2px solid #ced4da; margin: 0; text-align: left; padding: 5px;">Shipping Information:</h3>
      <div style="padding:5px">
        <p>${shippingInfo.firstName} ${shippingInfo.lastName}</p>
        <p><strong>Address:</strong> ${shippingInfo.address}</p>
        <p><strong>Region:</strong> ${shippingInfo.county}</p>
        <p><strong>Area:</strong> ${shippingInfo.area}</p>
        <p><strong>Phone Number:</strong> <a style="color:black; text-decoration: underline;" href="tel:+254${shippingInfo.phoneNumber}">+254${shippingInfo.phoneNumber}</a></p>
        <p><strong>Additional Number:</strong> <a style="color:black; text-decoration: underline;" href="tel:+254${shippingInfo.additionalNumber}">+254${shippingInfo.additionalNumber}</a></p>
      </div>
    </div>

    <p style="margin-top:10px;">Thank you for shopping with us!</p>
    </div>
    `;

    // Send the email to the user
    let info = await transporter.sendMail({
      from: '"Synergy Vines" <orders@synergyvines.com>',
      to: user.email, // Send the email to the user
      subject: "Your Order Has Been Received",
      html: emailContent,
    });

    console.log("Order confirmation sent to user: %s", info.messageId);
  } catch (error) {
    console.error("Error sending order confirmation to user:", error);
    throw new Error("Failed to send order confirmation to user.");
  }
};


const createOrder = asyncHandler(async (req, res) => {
  const { shippingInfo, productId, orderItems, totalPrice, totalPriceAfterDiscount } = req.body;
  const { _id } = req.user;

  try {
    // Check for required user data
    if (!_id) {
      return res.status(400).json({ message: 'User ID is missing.' });
    }

    // Check for required fields in the order
    if (!shippingInfo || !orderItems || !totalPrice || !totalPriceAfterDiscount) {
      return res.status(400).json({ message: 'Missing required order information.' });
    }

    // Proceed with creating the order
    const startDate = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
    const endDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

    const updatedOrderItems = orderItems.map(item => ({
      ...item,
      trackingInfo: {
        trackingNumber: `TRACK${Math.floor(Math.random() * 1000000)}`,
        startDate,
        endDate,
      },
    }));

    const order = await Order.create({
      user: _id,
      shippingInfo,
      orderItems: updatedOrderItems,
      totalPrice,
      totalPriceAfterDiscount,
      productId,
    });

    // Update product quantities
    for (const item of updatedOrderItems) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { sold: item.quantity, quantity: -item.quantity },
      });
    }

    // Notify the admin about the new order
    try {
      await notifyAdmin(_id, updatedOrderItems, totalPrice, totalPriceAfterDiscount, shippingInfo);
      console.log("Admin notified successfully.");
    } catch (error) {
      console.error("Failed to notify admin:", error);
    }

    // Notify the user about their order
    try {
      await notifyUser(_id, updatedOrderItems, totalPrice, totalPriceAfterDiscount, shippingInfo);
      console.log("User notified successfully.");
    } catch (error) {
      console.error("Failed to notify user:", error);
    }

    res.json({
      order,
      deliveryTimeRange: `${startDate.toDateString()} - ${endDate.toDateString()}`,
      success: true,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


const getMyOrders = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  try {
    const orders = await Order.find({ user:_id }).populate("orderItems.product").populate("productId")
    res.json({
      orders
    })
    
  } catch (error) {
    throw new Error(error)
  }
})



const markOrderAsViewed = asyncHandler(async (req, res) => {
  const { id } = req.params; // Get the order ID from the URL parameters

  try {
    // Find the order by ID and update the 'viewed' field to true
    const order = await Order.findByIdAndUpdate(
      id,
      { viewed: true },
      { new: true } // Return the updated order
    );



    if (!order) {
      res.status(404);
      throw new Error("Order not found");
    }

    res.json({
      message: "Order marked as viewed",
      order, // Respond with the updated order
    });
  } catch (error) {
    console.error('Error marking order as viewed:', error); // Log any errors that occur
    throw new Error(error); // Handle any errors that occur during the process
  }
});



const getAllOrders= asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find().populate('user')
    res.json({
      orders
    })
    
  } catch (error) {
    throw new Error(error)
  }
})

const getUnreadOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({ viewed: false }).populate('user');
    res.json({
      orders
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


const getSingleOrders= asyncHandler(async (req, res) => {
  const { id } = req.params
  console.log(id);
  try {
    const orders = await Order.findOne({_id:id}).populate("orderItems.product")
    res.json({
      orders
    })
    
  } catch (error) {
    throw new Error(error)
  }
})

const getPayments = asyncHandler(async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (error) {
    throw new Error(error);
  }
});



const updateOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findById(id).populate("user");
    if (!order) {
      res.status(404);
      throw new Error("Order not found");
    }

    // Update the order status
    order.orderStatus = status;
    await order.save();

    // Send email notification if the order is shipped
    if (status === "Shipped") {
      await notifyUserOrderShipped(order.user, order.orderItems, order.totalPrice, order.totalPriceAfterDiscount, order.shippingInfo);
    }

    // Send email notification if the order is cancelled
    if (status === "Cancelled") {
      await notifyAdminOrderCancelled(order.user, order.orderItems, order.totalPrice, order.totalPriceAfterDiscount, order.shippingInfo);
    }

    res.json({ order });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});


const notifyUserOrderShipped = async (userId, orderItems, totalPrice, totalPriceAfterDiscount, shippingInfo) => {
  try {
    // Fetch the user's information using the userId
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    const userName = `${user.firstname} ${user.lastname}`;

    // Populate each order item with full product details and tracking info
    const populatedOrderItems = await Promise.all(
      orderItems.map(async (item) => {
        const product = await Product.findById(item.product);
        if (!product) {
          throw new Error('Product not found');
        }
        return {
          ...item,
          product: {
            title: product.title,
            images: product.images,
            price: product.price,
            description: product.description,
          },
          trackingInfo: item.trackingInfo,
        };
      })
    );

    // Create a Nodemailer transporter
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "synergyvines@gmail.com",
        pass: "qrnxkjjeeoctxkxu",
      },
    });

    // Compose the email content for the user
    let emailContent = `
    <h2>Your Order Has Been Shipped</h2>
    <div style="padding:10px; background-color: #ffff;">
      <div>
        <p>Hello ${userName},</p>
        <p>Your order has been shipped. Kindly be ready with the required documents to receive the order.</p>
      </div>

      <div style="border: 2px solid #ced4da; background-color: #ffff;">
        <div style="padding:5px">
          <p><strong>Price:</strong> KES ${totalPrice.toLocaleString()}</p>
          <p><strong>Total Amount After Discount:</strong> KES ${totalPriceAfterDiscount.toLocaleString()}</p>
        </div>
  
        <h3 style="font-size: 16px; border-bottom: 2px solid #ced4da; margin: 0; text-align: left; padding: 5px;">Order Items:</h3>
        <ul style="padding:0px;">
          ${populatedOrderItems
            .map(
              (item) =>
                `<li style="width:100%;display:flex;list-style:none;justify-content:start;margin:0px;">
                  <div style="width:30%">
                    ${item.product.images[0]?.url ? `<img src="${item.product.images[0].url}" alt="Product Image" width="100"/>` : ""} 
                  </div>
                  <div style="flex-grow-1">
                    <p><strong>Product:</strong> ${item.product.title}</p>
                    <p><strong>Tracking Number:</strong> ${item.trackingInfo?.trackingNumber || "N/A"}</p>
                    <p><strong>Quantity:</strong> ${item.quantity}</p>
                    <p><strong>Estimated Delivery Date:</strong> ${new Date(item.trackingInfo?.startDate).toDateString()} - ${new Date(item.trackingInfo?.endDate).toDateString()}</p>
                  </div>
                </li>`
            )
            .join("")}
        </ul>
        
        <h3 style="font-size: 16px; border-bottom: 2px solid #ced4da; margin: 0; text-align: left; padding: 5px;">Shipping Information:</h3>
        <div style="padding:5px">
          <p>${shippingInfo.firstName} ${shippingInfo.lastName}</p>
          <p><strong>Address:</strong> ${shippingInfo.address}</p>
          <p><strong>Region:</strong> ${shippingInfo.county}</p>
          <p><strong>Area:</strong> ${shippingInfo.area}</p>
          <p><strong>Phone Number:</strong> <a style="color:black; text-decoration: underline;" href="tel:+254${shippingInfo.phoneNumber}">+254${shippingInfo.phoneNumber}</a></p>
          <p><strong>Additional Number:</strong> <a style="color:black; text-decoration: underline;" href="tel:+254${shippingInfo.additionalNumber}">+254${shippingInfo.additionalNumber}</a></p>
        </div>
      </div>

      <p style="margin-top:10px;">Thank you for shopping with us!</p>
    </div>
    `;

    // Send the email to the user
    let info = await transporter.sendMail({
      from: '"Synergy Vines" <orders@synergy.com>', // sender address
      to: user.email, // recipient's email
      subject: "Your Order Has Been Shipped", // Subject line
      html: emailContent, // html body
    });

    console.log("Order shipped notification sent to user: %s", info.messageId);
  } catch (error) {
    console.error("Error sending order shipped notification:", error);
    throw new Error("Failed to send order shipped notification.");
  }
};

const notifyAdminOrderCancelled = async (userId, orderItems, totalPrice, totalPriceAfterDiscount, shippingInfo) => {
  try {
    // Fetch the user's name using the userId
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    const userName = `${user.firstname} ${user.lastname}`;

    // Populate each order item with full product details
    const populatedOrderItems = await Promise.all(
      orderItems.map(async (item) => {
        const product = await Product.findById(item.product);
        if (!product) {
          throw new Error('Product not found');
        }
        return {
          ...item,
          product: {
            title: product.title,
            images: product.images,
            price: product.price,
            description: product.description,
          },
        };
      })
    );

    // Create a Nodemailer transporter
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "synergyvines@gmail.com",
        pass: "qrnxkjjeeoctxkxu",
      },
    });

    // Compose the email content
    let emailContent = `
    <h2>Order Cancelled by User</h2>
  
    <div style="border: 2px solid #ced4da; background-color: #ffff;">
      <div style="padding:5px">
        <p><strong>User Name:</strong> ${userName}</p>
        <p><strong>Total Price:</strong> KES ${totalPrice.toLocaleString()}</p>
        <p><strong>Total Amount After Discount:</strong> KES ${totalPriceAfterDiscount.toLocaleString()}</p>
      </div>
  
      <h3 style="font-size: 16px; border-bottom: 2px solid #ced4da; margin: 0; text-align: left; padding: 5px;">Cancelled Order Items:</h3>
      <ul style="padding:0px;">
        ${populatedOrderItems
          .map(
            (item) =>
              `<li style="width:100%;display:flex;list-style:none;justify-content:start;margin:0px;">
                <div style="width:30%">
                  ${item.product.images[0]?.url ? `<img src="${item.product.images[0].url}" alt="Product Image" width="100"/>` : ""} 
                </div>
                <div style="flex-grow-1">
                  <p><strong>Product:</strong> ${item.product.title}</p>
                  <p><strong>Quantity:</strong> ${item.quantity}</p>
                </div>
              </li>`
          )
          .join("")}
      </ul>

      <h3 style="font-size: 16px; border-bottom: 2px solid #ced4da; margin: 0; text-align: left; padding: 5px;">Shipping Information:</h3>
      <div style="padding:5px">
        <p>${shippingInfo.firstName} ${shippingInfo.lastName}</p>
        <p><strong>Address:</strong> ${shippingInfo.address}</p>
        <p><strong>Region:</strong> ${shippingInfo.county}</p>
        <p><strong>Area:</strong> ${shippingInfo.area}</p>
        <p><strong>Phone Number:</strong> <a style="color:black; text-decoration: underline;" href="tel:+254${shippingInfo.phoneNumber}">+254${shippingInfo.phoneNumber}</a></p>
        <p><strong>Additional Number:</strong> <a style="color:black; text-decoration: underline;" href="tel:+254${shippingInfo.additionalNumber}">+254${shippingInfo.additionalNumber}</a></p>
      </div>
    </div>
  
    <p style="margin-top:10px;">The user has cancelled their order. Please follow up if necessary.</p>
    `;

    // Send the email
    let info = await transporter.sendMail({
      from: '"Synergy Vines" <orders@synergyvines.com>',
      to: "synergyvines@gmail.com", // Admin email
      subject: "Order Cancelled Notification", // Subject line
      html: emailContent, // html body
    });

    console.log("Order cancellation notification sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending cancellation notification:", error);
    throw new Error("Failed to send cancellation notification.");
  }
};


const getMonthWiseOrderIncome = asyncHandler(async (req, res) => {

    let monthNames = ['January',
     'February', 
     'March', 
     'April', 
     'May', 
     'June', 
     'July', 
     'August', 
     'September', 
     'October', 
     'November', 
     'December'];
  let d = new Date();
  let endDate = "";
  d.setDate(1)
  for (let index = 0; index < 11; index++) {
    d.setMonth(d.getMonth() - 1)
    endDate = monthNames[d.getMonth()] + " " + d.getFullYear()
   
  }
  try {
  const data = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $lte: new Date(),
          $gte: new Date(endDate)
      }
    }
    }, {
      $group: {
        _id: {
        month:"$month"
      },amount:{$sum:"$totalPriceAfterDiscount"},count: { $sum: 1 }
    }
  }
  ])
  res.json(data)
  } catch (error) {
    throw new Error(error)
  }
})



const getYearlyTotalOrders = asyncHandler(async (req, res) => {
console.log("yearly api request");
    let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let d = new Date();
  let endDate = "";
  d.setDate(1)
  for (let index = 0; index < 11; index++) {
    d.setMonth(d.getMonth() - 1)
    endDate = monthNames[d.getMonth()] + " " + d.getFullYear()
   
  }  try {
  const data = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $lte: new Date(),
          $gte: new Date(endDate)
      }
    }
    }, {
      $group: {
        _id:null,
        count: { $sum: 1 },
        amount:{$sum: "$totalPriceAfterDiscount"}
    }
  }
  ])
  res.json(data)
  } catch (error) {
    throw new Error(error)
 }
})

module.exports = {
  createUser,
  loginUserCtrl,
  getallUser,
  getaUser,
  deleteaUser,
  updatedUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  getWishlist,
  saveAddress,
  userCart,
  getUserCart,
  createOrder,
  removeProductFromCart,
  updateProductQuantityFromCart,
  getMyOrders,
  getMonthWiseOrderIncome,
  getYearlyTotalOrders,
  getAllOrders,
  getSingleOrders,
  updateOrder,
  getPayments,
  emptyCart,
  verifyOTP,
  addAddress,
  getAddress,
  updateAddress,
  subscribeNewsletterCtrl,
  markOrderAsViewed,
  getUnreadOrders,
};
