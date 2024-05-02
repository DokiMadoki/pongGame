import Ball from "./ball.js";
import Paddle from "./paddle.js";

const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("playerPaddle"));
const computerPaddle = new Paddle(document.getElementById("computerPaddle"));
const gameWindow = document.querySelector(".game-window");
const playerScoreElem = document.getElementById("playerScore");
const computerScoreElem = document.getElementById("computerScore");
const upBtn = document.getElementById("upBtn");
const downBtn = document.getElementById("downBtn");
const startBtn = document.getElementById("start");

let hueValue = 0.1
let playerMoveUpStatus = false;
let playerMoveDownStatus = false;

let playerScore = 0;
let computerScore = 0;

let lastTime;

startBtn.addEventListener("click", gameStart);

function update(time){
    if (lastTime!=null){
        const delta = (time - lastTime);
        ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
        if(ball.direction.x>0){
            computerPaddle.update(delta, ball.y);
        }
        if(ball.rect().right >= gameWindow.offsetLeft + gameWindow.offsetWidth || ball.rect().left <= gameWindow.offsetLeft){
            isLoss();
        }
        if (playerMoveUpStatus === true){
            playerPaddle.playerMoveUp(delta);
        }
        if (playerMoveDownStatus === true){
            playerPaddle.playerMoveDown(delta);
        }
        
    }
    lastTime = time;
    window.requestAnimationFrame(update);

    hueValue += 0.05;
    document.documentElement.style.setProperty("--hue", hueValue);

    
}

document.addEventListener("keydown", e=> {
    switch(e.key){
        case 'w':
            playerMoveUpStatus = true;
        break;
        case 's':
            playerMoveDownStatus = true;
        break;
    }
    
    }); 
document.addEventListener("keyup", e=> {
    switch(e.key){
        case 'w':
            playerMoveUpStatus = false;
        break;
        case 's':
            playerMoveDownStatus = false;
        break;
    }
});
upBtn.addEventListener("mousedown", ()=>{

    playerMoveUpStatus = true;
});
    
upBtn.addEventListener("mouseup", ()=>{
    playerMoveUpStatus = false;
});
    
downBtn.addEventListener("mousedown", ()=>{
    playerMoveDownStatus = true;
});
    
downBtn.addEventListener("mouseup", ()=>{
    playerMoveDownStatus = false;
});
upBtn.addEventListener("touchstart", ()=>{

    playerMoveUpStatus = true;
});
    
upBtn.addEventListener("touchend", ()=>{
    playerMoveUpStatus = false;
});
    
downBtn.addEventListener("touchstart", ()=>{
    playerMoveDownStatus = true;
});
    
downBtn.addEventListener("touchend", ()=>{
    playerMoveDownStatus = false;
});


    
function isLoss(){
    if(ball.rect().right >= gameWindow.offsetLeft + gameWindow.offsetWidth){
        playerScore++;
        playerScoreElem.textContent = playerScore;
    }
    else{
        computerScore++;
        computerScoreElem.textContent = computerScore;
    }
    ball.reset();
    
}
function gameStart(){
    startBtn.style.display = "none";
    window.requestAnimationFrame(update);
}