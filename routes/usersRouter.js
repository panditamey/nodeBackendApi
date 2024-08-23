import express from "express";
import { registerUser, loginUser } from "../controllers/usersController.js";
import authenticateToken from "../middlewares/authMiddleware.js";

const usersRouter = express.Router();

usersRouter.post("/register", registerUser);
usersRouter.post("/login", loginUser);
usersRouter.get("/protected", authenticateToken, (req, res) => {
  res.status(200).json({ message: "Welcome to the protected route" });
});

// Other routes
usersRouter.get("/public", (req, res) => {
  res.json({ message: "Welcome to the public route" });
});

export default usersRouter;
