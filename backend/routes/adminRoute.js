import express from "express";
import {
  createPrincipal,
  approvePrincipal,
  deletePrincipal,
  getAllPrincipals,
  getLogs,
  downloadLogsPDF,
  updateAdminProfile,
  changeAdminPassword,
} from "../controllers/adminController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Apply protection to all routes
router.use(protect);

// Routes with specific role authorization
router.post("/create-principal", authorize("Admin"), createPrincipal);
router.put("/approve-principal/:id", authorize("Admin"), approvePrincipal);
router.delete("/delete-principal/:id", authorize("Admin"), deletePrincipal);
router.get("/principals", authorize("Admin"), getAllPrincipals);

// Logs accessible by Admin and Principal
router.get("/logs", authorize("Admin", "Principal"), getLogs);
router.get("/logs/pdf", authorize("Admin", "Principal"), downloadLogsPDF);

router.put("/update-profile", authorize("Admin"), updateAdminProfile);
router.put("/change-password", authorize("Admin"), changeAdminPassword);

export default router;
