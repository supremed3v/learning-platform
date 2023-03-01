import DataUriParser from "datauri/parser";
import path from "path";

const parseData = (file) => {
  const parser = new DataUriParser();
  const extName = path.extname(file.originalname).toString();
  return parser.format(file.originalname, file.buffer);
};

export default parseData;
