import express from "express";
import { findAllUsers, findUser, login, register } from "../controllers/auth";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/findAllUsers", findAllUsers);
router.get("/find/:userId", findUser);

export { router as AuthRoutes };
