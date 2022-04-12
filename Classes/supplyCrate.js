class SupplyCrate {
    constructor (x, y, width, height) {
        this.body = Bodies.rectangle (x, y, width, height, {isStatic: true});
        World.add (world, this.body);

        this.imgArray = [
            supplyCrateClosed,
            supplyCrateOpened,
        ];
    }

    display () {
        var posX = this.body.position.x;
        var posY = this.body.position.y;

        push ();
        imageMode (CENTER);
        image (this.imgArray[0], posX, posY, 50, 50);
        pop ();
    }
} 