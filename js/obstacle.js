class Obstacle {
    constructor(image) {
        this.image = image;
        this.x = width;
        this.y = (Math.random() * 450) + 50; // => 1.5 distributes obstacles more than if it was 3
        this.width = 55;
        this.height = 65;
    }

    collision(playerInfo) {
        // console.log('obstacle', playerInfo);
        const obstacleX = this.x + this.width / 2;
        const obstacleY = this.y + this.height / 2;
        const playerX = playerInfo.x + playerInfo.width / 2;
        const playerY = playerInfo.y + playerInfo.height / 2;
    

    // then use the P5 function dist() to calculate the distance
        if (dist(obstacleX, obstacleY, playerX, playerY) > 99) {
            return false;
        } else {
            game.czarSound.play();
            game.player.lives.pop();
            return true;
        }
    }

    draw() {
        this.x -= 5;
        image(this.image, this.x, this.y, this.width, this.height);
    }
}
