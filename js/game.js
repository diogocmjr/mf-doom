class Game {
    constructor() {
        this.backgroundImages;
        this.playerImage;
        this.tokenImage;
    }

    setup() {
        this.player = new Player();
        this.background = new Background();
        this.tokens = [];
    }

    preload() {
        this.backgroundImages = [
            { src: loadImage('/background/2/1.png'), x:0, speed: 0},
            { src: loadImage('/background/2/2.png'), x:0, speed: 1},
            { src: loadImage('/background/2/3.png'), x:0, speed: 2},
            { src: loadImage('/background/2/4.png'), x:0, speed: 3},
            { src: loadImage('/background/2/6.png'), x:0, speed: 3}
        ]
        this.playerImage = loadImage('/images/mfdoom.gif');
        this.tokenImage = loadImage('/images/p56e11ne7r861.png');
    }

    draw() {
        clear();
        this.background.draw();
        this.player.draw();

        if (frameCount % 150 === 0) {
            this.tokens.push(new Token(this.tokenImage))
        }
        this.tokens.forEach(function (token) {
            token.draw();
        })
        this.tokens = this.tokens.filter(token => {
            // console.log(this)
            if (token.collision(this.player) || token.x < 0) {
                return false
            } else {
                return true
            }        
        })
    }
}
