import buip from "../index.js";
import segments from "../example-segments.json" assert { type: "json" };
buip.init({
  data: segments,
});
//console.log(buip.currentSegment);
