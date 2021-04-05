const game = new Game();

function preload() {
    game.preload();
}

function setup() {
    createCanvas(900, 600)
    game.setup();
}
function draw() {
    game.draw();
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
}