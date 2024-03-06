export default class GameBoard {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  drawSize(canvas, scoreElement) {
    // Set size of the canvas element and score position.
    canvas.style.cssText = 'width: ' + this.width + 'px; height: ' + this.height + 'px;'
    scoreElement.style.cssText = 'top: -' + this.height / 2 + 'px; left: -' + this.width / 2 + 'px';
  }
}