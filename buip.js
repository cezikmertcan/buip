import fs from "fs";
function getNextsBySegment(segment) {
  const ids = [...segment.nexts];
  ids.forEach((element, index) => {
    ids[index] = buip.data.find((x) => x.id === element);
    ids[index].parentSegment = buip.currentSegment.id;
  });
  return ids;
}
const buip = {
  currentSegment: {},
  data: {},
  init: ({ jsonpath, initialSegment = 0 }) => {
    let jsonstring = fs.readFileSync(jsonpath);
    let obj = JSON.parse(jsonstring);
    obj.forEach((element) => {
      element.nextSegments = () => getNextsBySegment(element);
    });

    buip.jsonPath = jsonpath;
    buip.data = obj;
    const currentSegment = obj.find((x) => x.id === initialSegment);
    if (!currentSegment)
      throw new Error(
        `Can't find initial segment with id of ${initialSegment}`
      );
    buip.initialSegment = initialSegment;
    buip.currentSegment = currentSegment;
  },
  nextSegments: () => {
    const ids = [...buip.currentSegment.nexts];
    ids.forEach((element, index) => {
      ids[index] = buip.data.find((x) => x.id === element);
      ids[index].parentSegment = buip.currentSegment.id;
    });
    return ids;
  },
  getSegmentById(id) {
    return buip.data.find((x) => x.id === id);
  },
  selectSegment(id) {
    const segment = buip.data.find((x) => x.id === id);
    buip.currentSegment = segment;
  },
};

export default buip;
