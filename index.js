const buip = {
  currentSegment: {},
  data: {},
  init: (config) => {
    config.segments.forEach((element) => {
      element.nextSegments = () => _getNextsBySegment(element);
    });
    buip.data = config;
    const currentSegment = config.segments.find(
      (x) => x.id === config.initialSegment
    );
    if (!currentSegment)
      throw new Error(
        `Can't find initial segment with id of ${config.initialSegment}`
      );
    buip.initialSegment = config.initialSegment;
    buip.currentSegment = currentSegment;
    buip._init = buip.init;
    delete buip.init;
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
