class LevelOne extends Phaser.Scene {
    constructor() {
        super("level1");
    }

    preload() {
        this.load.setPath("./assets/");
    }

    create() {
        this.setMap();
    }

    setMap() { 
        // Create a new tilemap game object which uses 16x16 pixel tiles, and is
        // 40 tiles wide and 90 tiles tall
        this.map = this.add.tilemap("highway", 16, 16, 40, 90);
        //this.physics.world.setBounds(0, 0, 40*16, 90*16);

        // Add a tileset to the map
        // First parameter: name we gave the tileset in Tiled
        // Second parameter: key for the tilesheet (from this.load.image in Load.js)
        this.tileset = this.map.addTilesetImage("highway_tilemap_packed", "tilemap_tiles");

        // Create layers
        this.roadLayer = this.map.createLayer("road", this.tileset, 0, 0);
        this.obstacleLayer = this.map.createLayer("obstacles", this.tileset, 0 ,0);

        // Make obstances collidable
        this.obstacleLayer.setCollisionByProperty({
            collides: true
        });
    }
    
    update() {

    }
}