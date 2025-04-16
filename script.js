const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let dx = 1;
let dy = 0;
let score = 0;

function gameLoop() {
  moveSnake();
  if (checkCollision()) {
    alert("Игра окончена! Очки: " + score);
    document.location.reload();
    return;
  }

  if (eatFood()) {
    score++;
    placeFood();
  } else {
    snake.pop();
  }

  drawGame();
}

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
}

function checkCollision() {
  const [head, ...body] = snake;
  if (
    head.x < 0 || head.x >= tileCount ||
    head.y < 0 || head.y >= tileCount ||
    body.some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    return true;
  }
  return false;
}

function eatFood() {
  return snake[0].x === food.x && snake[0].y === food.y;
}

function placeFood() {
  food = {
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount)
  };
}

function drawGame() {
  ctx.fillStyle = "#222";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "lime";
  for (let segment of snake) {
    ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 1, gridSize - 1);
  }

  ctx.fillStyle = "red";
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 1, gridSize - 1);
}

document.addEventListener("keydown", e => {
  switch (e.key) {
    case "ArrowUp": if (dy === 0) { dx = 0; dy = -1; } break;
    case "ArrowDown": if (dy === 0) { dx = 0; dy = 1; } break;
    case "ArrowLeft": if (dx === 0) { dx = -1; dy = 0; } break;
    case "ArrowRight": if (dx === 0) { dx = 1; dy = 0; } break;
  }
});

setInterval(gameLoop, 150);
