var ball;
var database;
var position;

function setup(){
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    database = firebase.database();
    console.log(database);
    var ball_pos = database.ref("ball/position");
    ball_pos.on("value",readPosition,showError);
}

function draw(){
    background("white");
    if(position!== undefined){
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }

    drawSprites();
    }
}
function changePosition(x,y){
    ball.x = ball.x + x;
    ball.y = ball.y + y;

}
 function readPosition(data){
    position = data.val();
    console.log(position);
    console.log(position.x);
    ball.x = position.x;
    ball.y = position.y;
 }

 function showError(){
     console.log("error");
 }

function writePosition(x1,y1){
    database.ref("ball/position").set({
        x:position.x+x1,
        y:position.y+y1

    })
    
    
}