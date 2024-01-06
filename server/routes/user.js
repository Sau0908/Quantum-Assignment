import express from "express";
import {
  getAllUsers,
  deleteUser,
  addMessage,
  getUserMessages,
} from "../controllers/user.js";
const router = express.Router();

router.get("/users", getAllUsers);
router.get("/users/:id/messages", getUserMessages);
router.delete("/users/:id", deleteUser);
router.post("/users/addmessages", addMessage);

export default router;
