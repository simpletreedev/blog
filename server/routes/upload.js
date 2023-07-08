import { Router } from "express";
import fileUpload from "../middleware/fileUpload.js";
import { uploadToCloudinary } from "../utils/index.js";

const router = Router();

router.post("/", fileUpload.single("avatar"), async (req, res, next) => {
  try {
    const file = req.file;

    const imageUrl = await uploadToCloudinary(file);

    return res.status(200).json({ message: "Uploaded", imageUrl });
  } catch (error) {
    return next(error);
  }
});

export default router;
