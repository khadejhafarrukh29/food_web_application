import express from "express";
import {
  createRider,
  login,
  logout,
  riderProfile,
  updateRiderProfile,
} from "../Controllers/Rider.Controller.js";
import upload from "../config/Rider_multer.js";
import { checkRiderID } from "../middlewares/Rider.middleware.js";
const RiderRoute = express.Router();

RiderRoute.post("/Register", createRider);
// RiderRoute.post("/login", login);
RiderRoute.get("/logout", logout);
RiderRoute.get("/Profile", riderProfile);
RiderRoute.patch(
  "/updateProfile",
  checkRiderID,
  upload.single("Img"),
  updateRiderProfile
);
export default RiderRoute;
