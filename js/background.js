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
            if (img.x <= -width && this.counter <= 10) {
                img.x = 0;
                img.speed = 0;
                this.counter++
            }
        })
    }
}