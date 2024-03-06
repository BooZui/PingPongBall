export default class Ball {
  constructor(ctx, x, y, velocity) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.radius = 10
    this.speed = 5
    this.velocity = {
      x: velocity.x,
      y: velocity.y
    };
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.fillStyle = "black";
    this.ctx.fill();
    this.ctx.closePath();
  }
  update() {
    this.x += this.speed * this.velocity.x;
    this.y += this.speed * this.velocity.y;

    if (this.x - this.radius <= 0) this.velocity.x = -this.velocity.x;
    if (this.y - this.radius <= 0) this.velocity.y = -this.velocity.y;
    if (this.x + this.radius >= this.ctx.canvas.width) this.velocity.x = -this.velocity.x;
  }
}