class Player {

    constructor() {
        this.lives = ['♡', '♡', '♡'];
        this.score = 0;
        this.width = 115;
        this.height = 135;
        this.x = 25;
        this.y = 450;
    }

    draw() {
        if (this.y >= height - this.height) {
            this.y = height - this.height;
        }

        if (this.y >= height + this.height) {
            this.y = height + this.height;
        }

        image(game.playerImage, this.x, this.y, this.width, this.height);

        if (keyIsDown(38)) {
            this.moveUp()
        }
        if (keyIsDown(40)) {
            this.moveDown()
        }
        if (keyIsDown(37)) {
            this.moveLeft()
        }
        if (keyIsDown(39)) {
            this.moveRight()
        }
    }

    moveUp() {
        this.y -= 3;
    }
    moveDown() {
        this.y += 3;
    }
    moveRight() {
        this.x += 3;
    }
    moveLeft() {
        this.x -= 3;
    }

    gameOver() {
        if (game.player.lives.length < 1) {
            // console.log('game is over')
            game.mainSound.pause();
            mode = 3
        }
    }
}