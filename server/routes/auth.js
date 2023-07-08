import { Router } from "express";
import {
  login,
  register,
  generateNewToken,
  logout,
  getRefreshToken,
} from "../controllers/index.js";
import passport from "passport";
import dotenv from "dotenv";
import fileUpload from "../middleware/fileUpload.js";
dotenv.config();

const router = Router();

router.post("/register", fileUpload.single("avatar"), register);
router.post("/login", login);
router.get("/:userId/refresh-token", getRefreshToken);
router.post("/refresh-token", generateNewToken);
router.delete("/logout", logout);

// login with google
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { scope: ["profile", "email"] }),
  (req, res, next) => {
    try {
      return res.redirect(process.env.CLIENT_URL);
    } catch (error) {
      return next(error);
    }
  }
);

export default router;
