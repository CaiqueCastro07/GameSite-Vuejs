export class Carta {
  constructor({ title, media }) {
    this._title = title;
    this._media = media;
    this._flipped = true;
    this._found = false;
  }

  foundIt() {
    this._found = true;
  }

  flipIt() {
    this._flipped = !this._flipped;
  }

  hideAll() {
    this._flipped = false;
  }

  showAll() {
    this._flipped = true;
  }

  get title() {
    return this._title;
  }

  get media() {
    return this._media;
  }

  get flipped() {
    return this._flipped;
  }

  get found() {
    return this._found;
  }
}
