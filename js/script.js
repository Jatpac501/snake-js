let snakeSpeed = 200;
let gameLoop = setInterval(draw, snakeSpeed);
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const gameOver = document.querySelector(".gameOver");
let snake = [
    { x: 300, y: 500 },
    { x: 300, y: 500 },
    { x: 300, y: 500 },
    { x: 300, y: 500 },
    { x: 300, y: 500 }
];
let dx = 50;
let dy = 0;
let foodX;
let foodY;
let score = 0;
const scoreStr = document.querySelector('.scoreContainer');
food();
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.shadowColor = "#f00";
    ctx.shadowBlur = '25';
    ctx.fillStyle = "#f00";
    ctx.fillRect(foodX, foodY, 50, 50);
    snake.forEach(drawSnake);
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    if (head.x == foodX && head.y == foodY) {
        food();
        score++;
        scoreStr.innerHTML = 'Очки:' + score;
        document.title = `SNAKE.SCORE(${score})`;
        if (score % 5 == 0) {
            snakeSpeed *= 0.95;
            clearInterval(gameLoop);
            gameLoop = setInterval(draw, snakeSpeed);
        }
    } else {
        snake.pop();
    }
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || checkCollision(head, snake.slice(1))) {
        clearInterval(gameLoop);
        document.title = `SNAKE.GAMEOVER`;
        gameOver.style.opacity = '1';
        canvas.style.height = '100px';
        canvas.style.width = '500px';
        setTimeout(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);  
        }, 1000);
    }
}
function drawSnake(snakePart) {
    ctx.shadowColor = "#fff";
    ctx.shadowBlur = 16;
    ctx.fillStyle = "#fff";
    ctx.fillRect(snakePart.x, snakePart.y, 50, 50);
    if (snakePart !== snake[0]) {
        ctx.fillStyle = "#000";
        ctx.fillRect(snakePart.x+3, snakePart.y+3, 44, 44);
    }
}
document.addEventListener("keydown", (e) => {
    const goingUp = dy == -50;
    const goingDown = dy == 50;
    const goingLeft = dx == -50;
    const goingRight = dx == 50;
    if (e.key == 'ArrowLeft' && !goingRight) {
        dx = -50;
        dy = 0;
    }
    if (e.key == 'ArrowUp' && !goingDown) {
        dx = 0;
        dy = -50;
    }
    if (e.key == 'ArrowRight' && !goingLeft) {
        dx = 50;
        dy = 0;
    }
    if (e.key == 'ArrowDown' && !goingUp) {
        dx = 0;
        dy = 50;
    }
});
function checkCollision(head, snakeBody) {
    return snakeBody.some((snakePart) => snakePart.x == head.x && snakePart.y == head.y);
}
function food() {
    foodX = Math.floor(Math.random() * (canvas.width / 50)) * 50;
    foodY = Math.floor(Math.random() * (canvas.height / 50)) * 50;
}

