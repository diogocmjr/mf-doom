class Game {
    constructor() {
        this.backgroundImages;
        this.playerImage;
        this.hostageImage;
        this.jailImage;
        this.tokenImage;
        this.lifeImage;
        this.obstacleImage;
        this.menuImage;
        this.tributeImage;
        this.rImage;
        this.mImage;
        this.pImage;
        this.bImage;
        this.aImage;

        this.upSound;
        this.downSound;
        this.leftSound;
        this.rightSound;
        this.czarSound;
        this.lifeSound;
        this.figaroSound;
        this.mainSound;
        this.omgSound;
        this.chainSound;
        this.winSound;
    }

    setup() {
        this.player = new Player();
        this.hostage = new Hostage();
        this.jails = new Jail();
        this.background = new Background();
        this.tokens = [];
        this.obstacles = [];
        this.lives = [];
    }

    preload() {
        //backgrounds
        this.backgroundImages = [
            { src: loadImage('background/1/1.png'), x:0, speed: 0},
            { src: loadImage('background/1/2.png'), x:0, speed: 1},
            { src: loadImage('background/1/3.png'), x:0, speed: 2},
            { src: loadImage('background/1/4.png'), x:0, speed: 3},
            { src: loadImage('background/1/6.png'), x:0, speed: 4}
        ]

        //images
        this.playerImage = loadImage('images/mfdoom.gif');
        this.hostageImage = loadImage('images/giphy.gif');
        this.jailImage = loadImage('images/cell.png');
        this.tokenImage = loadImage('images/miccheck.png');
        this.lifeImage = loadImage('images/metalface.png')
        this.obstacleImage = loadImage('images/czarface.png');
        this.menuImage = loadImage('menu/newgame.png');
        this.tributeImage = loadImage('images/madvillain.jpg');
        this.rImage = loadImage('instructions/restart.png');
        this.mImage = loadImage('instructions/main.png');
        this.bImage = loadImage('instructions/back.png');
        this.pImage = loadImage('instructions/pause.png');
        this.aImage = loadImage('instructions/arrows.png')
        
        //sounds
        this.upSound = loadSound('sounds/up.mp3');
        this.downSound = loadSound('sounds/down.mp3');
        this.leftSound = loadSound('sounds/sides.mp3');
        this.rightSound = loadSound('sounds/sides.mp3');
        this.czarSound = loadSound('sounds/czarface.mp3');
        this.lifeSound = loadSound('sounds/ohyea.mp3');
        this.mainSound = loadSound('sounds/gametheme.mp3');
        this.omgSound = loadSound('sounds/omg.mp3');
        this.chainSound = loadSound('sounds/chainpulled.mp3');
        this.figaroSound = loadSound('sounds/figaro.mp3');
        this.winSound = loadSound('sounds/wingame.mp3')
    }

    draw() {
        clear();
        if (mode==0) {
            background(this.menuImage);
            textFont('VT323')
            textAlign(CENTER);
            textSize (65);
            text('Press "Enter" to Start', 500, 400);
            textSize (30);
            text('Press "i" for Instructions', 500, 540);
            fill(256, 256, 256);
        }

        if (mode==1) {
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
    
            if (frameCount % 35 === 0) {
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

            if (frameCount % 500 === 0) {
                this.lives.push(new Lives(this.lifeImage))    
            }
            this.lives.forEach(function (life) {
                life.draw();
            })
            this.lives = this.lives.filter(life => {
                // console.log(this)
                if (life.collision(this.player) || life.x < 0) {
                    return false
                } else {
                    return true
                }        
            })

            if (this.background.counter >= 10000) {
                this.hostage.draw();
                this.jails.draw();
            
                if (this.hostage.collision(this.player)) {
                    mode = 4;
                    this.winSound.play();
                }
            }

            if (this.player.score >= 15) {
                if (!this.chainSound.isPlaying()) {
                    this.chainSound.play();
                }

                this.jails.y--;
            }
            
            let c = color('rgba(0, 0, 0, 0.6)');
            fill(c);
            noStroke();
            rect(0, 0, 1000, 60);

            fill(265, 265, 265)
            textSize(40);
            image(game.tokenImage, 20, 10, 45, 45)
            text(`${this.player.score}`, 80, 40);
            
            fill(265, 265, 265)
            textSize(30)

            for (let i = 0; i < this.player.lives; i++) {
                image(game.lifeImage, 930 + (i*-50), 10, 40, 40)
            }
            
            // image(game.lifeImage, 770, 10, 40, 40)
            // image(game.lifeImage, 670, 10, 40, 40)
            // text(`${this.player.lives.join(' ')}`, 500, 40)
        }    

        if (mode==2) {
            this.background.draw()
            game.mainSound.pause();
            game.figaroSound.pause();
            game.chainSound.pause();
            game.upSound.pause();
            game.downSound.pause();
            game.leftSound.pause();
            game.rightSound.pause();
            let a = color('rgba(0, 0, 0, 0.6)');
            fill(a);
            noStroke();
            rect(50, 50, 900, 500);
            fill(265, 265, 265);
            textAlign(CENTER);
            textSize(130)
            text('Pause', 500, 230);
            textSize(45)
            text('Press "Enter" to resume', 500, 345);
            frameRate(0)
            image(game.rImage, 775, 450, 30, 30)
            image(game.mImage, 775, 490, 30, 30)
            textAlign(LEFT);
            textSize(25);
            text('Restart', 825, 470);
            text('Main Menu', 825, 510);
        }

        if (mode==3) {
            background('black');
            textAlign(CENTER);
            textSize(140);
            text('GAME OVER', 500, 325);
            fill(265, 265, 265);
            image(game.rImage, 795, 480, 30, 30);
            image(game.mImage, 795, 520, 30, 30);
            textAlign(LEFT);
            textSize(25);
            text('Restart', 845, 500);
            text('Main Menu', 845, 540);        
        }

        if (mode==4) {
            textSize(15)
            image(game.mImage, 20, 15, 35, 35);
            text('Back to Main Menu', 115, 35); 
            textAlign(CENTER);
            fill(0, 0, 0);
            textSize(160);
            text('YOU WIN', 500, 160);
            image(game.tributeImage, 275, 195, 450, 250)
            textSize(25);
            let tribute = 'This game is a tribute to MF Doom (1971 – 2020):\n Mysterious and legendary producer/rap-hero who styled himself as a supervillain';
            text(tribute, 500, 500);
            textSize(17);
            let disclaimer = "Most sounds in the game are extracted from his songs or videos related to him";
            text(disclaimer, 500, 560);
            this.mainSound.pause();
            this.chainSound.pause();
            this.figaroSound.pause();
            this.czarSound.pause();
            this.upSound.pause();
            this.downSound.pause();
            this.leftSound.pause();
            this.rightSound.pause();
        }

        if (mode==5) {
            background(game.menuImage);
            let b = color('rgba(0, 0, 0, 0.6)');
            fill(b);
            noStroke();
            rect(40, 40, 920, 520);
            fill(265, 265, 265);
            image(game.playerImage, 350, 55, 95, 115)
            text('MF Doom', 365, 190);
            image(game.hostageImage, 530, 40, 105, 135)
            text('Tyler, the Creator', 500, 190)
            textAlign(LEFT);
            textSize(45);
            text("Help Doom rescue Tyler!", 322, 260);
            textSize(25)
            let goal = "- Avoid Czarface, it kills you;\n- Get Metal Faces for extra lives; \n- Collect 15 mics to open the cage;\n- Reach Tyler to win the game!"
            text(goal, 325, 300);
            image(game.obstacleImage, 130, 460, 45, 55)
            text('Czarface', 110, 540)
            image(game.tokenImage, 295, 470, 45, 45)
            text('Mic', 300, 540)
            image(game.lifeImage, 465, 460, 50, 55)
            text('Metal Face', 440, 540)
            image(game.aImage, 630, 450, 100, 70)
            text('Move Doom', 635, 540)
            image(game.pImage, 845, 485, 30, 30)
            text('Pause', 835, 540)
            image(game.bImage, 60, 60, 30, 30)
            text('Go back', 100, 80);
        }
    }    

    reset() {
        this.player.lives = 3;
        this.player.score = 0;
        this.player.width = 110;
        this.player.height = 130;
        this.player.x = 25;
        this.player.y = 450;
        game.mainSound.play();
        this.background.counter = 0;
        this.backgroundImages.forEach(img => 0);
        this.tokens = this.tokens.filter(token => false);
        this.obstacles = this.obstacles.filter(obstacle => false);
        this.lives = this.lives.filter(life => false);
        frameRate(50);
        mode = 1;
    }
}