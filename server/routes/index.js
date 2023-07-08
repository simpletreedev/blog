import { Router } from "express";

import authRoute from "./auth.js";
import uploadRoute from "./upload.js";
import postRoute from "./posts.js";
import userRoute from "./users.js";
import commentRoute from "./comments.js";
import { verifyAccessToken } from "../helpers/jwt.js";

const router = Router();

export const routes = () => {
  router.use("/auth", authRoute);
  // router.use(verifyAccessToken);
  router.use("/users", userRoute);
  router.use("/upload", uploadRoute);
  router.use("/posts", postRoute);
  router.use("/comments", commentRoute);

  return router;
};
