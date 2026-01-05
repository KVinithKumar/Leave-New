import express from "express";
import { loginPrincipal } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", loginPrincipal);

export default router;
