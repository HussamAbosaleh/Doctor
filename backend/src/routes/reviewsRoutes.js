import express from "express";
import { createReview, getDoctorReviews } from "../controllers/reviewsController.js";
import authToken from "../middlewares/authToken.js";

const router = express.Router();

router.post("/", authToken, createReview);
router.get("/doctor/:doctorId", getDoctorReviews);

export default router;