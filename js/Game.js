class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(300,200);
    car1.scale = 0.5;
    car1.addImage("car1",car1img);
    car2 = createSprite(500,200);
    car2.addImage("car2",car2img);
    car2.scale = 0.5;
    car3 = createSprite(700,200);
    car3.addImage("car3",car3img);
    car3.scale = 0.75;
    car4 = createSprite(900,200);
    car4.scale = 0.5;
    car4.addImage("car4",car4img);
    cars = [car1, car2, car3, car4];
    box1 = createSprite(width/2, 500, width -350, 20);
    box2 = createSprite(width/2, 0, width -350, 20);
    box3 = createSprite(width/2, -500, width -350, 20);
    box4 = createSprite(width/2, -1000, width -350, 20);
    box5 = createSprite(width/2, -1500, width -350, 20);
    box6 = createSprite(width/2, -2000, width -350, 20);
    box7 = createSprite(width/2, -2500, width -350, 20);
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(trackimg, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x, y, 80, 80);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }

        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(player.distance > 3860){
      gameState = 2;
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
  }
}