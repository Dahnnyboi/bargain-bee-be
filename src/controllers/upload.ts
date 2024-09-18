import { IMAGE_FILE_EXTENSIONS, IMAGE_MIME_TYPES } from "constants/variables";
import { NextFunction, Request, Response } from "express";
import { handleImageUpload } from "services/cloudinary";
import {
  bufferToBase64,
  convertBase64ToDataURI,
  validateMimeType,
} from "utils/file";
import {
  errorFormatterResponse,
  successActionFormatterResponse,
} from "utils/formatter";
import { joinWithAnd } from "utils/string";

export const uploadImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const file = req.file;

  if (!file) {
    res.status(400);
    res.json(errorFormatterResponse("Invalid image cannot be empty"));
    return;
  }

  if (!validateMimeType(file.mimetype, IMAGE_MIME_TYPES)) {
    res.status(400);
    res.json(
      errorFormatterResponse(
        `Invalid file extension. Only accepted file extension are ${joinWithAnd(IMAGE_FILE_EXTENSIONS)}`
      )
    );
    return;
  }

  const { mimetype } = file;

  const base64 = bufferToBase64(file.buffer);
  const dataUri = convertBase64ToDataURI(base64, mimetype);

  try {
    const result = await handleImageUpload(dataUri);
    const { url } = result;

    res.status(200);
    res.json(
      successActionFormatterResponse("Successfully uploaded image", { url })
    );
  } catch (err) {
    next(err);
  }
};
