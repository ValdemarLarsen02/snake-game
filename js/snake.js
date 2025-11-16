import Queue from "./queue.js";

export const ROWS = 20;
export const COLS = 30;

export default class SnakeGame {
    constructor() {
        this.snake = new Queue();
        this.direction = { r: 0, c: 1 }; // højre
        this.nextDirection = this.direction;
        this.food = null;
        this.alive = true;

        // Startslange på midten
        const startR = Math.floor(ROWS / 2);
        const startC = Math.floor(COLS / 2);

        this.snake.enqueue({ r: startR, c: startC - 1 });
        this.snake.enqueue({ r: startR, c: startC });
        this.snake.enqueue({ r: startR, c: startC + 1 });

        this.spawnFood();
    }

    spawnFood() {
        while (true) {
            const r = Math.floor(Math.random() * ROWS);
            const c = Math.floor(Math.random() * COLS);

            if (!this.isSnake(r, c)) {
                this.food = { r, c };
                return;
            }
        }
    }

    isSnake(r, c) {
        let node = this.snake.head;
        while (node) {
            const p = node.data;
            if (p.r === r && p.c === c) return true;
            node = node.next;
        }
        return false;
    }

    setDirection(dr, dc) {
        // ingen 180°
        if (dr === -this.direction.r && dc === -this.direction.c) return;
        this.nextDirection = { r: dr, c: dc };
    }

    tick() {
        if (!this.alive) return;

        this.direction = this.nextDirection;

        // head er sidste element i queue
        const body = this.snake.toArray();
        const head = body[body.length - 1];

        let newR = head.r + this.direction.r;
        let newC = head.c + this.direction.c;

        // wrap around
        if (newR < 0) newR = ROWS - 1;
        if (newR >= ROWS) newR = 0;
        if (newC < 0) newC = COLS - 1;
        if (newC >= COLS) newC = 0;

        // kollision med kroppen?
        if (this.isSnake(newR, newC)) {
            this.alive = false;
            return;
        }

        // læg ny head på
        this.snake.enqueue({ r: newR, c: newC });

        // spiser?
        if (this.food.r === newR && this.food.c === newC) {
            this.spawnFood(); // vokser → fjern IKKE tail
        } else {
            this.snake.dequeue(); // flyt frem → fjern tail
        }
    }
}
