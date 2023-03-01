import multer from "multer";

const singleFile = multer({
  storage: multer.memoryStorage(),
}).single("file");

export default singleFile;
