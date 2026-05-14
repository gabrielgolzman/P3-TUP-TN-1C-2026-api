import { Router } from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { User } from "../models/user/User.js";
import { loginUser, registerUser } from "../services/user.service.js";

const router = Router();

router.post("/register", registerUser );

router.post("/login", loginUser)

export default router;