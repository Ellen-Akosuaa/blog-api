import { Router } from "express";
import { login, register } from "../controllers/user.js";

// Create Router
const userRouter = Router();

// Define Routes
userRouter.post('/register', register);

userRouter.post('/login', login);

// Export Router
export default userRouter;