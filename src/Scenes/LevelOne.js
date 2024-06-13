class LevelOne extends Phaser.Scene {
    constructor() {
        super("level1");
    }

    preload() {
        this.load.setPath("./assets/");

        //Load images
        this.load.image("tempPlayer", "tile_0295.png"); //Temp asset for testing
        this.load.image("bus", "bus.png");
        this.load.image("car", "rounded_yellow.png");
        this.load.image("scooter", "scooter.png");
        this.load.audio("carCollision", "explosion.wav");

        this.SCALE = 3.0;
    }

    create() {
        this.setMap();
        this.setPlayer();
        this.setKeys();
        this.setObstacles();
        this.setGroups();
        
        this.setCamera();
    }

    //Set up highway map
    setMap() { 
        // Create a new tilemap game object which uses 16x16 pixel tiles, and is
        // 40 tiles wide and 90 tiles tall
        this.map = this.add.tilemap("highway", 16, 16, 40, 90);
        this.physics.world.setBounds(0, 0, 40*16, 90*16);

        // Add a tileset to the map
        // First parameter: name we gave the tileset in Tiled
        // Second parameter: key for the tilesheet (from this.load.image in Load.js)
        this.tileset = this.map.addTilesetImage("highway_tilemap_packed", "tilemap_tiles");

        // Create layers
        this.roadLayer = this.map.createLayer("road", this.tileset, 0, 0);
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

    //Add obstacles to game
    //Done after adding player so that player sprite can pass under
    setObstacles() {
        this.obstacleLayer = this.map.createLayer("obstacles", this.tileset, 0 ,0);

        // Make obstances collidable
        this.obstacleLayer.setCollisionByProperty({
            collides: true
        });
        
        // Enable collision handling
        this.physics.add.collider(my.sprite.player, this.obstacleLayer);
    }

    //Add group for each of the three types of vehicles
    setGroups() {
        //Bus
        my.sprite.busGroup = this.add.group({
            defaultKey: "bus",
            maxSize: 20
        })
        my.sprite.busGroup.createMultiple({
            active: false,
            key: my.sprite.busGroup.defaultKey,
            repeat: my.sprite.busGroup.maxSize-1
        });

        //Car
        my.sprite.carGroup = this.add.group({
            defaultKey: "car",
            maxSize: 20
        })
        my.sprite.carGroup.createMultiple({
            active: false,
            key: my.sprite.carGroup.defaultKey,
            repeat: my.sprite.carGroup.maxSize-1
        });

        //Scooter
        my.sprite.scooterGroup = this.add.group({
            defaultKey: "scooter",
            maxSize: 20
        })
        my.sprite.scooterGroup.createMultiple({
            active: false,
            key: my.sprite.scooterGroup.defaultKey,
            repeat: my.sprite.scooterGroup.maxSize-1
        });
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
    
        this.placeCars(my.sprite.busGroup.getFirstDead());
        setTimeout(_ => this.placeCars(my.sprite.carGroup.getFirstDead()), 500);
        setTimeout(_ => this.placeCars(my.sprite.scooterGroup.getFirstDead()), 200);

        this.moveCars(my.sprite.busGroup.getChildren());
        this.moveCars(my.sprite.carGroup.getChildren());
        this.moveCars(my.sprite.scooterGroup.getChildren());

        this.checkCollision(my.sprite.busGroup.getChildren());
        this.checkCollision(my.sprite.carGroup.getChildren());
        this.checkCollision(my.sprite.scooterGroup.getChildren());
    }

    //Check for specific key presses
    //Handles player movement and restarting the game
    checkKeyPress() {
        if (Phaser.Input.Keyboard.JustDown(cursors.left)) { //Check for only 1 key press
            //Note: don't set velocity too high or player will pass through obstacles
            my.sprite.player.body.setVelocityX(-900);
            //Note: don't set velocity too high or player will pass through obstacles
            my.sprite.player.body.setVelocityX(-900);
        } else if (Phaser.Input.Keyboard.JustDown(cursors.right)) {
            my.sprite.player.body.setVelocityX(900);
            my.sprite.player.body.setVelocityX(900);
        } else if (Phaser.Input.Keyboard.JustDown(cursors.up)) {
            my.sprite.player.body.setVelocityY(-900);
            my.sprite.player.body.setVelocityY(-900);
        } else if (Phaser.Input.Keyboard.JustDown(cursors.down)) {
            my.sprite.player.body.setVelocityY(900);
            my.sprite.player.body.setVelocityY(900);
        } else {
            my.sprite.player.setVelocity(0);
        }
    }

    //Determines where cars will spawn
    //TODO: Only spawn on roads
    placeCars(car) {
        let height = Math.floor(Math.random() * this.map.heightInPixels); //Height determines what road
        let width = Math.floor(Math.random() * 2); //Width determines what side (left = 0 or right = 1)

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
            //console.log("height:",car.y,"width:",car.x); //TEST
        }
    }

    //Move cars in direction they are facing
    moveCars(cars) {
        for(let car of cars) {
            if (car.active) {
                if(car.flipX === true) { //If car is driving to the left
                    car.x -= 1;
                } else { //If car is driving to the right
                    car.x += 1;
                }
            }
            this.removeCars(car);
        }
    }

    //Helper function to remove cars once they reach either end of the screen
    removeCars(car) {
        if (car.x < -10 || car.x > this.map.widthInPixels + 10) {
            car.active = false;
            car.visible = false;
        }
    }

    //Check collision of player and car
    //TODO: Switch to end screen when player gets hit
    checkCollision(cars) {
        for (let car of cars) {
            if (this.collides(my.sprite.player, car)) {
                //TODO: Go to end screen
                my.sprite.player.visible = false;

                //car.x = -100; //Put car offscreen to be removed
                //this.removeCars(car);

                this.sound.play("carCollision", {volume: 0.5});
            }
        }
    }

    // Helper function. A center-radius AABB collision check
    collides(a, b) {
        if (Math.abs(a.x - b.x) > (a.displayWidth/2 + b.displayWidth/2)) return false;
        if (Math.abs(a.y - b.y) > (a.displayHeight/2 + b.displayHeight/2)) return false;
        return true;
    }

}