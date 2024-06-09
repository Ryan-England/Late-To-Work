class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.setPath("./assets/");

        // Load characters spritesheet
        //this.load.atlas("platformer_characters", "tilemap-characters-packed.png", "tilemap-characters-packed.json");

        // Load tilemap information
        this.load.image("temp_tilemap_tiles", "tilemap_packed.png"); //Packed tilemap
        this.load.tilemapTiledJSON("tempHighway", "tempHighway.tmj"); //Tilemap in JSON

        this.load.multiatlas("kenny-particles", "kenny-particles.json");
    }

    create() {
         this.scene.start("level1");
    }

    // Never get here since a new scene is started in create()
    update() {
    }
}