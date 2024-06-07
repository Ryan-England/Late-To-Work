class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.setPath("./assets/");
        this.load.multiatlas("kenny-particles", "kenny-particles.json");
    }

    create() {

         // ...and pass to the next Scene
         this.scene.start("level1");
    }

    // Never get here since a new scene is started in create()
    update() {
    }
}