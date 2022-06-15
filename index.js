const buip = {
  currentSegment: {},
  data: {},
  init: ({ data }) => {
    data.segments.forEach((element) => {
      element.nextSegments = () => _getNextsBySegment(element);
    });
    buip.data = data;
    const currentSegment = data.segments.find(
      (x) => x.id === data.initialSegment
    );
    if (!currentSegment)
      throw new Error(
        `Can't find initial segment with id of ${data.initialSegment}`
      );
    buip.initialSegment = data.initialSegment;
    buip.currentSegment = currentSegment;
    buip._init = buip.init;
    buip.init = undefined;
  },
  nextSegments: () => {
    const ids = [...buip.currentSegment.nexts];
    ids.forEach((element, index) => {
      ids[index] = buip.data.segments.find((x) => x.id === element);
      ids[index].parentSegment = buip.currentSegment.id;
    });
    return ids;
  },
  getSegmentById(id) {
    return buip.data.segments.find((x) => x.id === id);
  },
  selectSegment(id) {
    const segment = buip.data.segments.find((x) => x.id === id);
    buip.currentSegment = segment;
  },
};

function _getNextsBySegment(segment) {
  const ids = [...segment.nexts];
  ids.forEach((element, index) => {
    ids[index] = buip.data.find((x) => x.id === element);
    ids[index].parentSegment = buip.currentSegment.id;
  });
  return ids;
}

export default buip;
