import GameBoard from "./objects/gameBoard.js";
import Bar from "./objects/bar.js";
import BarEvent from "./events/barEvent.js";
import Ball from "./objects/ball.js";
import vector from "./functions/vector.js";
import GameOver from "./functions/gameOver.js";

export const scoreElement = document.getElementById("score");
const gameSizeButton = document.getElementById("gameSizeButton");
const gamePlay = document.getElementById("gamePlay");
const playButton = document.getElementById("playButton");
const gameOver = document.getElementById("gameOver");
const restart = document.getElementById("restart");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Play button event.
playButton.addEventListener("click", () =>{
  gamePlay.style.display = "none";
  scoreElement.style.display = "block";
  playGame()
});

// Game size button event.
let sizes = [400, 500, 600, 700];
let indexOfSizes = 1;
let size = sizes[indexOfSizes];
// Set atributes for bar object and ball object
let bar = 0;
let ball = 0;
let barX = 0;
let ballX = 0;
let ballY = 0;
// Create game board object.
const gameBoard = new GameBoard(size, size);
gameBoard.drawSize(canvas, scoreElement);
// Set canvas size
canvas.width = size;
canvas.height = size;

gameSizeButton.addEventListener("click", () => {
  indexOfSizes++;

  if (indexOfSizes >= sizes.length) {
    indexOfSizes = 0;
  }

  size = sizes[indexOfSizes];
  gameSizeButton.innerHTML = size;
  gamePlay.style.cssText = "width: " + size + "px; height: " + size + "px;"
  // Replace the canvas size end the game board size with the new size.
  canvas.width = size;
  canvas.height = size;
  gameBoard.width = size;
  gameBoard.height = size;
  // Draw the game board.
  gameBoard.drawSize(canvas, scoreElement);

  // Create bar object.
  const barWidth = 100;
  barX = canvas.width / 2 - barWidth / 2;
  bar = new Bar(ctx, canvas.height, barWidth, barX);
  
  //Create ball object.
  const ballRadius = 10;
  ballX = barX + barWidth / 2;
  ballY = canvas.height - bar.height - ballRadius;
  ball = new Ball(ctx, ballX, ballY, { x: 0, y: 0 });
});


// Create ball event object.
const barEvent = new BarEvent();
// Set atributes for game play.
let lastTime = 0;
let posBar = barX;
let score = 0;
let time = 0;

export function animate(timeStamp) {
  const deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  const animation = requestAnimationFrame(animate);
  
  // Draw display game.
  ctx.fillStyle = "#ccc8";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw game objects
  bar.draw();
  ball.draw(canvas);
  bar.update(barEvent.keys);
  ball.update();

  // Set friction and velocity for bar object.
  const friction = 0.1 / ball.speed;
  const velocityBar =
    (((1000 / deltaTime) * (bar.x - posBar)) / deltaTime) * friction;
  posBar = bar.x;

  // Event bar.
  if (
    ball.y + ball.radius >= bar.y &&
    ball.x < bar.x + bar.width &&
    ball.x > bar.x
  ) {
    ball.velocity = {
      x: vector(ball.velocity.x + velocityBar, ball.velocity.y).x,
      y: vector(ball.velocity.x + velocityBar, ball.velocity.y).y,
    };
    ball.velocity.y = -ball.velocity.y;
  }

  // Set score.
  const scoreGame = scoreElement.querySelector("span");
  time += deltaTime > 0 ? deltaTime : 0;

  if (time >= 2000) {
    time = 0;
    score += 1;
    scoreGame.innerHTML = score;
  }

  // Game over event handler.
  if (ball.y + ball.radius >= canvas.height) {
    cancelAnimationFrame(animation);
    ctx.fillStyle = "#ccc";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    GameOver();
    restart.addEventListener("click", () => {
      gameOver.style.display = "none";
      score = 0;
      scoreGame.innerHTML = 0;
      playGame();
    });
  }
}

// Create function playGame.
function playGame() {
  ball.x = ballX;
  ball.y = ballY;
  bar.x = barX;
  ball.velocity = { x: 0, y: 0 };
  bar.draw(canvas);
  ball.draw(canvas);
  let isExist = false;

  canvas.addEventListener("click", (event) => {
    if (!isExist) {
      const x = event.offsetX - ballX;
      const y = event.offsetY - ballY;
      const velocity = vector(x, y);
      ball.velocity = velocity;
      animate();
      isExist = true;
    }
  });
}