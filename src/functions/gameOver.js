const gameOver = document.getElementById('gameOver');
const gameScore = document.getElementById('displayScore');
import { scoreElement } from "../script.js"

export default function GameOver() {
  gameOver.style.display = "block";
  gameScore.innerHTML = scoreElement.querySelector('span').innerHTML;
}