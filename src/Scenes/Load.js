class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.setPath("./assets/");

        // Load characters spritesheet
        //this.load.atlas("platformer_characters", "tilemap-characters-packed.png", "tilemap-characters-packed.json");

        // Load tilemap information
        this.load.image("tilemap_tiles", "tilemap_packed.png"); //Packed tilemap
        this.load.tilemapTiledJSON("highway", "highway.tmj"); //Tilemap in JSON

        this.load.image("leftPlayer00", "tile_0293.png");
        this.load.image("leftPlayer01", "tile_0320.png");
        this.load.image("downPlayer00", "tile_0294.png");
        this.load.image("downPlayer01", "tile_0321.png");
        this.load.image("upPlayer00", "tile_0295.png");
        this.load.image("upPlayer01", "tile_0322.png");
        this.load.image("rightPlayer00", "tile_0296.png");
        this.load.image("rightPlayer01", "tile_0323.png");


        this.load.multiatlas("kenny-particles", "kenny-particles.json");
    }

    create() {
        // This didn't work out, ah well.
        this.anims.create({
            key: 'leftWalk',
            frames: [
                {key: "leftPlayer00"},
                {key: "leftPlayer01"}
            ],
            frameRate: 10,
            repeat: 2
        });

        this.anims.create({
            key: 'downWalk',
            frames: [
                {key: "leftPlayer00"},
                {key: "leftPlayer01"}
            ],
            frameRate: 10,
            repeat: 2
        });

        this.anims.create({
            key: 'leftWalk',
            frames: [
                {key: "leftPlayer00"},
                {key: "leftPlayer01"}
            ],
            frameRate: 10,
            repeat: 2
        });

        this.anims.create({
            key: 'leftWalk',
            frames: [
                {key: "leftPlayer00"},
                {key: "leftPlayer01"}
            ],
            frameRate: 10,
            repeat: 2
        });

         this.scene.start("level1");
    }

    // Never get here since a new scene is started in create()
    update() {
    }
}