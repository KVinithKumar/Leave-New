import express from "express";
import { loginAdmin, loginPrincipal, loginStaff, logoutUser } from "../controllers/authcontroller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login/admin", loginAdmin);
router.post("/login/principal", loginPrincipal);
router.post("/login/staff", loginStaff);
router.post("/logout", protect, logoutUser);

export default router;
