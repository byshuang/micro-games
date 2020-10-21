const canvas = document.getElementById('game_canvas');
const ctx = canvas.getContext('2d');
const grid_size = 20, tile_count = 30, render_size = grid_size - 2;

let x_velocity = 0, y_velocity = 0;
let x_pos = 10, y_pos = 10;
let apple_x = 15, apple_y = 15;
let snake = [];
let tail_len = 1;

const renderGrid = (color, x, y) => {
    ctx.fillStyle=color
    ctx.fillRect(x * grid_size, y * grid_size, render_size, render_size)
}

const game = () => {
    x_pos += x_velocity;
    y_pos += y_velocity;

    if (x_pos <= 0) x_pos = tile_count - 1;
    if (x_pos >= tile_count) x_pos = 0;
    if (y_pos <= 0) y_pos = tile_count - 1;
    if (y_pos >= tile_count) y_pos = 0;

    ctx.fillStyle="black";
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    snake.push({x: x_pos, y: y_pos});
    if (x_pos == apple_x && y_pos == apple_y) {
        tail_len++;
        apple_x = Math.floor(Math.random() * tile_count)
        apple_y = Math.floor(Math.random() * tile_count)
    }
    
    while (snake.length > tail_len) {
        snake.shift();
    }

    snake.forEach((e, i) => {
        renderGrid('lime', e.x, e.y);
        if (e.x == x_pos && e.y == y_pos && tail_len > 1 && i != snake.length - 1) {
            alert("You must be crazy to eat yourself. Game ends.");
        }
    });

    renderGrid('red', apple_x, apple_y);
}

const keydownListener = (event) => {
    switch (event.keyCode) {
        case 37: // left
            x_velocity=-1; y_velocity=0; 
            break;
        case 38: //up
            x_velocity=0; y_velocity=-1; 
            break;
        case 39:
            x_velocity=1; y_velocity=0; 
            break;
        case 40:
            x_velocity=0; y_velocity=1; 
            break;
    }
}

window.onload = () => {
    document.addEventListener('keydown', keydownListener);
    setInterval(game, 1000 / 12);
}


