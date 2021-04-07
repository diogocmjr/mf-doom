class Hostage {
    constructor() {
        this.width = 150;
        this.height = 180;
        this.x = 818;
        this.y = 418;
    }

    collision(playerInfo) {
        console.log('hostage', playerInfo);
        const hostageX = this.x + this.width / 2;
        const hostageY = this.y + this.height / 2;
        const playerX = playerInfo.x + playerInfo.width / 2;
        const playerY = playerInfo.y + playerInfo.height / 2;
    

    // then use the P5 function dist() to calculate the distance
        if (dist(hostageX, hostageY, playerX, playerY) > 97) {
            return false;
        } else {
            game.omgSound.play();
            return true;
        }
    }

    draw() {
        image(game.hostageImage, this.x, this.y, this.width, this.height);
    }
}