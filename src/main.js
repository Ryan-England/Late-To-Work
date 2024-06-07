//CMPM120 - Final Game
//Victoria Morgan and Lo Weislak

// debug with extreme prejudice
"use strict"

// game config
let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true  // prevent pixel art from getting blurred when scaled
    },
    width: 640,
    height: 1440,
    //width: 1440,
    //height: 900,
    scene: [Load, LevelOne]
}

var cursors;
const SCALE = 2.0;
var my = {sprite: {}, text: {}, vfx: {}};

const game = new Phaser.Game(config);