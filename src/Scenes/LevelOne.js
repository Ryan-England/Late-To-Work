class LevelOne extends Phaser.Scene {
    constructor() {
        super("level1");

        // Set up global variables to use later
        this.tileHeight = 16;
        this.tileWidth = 16;

        this.playerSpeed = 400;
    }

    preload() {
        this.load.setPath("./assets/");

        this.load.image("tempPlayer", "tile_0295.png"); //Temp asset for testing
        this.SCALE = 3.0;
    }

    create() {
        // Initialization
        this.setMap();
        this.setPlayer();
        this.setKeys();
        this.setCamera();
    }

    //Set up highway map
    setMap() {
        // Create a new tilemap game object which uses 16x16 pixel tiles, and is
        // 40 tiles wide and 90 tiles tall
        this.map = this.add.tilemap("tempHighway", this.tileWidth, this.tileHeight, 40, 90);
        this.physics.world.setBounds(0, 0, 40*this.tileWidth, 90*this.tileHeight);

        // Add a tileset to the map
        // First parameter: name we gave the tileset in Tiled
        // Second parameter: key for the tilesheet (from this.load.image in Load.js)
        this.tileset = this.map.addTilesetImage("highway_tilemap_packed", "temp_tilemap_tiles");

        // Create layers
        this.road = this.map.createLayer("road", this.tileset, 0, 0);
        this.goal = this.map.createLayer("tempGoal", this.tileset, 0, 0);
    }

    //Add player sprite
    setPlayer() {
        my.sprite.player = this.physics.add.sprite(this.map.widthInPixels/2, this.map.heightInPixels - 36, "tempPlayer"); //Temp testing

        //my.sprite.player = this.physics.add.sprite(30, 30, "platformer_characters", "tile_0000.png");
        my.sprite.player.setCollideWorldBounds(true);
    }

    //Add keys for controls
    setKeys() {
        cursors = this.input.keyboard.createCursorKeys();
    }

    //Add camera and lock onto player
    setCamera() {
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(my.sprite.player, true, 0.25, 0.25); // (target, [,roundPixels][,lerpX][,lerpY])
        this.cameras.main.setDeadzone(50, 50);
        this.cameras.main.setZoom(this.SCALE);
    }
    
    update() {
        this.checkKeyPress();
    }

    //Check for specific key presses
    //Handles player movement and restarting the game
    checkKeyPress() {
        if (Phaser.Input.Keyboard.JustDown(cursors.left)) { //Check for only 1 key press
            this.physics.moveTo(my.sprite.player, my.sprite.player.x - this.playerSpeed, my.sprite.player.y, 2000);
        } else if (Phaser.Input.Keyboard.JustDown(cursors.right)) {
            this.physics.moveTo(my.sprite.player, my.sprite.player.x + this.playerSpeed, my.sprite.player.y, 2000);
        } else if (Phaser.Input.Keyboard.JustDown(cursors.up)) {
            this.physics.moveTo(my.sprite.player, my.sprite.player.x, my.sprite.player.y - this.playerSpeed, 2000);
        } else if (Phaser.Input.Keyboard.JustDown(cursors.down)) {
            this.physics.moveTo(my.sprite.player, my.sprite.player.x, my.sprite.player.y + this.playerSpeed, 2000);
        } else {
            my.sprite.player.setVelocity(0);
        }
    }
}