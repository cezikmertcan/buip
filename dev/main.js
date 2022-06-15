import buip from "../buip.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);
const JSONPATH = path.join(__dirname, "../example-segments.json");

buip.init({
  jsonpath: JSONPATH,
  initialSegment: 1,
});
console.log(buip.currentSegment.customData);
