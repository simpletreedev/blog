import { Router } from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  getPostsByUserId,
  updatePost,
  removePost,
  getPostTrending,
  getPostBreaking,
  getPostSearch,
  bookmarkPost,
} from "../controllers/index.js";
import fileUpload from "../middleware/fileUpload.js";

const router = Router();

router.get("/", getAllPosts);

router.get("/search", getPostSearch);

router.get("/trending", getPostTrending);

router.get("/breaking", getPostBreaking);

router.get("/:postId", getPostById);

router.get("/user/:userId", getPostsByUserId);

router.patch("/:postId", fileUpload.single("image"), updatePost);

router.put("/:postId/saved", bookmarkPost);

router.delete("/:postId", removePost);

router.post("/", fileUpload.single("image"), createPost);

export default router;
