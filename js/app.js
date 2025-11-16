import SnakeGame, { ROWS, COLS } from "./snake.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const CELL = 20;
canvas.width = COLS * CELL;
canvas.height = ROWS * CELL;

let game = new SnakeGame();

function draw() {
    // baggrund styling
    ctx.fillStyle = "#eee";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Vores linjer styling
    ctx.strokeStyle = "#ccc";   // lyse grå linjer
    ctx.lineWidth = 1;

    // lodrette linjer
    for (let c = 0; c <= COLS; c++) {
        ctx.beginPath();
        ctx.moveTo(c * CELL, 0);
        ctx.lineTo(c * CELL, canvas.height);
        ctx.stroke();
    }

    // vandrette linjer
    for (let r = 0; r <= ROWS; r++) {
        ctx.beginPath();
        ctx.moveTo(0, r * CELL);
        ctx.lineTo(canvas.width, r * CELL);
        ctx.stroke();
    }
    // -----------------

    // mad
    ctx.fillStyle = "red";
    ctx.fillRect(game.food.c * CELL, game.food.r * CELL, CELL, CELL);

    // slange
    const body = game.snake.toArray();
    for (let i = 0; i < body.length; i++) {
        const p = body[i];
        ctx.fillStyle = i === body.length - 1 ? "green" : "limegreen";
        ctx.fillRect(p.c * CELL, p.r * CELL, CELL, CELL);
    }

    if (!game.alive) {
        ctx.fillStyle = "black";
        ctx.font = "32px sans-serif";
        ctx.fillText("GAME OVER", 10, 40);
    }
}


function loop() {
    if (game.alive) {
        game.tick();
    }
    draw();
}

setInterval(loop, 200);

// Lad brugeren bruge WASD
window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowUp": game.setDirection(-1, 0); break;
        case "ArrowDown": game.setDirection(1, 0); break;
        case "ArrowLeft": game.setDirection(0, -1); break;
        case "ArrowRight": game.setDirection(0, 1); break;
    }
});
