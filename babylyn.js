function BabyLyn(game, ASSET_MANAGER, startX) {
    this.x = startX;
    this.y = 0;
    this.game = game;
    this.ctx = game.ctx;
    this.AM = ASSET_MANAGER;
    this.animation = new Animation(this.AM.getAsset("./img/lyn_east.png"), this.x, this.y, 22, 22, 88, .1, 4, true, 2);
    this.isEast = true;
    this.isSouth = false;
    this.isWest = false;
    this.isNorth = false;
    this.speed = 300 - (Math.floor(startX/5));
    Entity.call(this, game, this.x, this.y);
}

BabyLyn.prototype = new Entity();
BabyLyn.prototype.constructor = BabyLyn;

BabyLyn.prototype.update = function () {
    if (this.isEast) {
        this.goEast();
    } else if (this.isSouth) {
        this.goSouth();
    } else if (this.isWest) {
        this.goWest();
    } else if (this.isNorth) {
        this.goNorth()
    }

    Entity.prototype.update.call(this);   
}

BabyLyn.prototype.goEast = function () {
    this.x += this.game.clockTick * this.speed;
    if (this.x >= 768) {
        this.isEast = false;
        this.isSouth = true;
        this.animation = new Animation(this.AM.getAsset("./img/lyn_south.png"), this.x, this.y, 22, 22, 88, .1, 4, true, 2);
    }
}

BabyLyn.prototype.goSouth = function () {
    this.y += this.game.clockTick * this.speed;
    if (this.y >= 675) {
        this.isSouth = false;
        this.isWest = true;
        this.animation = new Animation(this.AM.getAsset("./img/lyn_west.png"), this.x, this.y, 22, 22, 88, .1, 4, true, 2);
    }
}

BabyLyn.prototype.goWest = function () {
    this.x -= this.game.clockTick * this.speed;
    if (this.x <= 2) {
        this.isWest = false;
        this.isNorth = true;
        this.animation = new Animation(this.AM.getAsset("./img/lyn_north.png"), this.x, this.y, 22, 22, 88, .1, 4, true, 2);
    }
}

BabyLyn.prototype.goNorth = function () {
    this.y -= this.game.clockTick * this.speed;
    if (this.y <= 2) {
        this.isNorth = false;
        this.isEast = true;
        this.animation = new Animation(this.AM.getAsset("./img/lyn_east.png"), this.x, this.y, 22, 22, 88, .1, 4, true, 2);
    }
}

BabyLyn.prototype.draw = function (ctx) {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}
