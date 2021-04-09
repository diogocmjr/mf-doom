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
    if (keyCode === 38 && mode == 1) {
        game.player.moveUp();
        game.upSound.play();
    }
    if (keyCode === 40 && mode == 1) {
        game.player.moveDown();
        game.downSound.play();
    }
    if (keyCode === 39 && mode == 1) {
        game.player.moveRight();
        game.rightSound.play();
    }
    if (keyCode === 37 && mode == 1) {
        game.player.moveLeft();
        game.leftSound.play();
    }
    if (keyCode === 13 && (mode == 0 || mode == 2)) {
        mode = 1;
        game.mainSound.play();
        frameRate(50)
    }
    if (keyCode === 80 && mode == 1) {
        mode = 2;
        game.mainSound.pause();
        game.chainSound.pause()
    }
    if (keyCode === 77) {
        window.location.reload(1)
    }
    if (keyCode === 82 && (mode == 2 || mode == 3)) {
        game.mainSound.stop();
        game.reset();
    }
    if (keyCode === 73 && mode == 0) {
        mode = 5;
    }
    if (keyCode === 66 && mode == 5) {
        mode = 0;
    }
}
