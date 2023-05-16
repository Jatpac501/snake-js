let snakeSpeed = 200;
let gameLoop = setInterval(draw, snakeSpeed);
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const gameOver = document.querySelector(".gameOver");
const controls = document.querySelector('.controls');
let snake = Array.from({length: 5}, () => ({ x: 350, y: 350 }));
let dx = 50;
let dy = 0;
let foodX = Math.floor(Math.random() * (canvas.width / 50)) * 50;
let foodY = Math.floor(Math.random() * (canvas.height / 50)) * 50;
let score = 0;
const scoreStr = document.querySelector('.scoreContainer');
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
        foodX = Math.floor(Math.random() * (canvas.width / 50)) * 50;
        foodY = Math.floor(Math.random() * (canvas.height / 50)) * 50;
        score++;
        scoreStr.innerHTML = 'Очки:' + score;
        document.title = `SNAKE.SCORE(${score})`;
        if (score % 5 == 0) {
            snakeSpeed *= 0.9;
            clearInterval(gameLoop);
            gameLoop = setInterval(draw, snakeSpeed);
        }
    } else {
        snake.pop();
    }
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || bodyCheck(head, snake.slice(1))) {
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
    snakePart !== snake[0] ? ctx.fillStyle = "#000" : null;
    ctx.fillRect(snakePart.x + 3, snakePart.y + 3, 44, 44);
}
document.addEventListener("keydown", (e) => {
    key(e.key);
    console.log(e.key)
    if (e.code=== 'KeyR') {
        location.reload();
    }
});
controls.addEventListener("click", (e) => {
    const pressKey = e.target.classList.value;
    pressKey === 'w key' ? key('ArrowUp') :
    pressKey === 'a key' ? key('ArrowLeft') :
    pressKey === 's key' ? key('ArrowDown') :
    pressKey === 'd key' ? key('ArrowRight') : null;
});
const key = async function checkKeys(e) {
    await new Promise((pass) => setTimeout(pass, snakeSpeed/2));
    const up = dy == -50;
    const down = dy == 50;
    const left = dx == -50;
    const right = dx == 50;
    e === 'ArrowLeft' && !right ? (dx = -50, dy = 0) :
    e === 'ArrowUp' && !down ? (dx = 0, dy = -50) :
    e === 'ArrowRight' && !left ? (dx = 50, dy = 0) :
    e === 'ArrowDown' && !up ? (dx = 0, dy = 50) : null;
}
function bodyCheck(head, snakeBody) {
    return snakeBody.some((snakePart) => snakePart.x == head.x && snakePart.y == head.y);
}