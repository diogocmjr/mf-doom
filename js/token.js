class Token {
    constructor(image) {
        this.image = image;
        this.x = width;
        this.y = (Math.random() * 450) + 50; // => 1.5 distributes obstacles more than if it was 3
        this.width = 55;
        this.height = 55;
    }

    collision(playerInfo) {
        // console.log('token', playerInfo);
        const tokenX = this.x + this.width / 2;
        const tokenY = this.y + this.height / 2;
        const playerX = playerInfo.x + playerInfo.width / 2;
        const playerY = playerInfo.y + playerInfo.height / 2;
    

    // then use the P5 function dist() to calculate the distance
        if (dist(tokenX, tokenY, playerX, playerY) > 97) {
            return false;
        } else {
            game.player.score += 10;
            return true;
        }
    }

    draw() {
        this.x--;
        image(this.image, this.x, this.y, this.width, this.height);
    }
}