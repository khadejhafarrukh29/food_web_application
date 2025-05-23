import express from "express";
import dotenv from "dotenv";
import path from "path";
import UserRouter from "./src/Routes/User.Routes.js";
import RiderRoute from "./src/Routes/Rider.Routes.js";

import Rest_Route from "./src/Routes/Restaurant.Routes.js";
import db from "./src/config/db.js";

import cors from "cors";
import cookieParser from "cookie-parser";
import Route from "./src/Routes/universalLogin.routes.js";
import Menu_Route from "./src/Routes/Menu.Routes.js";
import OrderRoute from "./src/Routes/Order.Routes.js";
// ✅ Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // React app ka URL
    credentials: true, // Cookies send karne ke liye
  })
);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
// ✅ Routes
app.use("/api", UserRouter);
app.use("/API", Route);
app.use("/Rider", RiderRoute);
app.use("/restaurant", Rest_Route);
app.use("/menu", Menu_Route);
app.use("/order", OrderRoute);
// ✅ Root route
app.get("/", (req, res) => res.send("Food web application APIs are running"));

// ✅ Start the server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
