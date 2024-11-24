import axios from "axios";
import { base_url } from "../../utils/axiosConfig";

// Helper function to get token from local storage
const getTokenFromLocalStorage = () => {
  const customer = localStorage.getItem("customer");
  
  if (!customer) {
    return null;
  }

  const parsedCustomer = JSON.parse(customer);

  // Handle token retrieval from different possible structures
  return parsedCustomer?.token || parsedCustomer?.user?.token || null;
};

// Configuration for axios requests
const config = {
  headers: {
    Authorization: `Bearer ${getTokenFromLocalStorage() || ""}`,
    Accept: "application/json",
  },
};

// Register a new user
const register = async (userData) => {
  try {
    const response = await axios.post(`${base_url}user/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw new Error("Error registering user");
  }
};

// Verify OTP
const verifyOTP = async (otp, email) => {
  try {
    const response = await axios.post(
      `${base_url}user/verify-otp`,
      { otp, email },
      config
    );

    if (response.data.message === "User created successfully") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw new Error("Error verifying OTP");
  }
};

// Resend OTP
const resendOTP = async (userData) => {
  try {
    const response = await axios.post(
      `${base_url}user/register`,
      userData,
      config
    );

    if (response.data.message === "OTP has been resent successfully") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error resending OTP:", error);
    throw new Error("Error resending OTP");
  }
};

// Login user
const login = async (userData) => {
  try {
    const response = await axios.post(`${base_url}user/login`, userData);
    localStorage.setItem("customer", JSON.stringify(response.data));

    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Error Logging in";
    throw new Error(errorMessage); // Throwing the custom error message
  }
};


// Logout function in authService
const logout = async () => {
  try {
    const response = await axios.get(`${base_url}user/logout`, {
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });

    return response.data;
  } catch (error) {
    console.error("Error logging out:", error);
    throw new Error("Error logging out");
  }
};


const subscribe = async (email) => {
  try {
    const response = await axios.post(`${base_url}user/subscribe/newsletter`, { email }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      // Check for the specific error message returned by the backend
      if (error.response.data.message === "Email is already subscribed to the newsletter.") {
        throw new Error("This email is already registered for the newsletter.");
      }
    }
    console.error("Error subscribing to newsletter:", error);
    throw new Error("Error subscribing to newsletter");
  }
};


const fetchUserData = async () => {
  try {
    const response = await axios.get(`${base_url}user/getuser`, {
      withCredentials: true,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      const userData = response.data;
      localStorage.setItem("customer", JSON.stringify(userData));

      return userData;
    } else {
      throw new Error('Failed to fetch user data');
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw new Error(error.message || 'Failed to fetch user data');
  }
};

// Login user with Google
const loginUserWithGoogle = async (token) => {
  try {
    const response = await axios.post(`${base_url}user/google-login`, { token });
    localStorage.setItem("customer", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.error("Error logging in with Google:", error);
    throw new Error("Error logging in with Google");
  }
};

// Add an address
const addAddress = async (addressData) => {
  try {
    const response = await axios.put(`${base_url}user/add-address`, addressData, config);
    return response.data;
  } catch (error) {
    console.error("Error adding address:", error);
    throw new Error("Error adding address");
  }
};

// Get address
const getAddress = async () => {
  try {
    const response = await axios.get(`${base_url}user/get-address`, config);
    return response.data;
  } catch (error) {
    console.error("Error getting address:", error);
    throw new Error("Error getting address");
  }
};

// Get user wishlist
const getUserWislist = async () => {
  try {
    const response = await axios.get(`${base_url}user/wishlist`, config);
    return response.data;
  } catch (error) {
    console.error("Error getting wishlist:", error);
    throw new Error("Error getting wishlist");
  }
};

// Get recently viewed products
const getRecentlyViewedProducts = async (userId) => {
  try {
    const response = await axios.get(`${base_url}user/recently-viewed`, {
      data: { userId },
      ...config,
    });
    return response.data;
  } catch (error) {
    console.error("Error getting recently viewed products:", error);
    throw new Error("Error getting recently viewed products");
  }
};

// Add to cart
const addToCart = async (cartData) => {
  try {
    const response = await axios.post(`${base_url}user/cart`, cartData, config);
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw new Error("Error adding to cart");
  }
};

// Get cart
const getCart = async () => {
  try {
    const response = await axios.get(`${base_url}user/cart`, config);
    return response.data;
  } catch (error) {
    console.error("Error getting cart:", error);
    throw new Error("Error getting cart");
  }
};

// Remove product from cart
const removeProductFromCart = async ({ id, config }) => {
  try {
    const response = await axios.delete(`${base_url}user/delete-product-cart/${id}`, config);
    return response.data;
  } catch (error) {
    console.error("Error removing product from cart:", error);
    throw new Error("Error removing product from cart");
  }
};


// Update product in cart
const updateProductFromCart = async (cartDetail) => {
  try {
    const response = await axios.put(
      `${base_url}user/update-product-cart/${cartDetail.cartItemId}/${cartDetail.quantity}`,
      null,  // No body needed for this PUT request
      cartDetail.config  // Pass the config if needed for headers or authentication
    );
    return response.data;
  } catch (error) {
    console.error("Error updating product in cart:", error);
    throw new Error("Error updating product in cart");
  }
};


// Create order
const createOrder = async (orderDetail) => {
  try {
    const response = await axios.post(`${base_url}user/cart/create-order`, orderDetail, config);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw new Error("Error creating order");
  }
};

// Get user orders
const getUserOrders = async () => {
  try {
    const response = await axios.get(`${base_url}user/getmyorders`, config);
    return response.data;
  } catch (error) {
    console.error("Error getting user orders:", error);
    throw new Error("Error getting user orders");
  }
};



const updateOrder = async (data) => {
  console.log(data,"data received")
  const response = await axios.put(
    `${base_url}user/updateOrder/${data.orderId}`, // Use `orderId` instead of `id`
    { status: data?.status },
    config
  );
  return response.data;
};

// Update user information
const updateUser = async (data) => {
  try {
    const response = await axios.put(`${base_url}user/edit-user`, data, config);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Error updating user");
  }
};

const forgotPassToken = async (data) => {
  try {
    const response = await axios.post(`${base_url}user/forgot-password-token`, { email: data.email });
    return response.data;
  } catch (error) {
    // Create a custom error object if necessary
    const errorMessage = error.response?.data?.message || error.message || "Error requesting forgot password token";
    throw new Error(errorMessage); // Throwing the custom error message
  }
};


// Reset password
const resetPass = async (data) => {
  try {
    const response = await axios.put(`${base_url}user/reset-password/${data.token}`, { password: data.password });
    return response.data;
  } catch (error) {
    console.error("Error resetting password:", error);
    throw new Error("Error resetting password");
  }
};

// Empty cart
const emptyCart = async () => {
  try {
    const response = await axios.delete(`${base_url}user/empty-cart`, config);
    return response.data;
  } catch (error) {
    console.error("Error emptying cart:", error);
    throw new Error("Error emptying cart");
  }
};

export const authService = {
  register,
  login,
  getUserWislist,
  addToCart,
  getCart,
  removeProductFromCart,
  updateProductFromCart,
  createOrder,
  getUserOrders,
  updateUser,
  forgotPassToken,
  resetPass,
  emptyCart,
  verifyOTP,
  resendOTP,
  getRecentlyViewedProducts,
  addAddress,
  getAddress,
  loginUserWithGoogle,
  fetchUserData,
  logout,
  subscribe,
  updateOrder, 
};
