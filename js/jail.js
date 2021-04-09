class Jail {
    constructor() {
        this.width = 140;
        this.height = 601;
        this.x = 825;
        this.y = -5;
    }

    draw() {
        image(game.jailImage, this.x, this.y, this.width, this.height);
    }
}