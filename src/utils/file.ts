export const bufferToBase64 = (buffer: Buffer) => {
  const b64 = Buffer.from(buffer).toString("base64");

  return b64;
};

export const validateMimeType = (
  mimeType: string,
  acceptedMimeTypes: string[]
) => {
  return acceptedMimeTypes.includes(mimeType);
};

export const convertBase64ToDataURI = (base64: string, mimeType: string) => {
  return `data:${mimeType};base64,${base64}`;
};
