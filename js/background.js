class Background {
    constructor() {
        this.counter = 0;
    }

    draw() {
        game.backgroundImages.forEach(img => {
            img.x -= img.speed;
            image(img.src, img.x, 0, width, height)
            image(img.src, img.x + width, 0, width, height)
            // console.log(this.counter)
            if (img.x <= -width) {
                // console.log(this.counter)
                img.x = 0;
            }
            if (this.counter >= 10000) {
                img.speed = 0;
            }
            this.counter++
        })
    }
}