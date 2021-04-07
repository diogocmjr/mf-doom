class Game {
    constructor() {
        this.backgroundImages;
        this.playerImage;
        this.hostageImage;
        this.jailImage;
        this.tokenImage;
        this.obstacleImage;
        this.menuImage;
        this.pauseImage;
        this.upSound;
        this.downSound;
        this.leftSound;
        this.rightSound;
        this.czarSound;
        this.figaroSound;
        this.mainSound;
        this.omgSound;
        this.chainSound;
    }

    setup() {
        this.player = new Player();
        this.hostage = new Hostage();
        this.jails = new Jail();
        this.background = new Background();
        this.tokens = [];
        this.obstacles = [];
    }

    preload() {
        this.backgroundImages = [
            { src: loadImage('background/1/10.png'), x:0, speed: 0},
            { src: loadImage('background/1/09.png'), x:0, speed: 1},
            { src: loadImage('background/1/08.png'), x:0, speed: 1.5},
            { src: loadImage('background/1/07.png'), x:0, speed: 2},
            { src: loadImage('background/1/06.png'), x:0, speed: 2.5},
            { src: loadImage('background/1/05.png'), x:0, speed: 3},
            { src: loadImage('background/1/04.png'), x:0, speed: 3.5},
            { src: loadImage('background/1/03.png'), x:0, speed: 4},
            { src: loadImage('background/1/02.png'), x:0, speed: 4.5},
            { src: loadImage('background/1/01.png'), x:0, speed: 5}
        ]
        this.playerImage = loadImage('images/mfdoom.gif');
        this.hostageImage = loadImage('images/giphy.gif');
        this.jailImage = loadImage('images/cell.png');
        this.tokenImage = loadImage('images/p56e11ne7r861.png');
        this.obstacleImage = loadImage('images/czarface.png');
        this.menuImage = loadImage('menu/newgame.png');
        this.pauseImage = loadImage('menu/pause.jpg')
        this.upSound = loadSound('sounds/up.mp3');
        this.downSound = loadSound('sounds/down.mp3');
        this.leftSound = loadSound('sounds/sides.mp3');
        this.rightSound = loadSound('sounds/sides.mp3');
        this.czarSound = loadSound('sounds/czarface.mp3');
        this.figaroSound = loadSound('sounds/ohyea.mp3');
        this.mainSound = loadSound('sounds/gametheme.mp3');
        this.omgSound = loadSound('sounds/omg.mp3');
        this.chainSound = loadSound('sounds/chainpulled.mp3');
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
    
            if (frameCount % 300 === 0) {
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
    
            if (frameCount % 100 === 0) {
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
            fill(0, 0, 0)
    
            textSize(32)
            text(`Score: ${this.player.score}`, 840, 45)
            fill(0, 0, 0)

            if (this.background.counter >= 2000) {
                this.hostage.draw();
                this.jails.draw();
            }

            if (this.hostage.collision(this.player)) {
                mode = 4;
            }

            if (this.player.score >= 10) {
                if (!this.chainSound.isPlaying()) {
                    this.chainSound.play();
                }
                this.jails.y--;
            }  
        }

        if (mode==2) {
            image(this.pauseImage, 250, 50, 500, 500);
            text('Take your time, have a coffee!', 260, 70);
            text('Press "Enter" to resume', 350, 450);
            fill(265, 265, 265);
        }

        if (mode==3) {
            text('GAME OVER', 300, 420);
            fill(0, 0, 0);        
        }

        if (mode==4) {
            text('YOU WIN', 300, 420);
            fill(0, 0, 0);
            this.mainSound.pause();
            this.chainSound.pause();
            this.figaroSound.pause();
            this.czarSound.pause();

        }
    }    

    reset() {
        this.player.lives = ['♡', '♡', '♡'];
        this.player.score = 0;
        this.player.width = 110;
        this.player.height = 130;
        this.player.x = 25;
        this.player.y = 450;
    }
}