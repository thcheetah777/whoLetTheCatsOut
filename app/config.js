// Who Let the Cats Out!
/*^*^*^*^*^*^*^*
config.js
The configuration for the Phaser 3 framework.
*^*^*^*^*^*^*^*/

const config = {
  type: Phaser.AUTO,
  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH,
    mode: Phaser.Scale.RESIZE
  },
  render: {
    pixelArt: true
  },
  backgroundColor: 0x000000,
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 0
      },
      enableBody: true,
      // debug: true
    }
  },
  scene: [Game]
};
const phaserGame = new Phaser.Game(config);
