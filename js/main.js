const game = new Game();
let mode;

function preload() {
    game.preload();
}

function setup() {
    mode = 0;
    createCanvas(1000, 600)
    game.setup();
}
function draw() {
    game.draw();
    game.player.gameOver();
}

function keyPressed() {
    if (keyCode === 40) {
        game.player.moveUp();
    }
    if (keyCode === 38) {
        game.player.moveDown();
    }
    if (keyCode === 39) {
        game.player.moveRight();
    }
    if (keyCode === 37) {
        game.player.moveLeft();
    }
    if (keyCode === 13) {
        mode = 1;
    }
    if (keyCode === 80) {
        mode = 2;
    }
    if (keyCode === 82) {
        game.reset();
        mode = 0;
    }
}