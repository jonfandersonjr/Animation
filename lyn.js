function Lyn(game, ASSET_MANAGER) {
    this.x = 350;
    this.y = 330;
    this.game = game;
    this.ctx = game.ctx;
    this.AM = ASSET_MANAGER;
    this.animation = new Animation(this.AM.getAsset("./img/lyn_stand.png"), this.x, this.y, 70, 40, 70, 1, 1, true, 2);
    this.attackAnimation = new Animation(this.AM.getAsset("./img/lyn_attack.png"), this.x, this.y, 70, 40, 2450, 0.1, 35, false, 2);
    this.attacking = false;
    Entity.call(this, game, this.x, this.y);
}

Lyn.prototype = new Entity();
Lyn.prototype.constructor = Lyn;

Lyn.prototype.update = function () {
    if (this.game.space) this.isAttacking = true;
    if (this.isAttacking) {
        if (this.attackAnimation.isDone()) {
            this.attackAnimation.elapsedTime = 0;
            this.isAttacking = false;
        }

        Entity.prototype.update.call(this);
    }
}

Lyn.prototype.draw = function (ctx) {
    if (this.isAttacking) {
        this.attackAnimation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    } else {
        this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    }
    Entity.prototype.draw.call(this);
}
