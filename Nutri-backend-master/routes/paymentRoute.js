const express = require("express");
const app = express();
const { generateToken, processStkPush, callbackHandler, paymentStatus } = require("../controller/paymentCtrl");

// Payment routes
app.get("/token", generateToken);
app.post("/stk", processStkPush);
app.post("/callback", callbackHandler);
app.get("/status/:trnx_id", paymentStatus)

module.exports = app;