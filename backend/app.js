// Import Dependencies
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

// Route Imports
const { connectToMongoDB } = require("./connection");

// Testing Routes Imports
const homeRoute = require("./routes/home");
const userRoute = require("./routes/user");
const {
  handleCreateBookingById,
  handleDeleteBookingById,
} = require("./controllers/authBooking");
const { connectToMongoDB } = require("./connection");
const {
  sendVerificationEmail,
  handleVerifyEmail,
  handleUserSignup,
  handleUserSignin,
  GiveTokens,
  giveUserForToken,
} = require("./controllers/authUser");
const {
  restrictedToLoggedinUsersOnly,
  checkAuth,
} = require("./middlewares/auth");

// Initialize the express app and define the port number
const app = express();
const PORT = 8000;

// Database Connection
connectToMongoDB("mongodb://localhost:27017/travel-website").then(() =>
  console.log("MongoDB Connected")
);

// Set the view engine to ejs
app.set("view engine", "ejs");

// Specitic directory where views are located
app.set("views", path.resolve("./views"));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Router

// Testing Routes
app.use("/handleCreateBookingById,", restrictedToLoggedinUsersOnly,handleCreateBookingById);
app.use("/handleDeleteBookingById", restrictedToLoggedinUsersOnly,handleDeleteBookingById);
app.use("/handleUserSignup",handleUserSignup);
app.use("/handleUserSignin",handleUserSignin);
app.use("/sendVerificationMail", sendVerificationEmail);
app.use("/handleVerifyEmail", handleVerifyEmail);
app.use("/GiveToken", GiveTokens);
app.use("/giveUserForToken", giveUserForToken);

// Start the backend app
app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));
