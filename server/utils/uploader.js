import path from "node:path";
import cloudinary from "../config/cloudinary.js"

import DatauriParser from "datauri/parser.js";

const parser = new DatauriParser();
// const uploadOptions = {
//   folder: "blog",
//   use_filename: true, // use original filename
//   overwrite: true, // ghi de if file already exists
// };
export const uploadToCloudinary = async (file) => {
  try {
    const extName = path.extname(file.originalname).toString();
    const file64 = parser.format(extName, file.buffer);

    const uploadedRes = await cloudinary.uploader.upload(file64.content, {
      folder: "blog",
    });

    return uploadedRes.url;
  } catch (error) {
    console.log(error);
  }
};
