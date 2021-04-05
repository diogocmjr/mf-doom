class Player {

    constructor() {
        this.score = 0;
        this.width = 120;
        this.height = 140;
        this.x = 20;
        this.y = height - (this.height);
    }

    draw() {
        if (this.y >= height - this.height) {
            this.y = height - this.height;
        }
        image(game.playerImage, this.x, this.y, this.width, this.height);

        if (keyIsDown(40)) {
            this.moveUp()
        }
        if (keyIsDown(38)) {
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
        this.y += 10;
    }
    moveDown() {
        this.y -= 10;
    }
    moveRight() {
        this.x += 10;
    }
    moveLeft() {
        this.x -= 10;
    }
}