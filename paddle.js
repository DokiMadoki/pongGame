const COMPUTERSPEED = 0.03;
const PLAYERSPEED = 0.035;
const gameWindow = document.querySelector(".game-window");
export default class Paddle{
    constructor(paddleElem){
        this.paddleElem = paddleElem;
    }

    get position(){
        return parseFloat((getComputedStyle(this.paddleElem).getPropertyValue("--position")));

    }
    set position(value){
        this.paddleElem.style.setProperty("--position", value);
    }
    rect(){
        return this.paddleElem.getBoundingClientRect();
    }
    update(delta, ballHeight){
        this.position += COMPUTERSPEED * delta * Math.sign(ballHeight - this.position);
        
    }
    playerMoveUp(delta){
        const rect = this.rect();
        if(rect.top <= 0){
            return;
        }
        else{
        
            this.position += PLAYERSPEED * delta *-1;
            
        }
        
    }
    playerMoveDown(delta){
        const rect = this.rect();
        if(rect.bottom >= gameWindow.offsetHeight){
            return;
        }
        else{
        
            this.position += PLAYERSPEED * delta;
        }     
    }


    }
    
