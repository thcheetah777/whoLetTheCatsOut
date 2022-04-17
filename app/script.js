// Who Let the Cats Out!
/*^*^*^*^*^*^*^*
script.js
The main script for Who Let the Cats Out!
*^*^*^*^*^*^*^*/

let game = {
  TILESIZE: 8,
  WORLDWIDTH: 2000,
  WORLDHEIGHT: 2000,
  playerSpeed: 600,
  reload: 0,
  canShoot: false,
  reloadMax: 10
};
class Game extends Phaser.Scene {
  constructor() {
    super();
  }
  preload() {
    this.engine = new Engine(this);

    // ---------- Load the images ----------
    this.load.image("cat", "assets/cat.png");
    this.load.image("player", "assets/player.png");
    this.load.image("star", "assets/star.png");
    this.load.image("portal", "assets/portal.png");
  }
  create() {
    // Use keyboard
    game.keyboard = this.input.keyboard.createCursorKeys();

    // Create 100 stars in the background
    for (var i = 0; i < 100; i++) {
      let star = this.add.image(Math.random() * game.WORLDWIDTH, Math.random() * game.WORLDHEIGHT, "star");
      star.setScale(8);
      star.setDepth(0);
    }

    // ---------- Create players ship ----------
    game.player = this.physics.add.sprite(game.WORLDWIDTH / 2, game.WORLDHEIGHT / 2, "player");
    game.player.setScale(8);
    game.player.setCollideWorldBounds(true);
    game.player.setDrag(1000);
    game.player.setDepth(1);

    // Create groups
    game.portals = this.physics.add.group();

    // ---------- It's a big world after all! ----------
    this.cameras.main.setBounds(0, 0, game.WORLDWIDTH, game.WORLDHEIGHT);
    this.physics.world.setBounds(0, 0, game.WORLDWIDTH, game.WORLDHEIGHT);
    this.cameras.main.startFollow(game.player, true, 0.1, 0.1);
  }
  update() {
    // ---------- Movement ----------
    if (game.keyboard.up.isDown) {
      this.physics.velocityFromAngle(game.player.angle - 90, game.playerSpeed, game.player.body.velocity);
    }
    if (game.keyboard.right.isDown) {
      game.player.angle += 3;
    }
    if (game.keyboard.left.isDown) {
      game.player.angle -= 3;
    }

    // ---------- Shooting ----------
    if (game.keyboard.space.isDown && game.canShoot) {
      let portal = game.portals.create(game.player.x, game.player.y, "portal");
      portal.setScale(8);
      portal.setAngularVelocity(1000);
      portal.setDepth(0);
      this.physics.velocityFromAngle(game.player.angle - 90, 1000, portal.body.velocity);
      game.canShoot = false;
      game.reload = 0;
    }

    // ---------- Reloading ----------
    if (!game.canShoot) {
      game.reload++;
    }
    if (game.reload > game.reloadMax) {
      game.canShoot = true;
      game.reload = 0;
    }
  }
}
