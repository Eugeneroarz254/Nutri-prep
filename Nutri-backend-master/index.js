const bodyParser = require("body-parser");
const express = require("express");
const dbConnect = require("./config/dbConnect"); // Not needed if you directly connect in index.js
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const path = require('path'); 

const PORT = 80;

const authRouter = require("./routes/authRoute");
const productRouter = require("./routes/productRoute");
const coverRouter = require('./routes/coverRoute');
const categoryRouter = require("./routes/prodcategoryRoute");
const CoverCategoryRouter = require('./routes/CoverCategoryRoute');
const colorRouter = require("./routes/colorRoute");
const enqRouter = require("./routes/enqRoute");
const brandRouter = require("./routes/brandRoute");
const sizeRouter = require("./routes/sizeRoute");
const couponRouter = require("./routes/couponRoute");
const uploadRouter = require("./routes/uploadRoute");
const expressSession = require("express-session");
const passport = require("./controller/Passport");
const session = require('express-session');


const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(
  session({
    secret: "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", 
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, 
  })
);

app.use(passport.initialize());
app.use(passport.session());

const allowedOrigins = [
  "http://localhost:3000", 
  "http://localhost:3001", 
  "http://localhost:3002",
  "https://toptier-office.onrender.com",
  "https://toptier-office-admin.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, 'client/build')));
// Routes setup
app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use("/api/category", categoryRouter);
app.use("/api/cover", coverRouter);
app.use("/api/CoverCategory", CoverCategoryRouter);
app.use("/api/coupon", couponRouter);
app.use("/api/color", colorRouter);
app.use("/api/size", sizeRouter);
app.use("/api/enquiry", enqRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/brand", brandRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});
// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Database connection and server initialization
mongoose
  .connect(process.env.MONGODB_URL, {
    dbName: "synergy_vines",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running at PORT ${PORT}`));
  })
  .catch((err) => console.log(`${err} did not connect`));
