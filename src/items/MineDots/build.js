export class Dots {
  constructor({ x, y, idx }) {
    this._xAxis = x;
    this._yAxis = y;
    this._bomb = false;
    this._around = 0;
    this._area = [];
    this._reveal = false;
    this._index = idx;
  }

  addBomb() {
    this._bomb = true;
  }

  addAround(cc) {
    if (this._around === "B") {
      return;
    }
    if (cc === 1) {
      this._around += 1;
      return;
    }
    this._around = "B";
  }

  revealIt() {
    if (this._reveal) {
      return;
    }
    this._reveal = true;
  }

  areaPush(n) {
    this._area.push(n);
  }

  get xAxis() {
    return this._xAxis;
  }

  get yAxis() {
    return this._yAxis;
  }

  get bomb() {
    return this._bomb;
  }

  get around() {
    return this._around;
  }

  get reveal() {
    return this._reveal;
  }

  get index() {
    return this._index;
  }
  get area() {
    return this._area;
  }
}
