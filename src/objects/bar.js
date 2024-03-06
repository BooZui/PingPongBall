export default class Bar {
  constructor(ctx, canvasHeight, width, x) {
    this.ctx = ctx;
    this.width = width;
    this.height = 5
    this.x = x;
    this.y = canvasHeight - this.height
  }

  draw() {
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update(input) {
    if (input.includes("a") && !input.includes("d")) {
      this.x -= 5;
    }

    if (input.includes("d") && !input.includes("a")) {
      this.x += 5;
    }

    if (this.x < 0) {
      this.x = 0;
    }

    if (this.x + this.width > canvas.width) {
      this.x = canvas.width - this.width;
    }
  }
}