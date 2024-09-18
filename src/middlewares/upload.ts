import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const uploadSingleImage = upload.single("image");
export const uploadMultipleImage = upload.array("images");
