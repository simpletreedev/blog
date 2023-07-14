import { Router } from "express";

import authRoute from "./auth.js";
import uploadRoute from "./upload.js";
import postRoute from "./posts.js";
import userRoute from "./users.js";
import commentRoute from "./comments.js";
import { verifyAccessToken } from "../helpers/jwt.js";

const router = Router();

export const routes = () => {
  router.use("/api/auth", authRoute);
  // router.use(verifyAccessToken);
  router.use("/api/users", userRoute);
  router.use("/api/upload", uploadRoute);
  router.use("/api/posts", postRoute);
  router.use("/api/comments", commentRoute);

  return router;
};
