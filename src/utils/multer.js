import multer, { diskStorage } from "multer";

export const typesObj = {
  img: ["image/png", "image/jpeg"],
  pdf: ["application/pdf"],
};

const uploadFile = () => {
  const fileFilter = (req, file, cb) => {
    if (!typesObj.pdf.includes(file.mimetype) || !typesObj.img.includes(file.mimetype))
      return cb(new Error("invalid data type"), false);
    return cb(null, true);
  };
  return multer({ storage: diskStorage({}, fileFilter) });
};

export default uploadFile;
