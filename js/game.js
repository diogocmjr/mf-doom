class Game {
    constructor() {
        this.backgroundImages;
        this.playerImage;
        this.tokenImage;
        this.obstacleImage;
        this.menuImage;
    }

    setup() {
        this.player = new Player();
        this.background = new Background();
        this.tokens = [];
        this.obstacles = [];
    }

    preload() {
        this.backgroundImages = [
            { src: loadImage('/background/2/1.png'), x:0, speed: 0},
            { src: loadImage('/background/2/2.png'), x:0, speed: 1},
            { src: loadImage('/background/2/3.png'), x:0, speed: 2},
            { src: loadImage('/background/2/4.png'), x:0, speed: 3},
            { src: loadImage('/background/2/6.png'), x:0, speed: 4}
        ]
        this.playerImage = loadImage('/images/mfdoom.gif');
        this.tokenImage = loadImage('/images/p56e11ne7r861.png');
        this.obstacleImage = loadImage('/images/czarface.png')
        this.menuImage = loadImage('/menu/newgame.png')
    }

    draw() {
        clear();

        if (mode==0) {
            background(this.menuImage);
            textSize (40);
            text('Press "Enter" to Start', 300, 420);
            fill(256, 256, 256);
        }

        if (mode==1) {
            this.background.draw();
            this.player.draw();
    
            if (frameCount % 250 === 0) {
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
    
            if (frameCount % 150 === 0) {
                this.obstacles.push(new Obstacle(this.obstacleImage))    
            }
            this.obstacles.forEach(function (obstacle) {
                obstacle.draw();
            })
            this.obstacles = this.obstacles.filter(obstacle => {
                // console.log(this)
                if (obstacle.collision(this.player) || obstacle.x < 0) {
                    return false
                } else {
                    return true
                }        
            })

            textSize(32)
            text(`${this.player.lives.join(' ')}`, 30, 45)
            fill(255, 255, 255)
    
            textSize(32)
            text(`Score: ${this.player.score}`, 840, 45)
            fill(255, 255, 255)
        }

        if (mode==2) {
            background('rgba(256, 256, 256, 0.5)');
            text('Press "Enter" to resume', 320, 350);
            fill(0, 0, 0)
        }

        if (mode==3) {
            text('GAME OVER', 300, 420);
            fill(0, 0, 0)        
        }
    }

    reset() {
        this.player.lives = ['♡', '♡', '♡'];
        this.score = 0;
    }
}