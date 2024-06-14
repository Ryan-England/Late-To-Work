class GameWin extends Phaser.Scene {
    constructor() {
        super("gameWin");
        this.my = {text:{}};
    }

     create() {
        this.rKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        //Display game over
        this.my.text.score = this.add.text(window.innerWidth/3.7, 200, "Good Job! You won!", {
            fontFamily: 'Times, serif',
            fontSize: 50,
            color: 'white'
        });

        //Display restart
        this.my.text.restart = this.add.text(window.innerWidth/3, 400, "Press R to restart!", {
            fontFamily: 'Times, serif',
            fontSize: 50,
            color: 'white'
        });
     }
 
     update() {
        if (Phaser.Input.Keyboard.JustDown(this.rKey)) {
            this.scene.start("level1");
        }
     }
 }