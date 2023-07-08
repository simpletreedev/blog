import { Router } from "express";
import { followUser, getPostBookmarks, getUserById, updateUser } from "../controllers/index.js";
import fileUpload from "../middleware/fileUpload.js";

const router = Router();

router.get("/:userId", getUserById);

router.get("/:userId/saved", getPostBookmarks);

router.put("/:userId", fileUpload.single("avatar"), updateUser);

router.put("/:userId/follow", followUser);

export default router;
