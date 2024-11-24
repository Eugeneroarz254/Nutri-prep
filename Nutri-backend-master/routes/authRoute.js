const express = require("express");
const passport = require("passport");
const {
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
  emptyCart,
  getPayments,
  verifyOTP,
  addAddress,
  getAddress,
  updateAddress,
  subscribeNewsletterCtrl,
  markOrderAsViewed,
  getUnreadOrders,
} = require("../controller/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { getRecentlyViewedProducts } = require("../controller/productCtrl");
const router = express.Router();


router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
   
    failureRedirect: (`${process.env.CLIENT_URL}/login`),
  
  }),
  (req, res) => {
    req.session.user = req.user;
  

    res.redirect(process.env.CLIENT_URL);
  }
);

router.get("/getUser", (req, res) => {
  if (req.session.user) {

    res.status(200).json({
      error: false,
      user: req.session.user,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});


// Logout route

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Failed to destroy session:", err);
      return res.status(500).json({ error: true, message: "Failed to logout" });
    }
    res.clearCookie('connect.sid'); 
    req.session = null; 
    return res.status(200).json({ message: "Logged out successfully" });
  });
});

router.post("/subscribe/newsletter", subscribeNewsletterCtrl);

router.post("/register", createUser);
router.post("/forgot-password-token", forgotPasswordToken);
router.put("/reset-password/:token", resetPassword);
router.post("/verify-otp", verifyOTP)
router.put("/password", authMiddleware, updatePassword);
router.post("/login", loginUserCtrl);
router.post("/admin-login", loginAdmin);
router.post("/cart", authMiddleware, userCart);
router.get("/recently-viewed",authMiddleware, getRecentlyViewedProducts)

/* router.post("/cart/applycoupon", authMiddleware, applyCoupon); */
router.post("/cart/create-order", authMiddleware, createOrder);
router.get("/all-users", getallUser);
router.get("/getmyorders", authMiddleware, getMyOrders);
router.get("/getmyorders", authMiddleware, getMyOrders);

router.put("/order/:id/viewed", authMiddleware,isAdmin,  markOrderAsViewed);

router.get("/getMonthWiseOrderIncome", authMiddleware, getMonthWiseOrderIncome);
router.get("/getyearlyorders", authMiddleware, getYearlyTotalOrders);
router.get("/getallorders", authMiddleware,  getAllOrders);
router.get("/getunreadorders", authMiddleware,  getUnreadOrders);

router.get("/getaOrder/:id", authMiddleware, isAdmin, getSingleOrders);
router.put("/updateOrder/:id", authMiddleware, isAdmin, updateOrder);
router.get("/payments", authMiddleware, isAdmin, getPayments); // Add this line to define the /getpayments route

/*Adress*/
router.put("/add-address", authMiddleware,  addAddress); // Add this line to define the /getpayments route
router.get("/get-address", authMiddleware,  getAddress); // Add this line to define the /getpayments route
router.put("/update-address", authMiddleware,  updateAddress); // Add this line to define the /getpayments route


/*Wrouter.post("/getorderbyuser/:id", authMiddleware, isAdmin, getAllOrders); */


router.get("/refresh", handleRefreshToken);
router.get("/logout/", logout);
router.get("/wishlist", authMiddleware, getWishlist);
router.get("/cart", authMiddleware, getUserCart);
router.get("/:id", authMiddleware, isAdmin, getaUser);
router.delete("/delete-product-cart/:cartItemId", authMiddleware, removeProductFromCart);
router.put("/update-product-cart/:cartItemId/:newQuantity", authMiddleware, updateProductQuantityFromCart);

/* router.delete("/empty-cart", authMiddleware, emptyCart);
 */
router.delete("/empty-cart", authMiddleware,emptyCart);
router.delete("/:id", deleteaUser);
/* router.put(
  "/order/update-order/:id",
  authMiddleware,
  isAdmin,
  updateOrderStatus
); */
router.put("/edit-user", authMiddleware, updatedUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

module.exports = router;
