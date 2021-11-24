import { Dots } from "./build";

const makeMineField = () => {
  const dotsArray = [];

  let idx = 0;

  for (var x = 1; x < 10; x++) {
    for (var y = 1; y < 10; y++) {
      const dot = new Dots({ x, y, idx });

      dotsArray.push(dot);

      idx += 1;
    }
  }

  dotsArray.forEach((dot, idx1) => {
    let track = [];

    const xAxis = dot.xAxis;
    const yAxis = dot.yAxis;

    for (var x = -1; x < 2; x++) {
      for (var y = -1; y < 2; y++) {
        if (yAxis - y <= 0 || yAxis - y >= 10) {
          continue;
        }
        if (xAxis - x <= 0 || xAxis - x >= 10) {
          continue;
        }

        track.push({ xS: xAxis - x, yS: yAxis - y });
      }
    }

    dotsArray.forEach((e, i) => {
      track.forEach((cc) => {
        if (i === idx1) {
          return;
        }

        if (e.xAxis === cc.xS && e.yAxis === cc.yS) {
          dot.areaPush(i);
          //console.log('toPush',i)
          return;
        }
      });
    });
  });

  return dotsArray;
};

export default makeMineField;
