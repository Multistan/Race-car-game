class Game {
  constructor() {}

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", (data) => {
      gameState = data.val();
      console.log(gameState);
    });
  }

  updateState(state) {
    database.ref("/").update({
      gameState: state,
    });
  }

  start() {
    form = new Form();
    form.display();

    player = new Player();
    playerCount = player.getCount();

    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage("car1", car1_img);
    car1.scale = 0.07;

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car2", car2_img);
    car2.scale = 0.07;

    cars = [car1, car2];
  }
  //BP
  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
  }
  play() {
    this.handleElements();

    Player.getPlayersInfo();

    if (allPlayers !== "undefined") {
      //image(imagename,x,y,w,h)
      image(track, -height * 5, width, height * 6);
      //for loop to get in the player index
      var index = 0;
      for (var i in allPlayers) {
        // console.log(i)
        //ny ising database getting x and y direction for allplayer(i)
        var x = allPlayers[i].positionX;
        var y = height - allPlayers[i].position.Y;
        //increasing index
        index = index + 1;
        cars[index - 1].position.x = x;
        cars[index - 1].position.y = y;
      }
      if (keyIsDown(UP_ARROW)) {
        player.positionY += 10;
        player.update();
      }
      drawSprites();
    }
  }
}
