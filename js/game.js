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
            { src: loadImage('background/1/09.png'), x:0, speed: 0.5},
            { src: loadImage('background/1/08.png'), x:0, speed: 1},
            { src: loadImage('background/1/07.png'), x:0, speed: 1.5},
            { src: loadImage('background/1/06.png'), x:0, speed: 2},
            { src: loadImage('background/1/05.png'), x:0, speed: 2.5},
            { src: loadImage('background/1/04.png'), x:0, speed: 3},
            { src: loadImage('background/1/03.png'), x:0, speed: 3.5},
            { src: loadImage('background/1/02.png'), x:0, speed: 4},
            { src: loadImage('background/1/01.png'), x:0, speed: 4.5}
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
            fill(0, 0, 0)
    
            textSize(32)
            text(`Score: ${this.player.score}`, 840, 45)
            fill(0, 0, 0)

            if (this.background.counter >= 2000) {
                this.hostage.draw();
                this.jails.draw();
            }

            if (this.hostage.collision(this.player)) {   
            }
            
            if (this.player.score >= 30) {
                // this.chainSound.play();
                this.jails.y--;
            }
            // this.hostages = this.hostages.filter(jail => {
            //     if (jail.collision(this.player) || jail.x < 0) {
            //         return false
            //     } else {
            //         return true
            //     }
            // })    
        }

        if (mode==2) {
            background(this.pauseImage);
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
        this.player.score = 0;
        this.player.width = 110;
        this.player.height = 130;
        this.player.x = 25;
        this.player.y = 450;
        // this.background = background.draw();
    }
}