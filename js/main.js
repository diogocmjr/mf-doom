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
    if (keyCode === 38) {
        game.player.moveUp();
        game.upSound.play();
    }
    if (keyCode === 40) {
        game.player.moveDown();
        game.downSound.play();
    }
    if (keyCode === 39) {
        game.player.moveRight();
        game.rightSound.play();
    }
    if (keyCode === 37) {
        game.player.moveLeft();
        game.leftSound.play();
    }
    if (keyCode === 13) {
        mode = 1;
        game.mainSound.play();
    }
    if (keyCode === 80) {
        mode = 2;
        game.mainSound.pause();
    }
    if (keyCode === 82) {
        window.location.reload(1)
    }
}