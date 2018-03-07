function Animation(spriteSheet, startX, startY, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {
    this.spriteSheet = spriteSheet;
    this.startX = startX;
    this.startY = startY;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.sheetWidth = sheetWidth;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.scale = scale;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop)
            this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    xindex = frame % this.sheetWidth;
    yindex = Math.floor(frame / this.sheetWidth);

    ctx.drawImage(this.spriteSheet,
        xindex * this.frameWidth, yindex * this.frameHeight, // source from sheet
        this.frameWidth, this.frameHeight,
        x, y,
        this.frameWidth * this.scale,
        this.frameHeight * this.scale);
}


Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

Background.prototype = new Entity();
Background.prototype.constructor = Background;

Background.prototype.update = function () {
}

function Background(game, spritesheet) {
    this.x = 0;
    this.y = 0;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
};

Background.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet,
        this.x, this.y);
};


// the "main" code begins here

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./img/lyn_stand.png");
ASSET_MANAGER.queueDownload("./img/lyn_attack.png");
ASSET_MANAGER.queueDownload("./img/lyn_north.png");
ASSET_MANAGER.queueDownload("./img/lyn_east.png");
ASSET_MANAGER.queueDownload("./img/lyn_south.png");
ASSET_MANAGER.queueDownload("./img/lyn_west.png");
ASSET_MANAGER.queueDownload("./img/background.jpg");

ASSET_MANAGER.downloadAll(function () {
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine();
 
    gameEngine.init(ctx);
    gameEngine.start();

    var bg = new Background(gameEngine, ASSET_MANAGER.getAsset("./img/background.jpg"));
    var lyn = new Lyn(gameEngine, ASSET_MANAGER);
    var babylyn1 = new BabyLyn(gameEngine, ASSET_MANAGER, 0);
    var babylyn2 = new BabyLyn(gameEngine, ASSET_MANAGER, 80);
    var babylyn3 = new BabyLyn(gameEngine, ASSET_MANAGER, 160);
    var babylyn4 = new BabyLyn(gameEngine, ASSET_MANAGER, 240);
    var babylyn5 = new BabyLyn(gameEngine, ASSET_MANAGER, 320);
    var babylyn6 = new BabyLyn(gameEngine, ASSET_MANAGER, 400);
    var babylyn7 = new BabyLyn(gameEngine, ASSET_MANAGER, 480);
    var babylyn8 = new BabyLyn(gameEngine, ASSET_MANAGER, 540);

    gameEngine.addEntity(bg);
    gameEngine.addEntity(lyn);
    gameEngine.addEntity(babylyn1);
    gameEngine.addEntity(babylyn2);
    gameEngine.addEntity(babylyn3);
    gameEngine.addEntity(babylyn4);
    gameEngine.addEntity(babylyn5);
    gameEngine.addEntity(babylyn6);
    gameEngine.addEntity(babylyn7);
    gameEngine.addEntity(babylyn8);

    alert("Press space for critical hit!!");
});
