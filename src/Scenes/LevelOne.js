class LevelOne extends Phaser.Scene {
    constructor() {
        super("level1");
    }

    preload() {
        this.load.setPath("./assets/");

        //Load images
        this.load.image("tempPlayer", "tile_0295.png"); //Temp asset for testing
        this.load.image("tempBus", "tempBus.png"); //Temp asset for testing

        this.SCALE = 3.0;
    }

    create() {
        this.setMap();
        this.setPlayer();
        this.setKeys();

        //Groups
        my.sprite.busGroup = this.add.group({ //TEST
            defaultKey: "tempBus",
            maxSize: 10
        })
        my.sprite.busGroup.createMultiple({ //TEST
            active: false,
            key: my.sprite.busGroup.defaultKey,
            repeat: my.sprite.busGroup.maxSize-1
        });
        
        this.setCamera();
    }

    //Set up highway map
    setMap() {
        // Create a new tilemap game object which uses 16x16 pixel tiles, and is
        // 40 tiles wide and 90 tiles tall
        this.map = this.add.tilemap("tempHighway", 16, 16, 40, 90);
        this.physics.world.setBounds(0, 0, 40*16, 90*16);

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
        my.sprite.player = this.physics.add.sprite(this.map.widthInPixels/2, this.map.heightInPixels - 40, "tempPlayer"); //Temp testing

        //my.sprite.player = this.physics.add.sprite(30, 30, "platformer_characters", "tile_0000.png");
        my.sprite.player.setCollideWorldBounds(true);
    }

    //Set arrow keys for controls
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
        this.placeCars(Math.floor(Math.random() * this.map.heightInPixels), Math.floor(Math.random() * 2));
        this.moveCars();
    }

    //Check for specific key presses
    //Handles player movement and restarting the game
    checkKeyPress() {
        if (Phaser.Input.Keyboard.JustDown(cursors.left)) { //Check for only 1 key press
            this.physics.moveTo(my.sprite.player, my.sprite.player.x - 40, my.sprite.player.y, 2000);
        } else if (Phaser.Input.Keyboard.JustDown(cursors.right)) {
            this.physics.moveTo(my.sprite.player, my.sprite.player.x + 40, my.sprite.player.y, 2000);
        } else if (Phaser.Input.Keyboard.JustDown(cursors.up)) {
            this.physics.moveTo(my.sprite.player, my.sprite.player.x, my.sprite.player.y - 40, 2000);
        } else if (Phaser.Input.Keyboard.JustDown(cursors.down)) {
            this.physics.moveTo(my.sprite.player, my.sprite.player.x, my.sprite.player.y + 40, 2000);
        } else {
            my.sprite.player.setVelocity(0);
        }
    }

    //Determines where cars will spawn
    //TODO: Only spawn on roads
    //TODO: Randomize spawn times
    placeCars(height, width) { //Height determines what road, width determines what side (left = 0 or right = 1)
        let car = my.sprite.busGroup.getFirstDead();
        if(car != null) {
            car.y = height;
            if(width == 1) { //Right side of screen
                car.flipX = true; //Flip sprite so it is facing left
                car.x = this.map.widthInPixels;
            } else { //Left side of screen
                car.x = 0;
            }
            car.active = true;
            car.visible = true;
            console.log("height:",car.y,"width:",car.x); //TEST
        }
    }

    //Move cars in direction they are facing
    moveCars() {
        for(let bus of my.sprite.busGroup.getChildren()) {
            if (bus.active) {
                if(bus.flipX === true) { //If car is driving to the left
                    bus.x -= 1;
                } else { //If car is driving to the right
                    bus.x += 1;
                }
            }
            this.removeCars(bus);
        }
    }

    //Helper function to remove cars once they reach either end of the screen
    removeCars(bus) {
        if (bus.x < -10 || bus.x > this.map.widthInPixels + 10) {
            bus.active = false;
            bus.visible = false;
        }
    }

}