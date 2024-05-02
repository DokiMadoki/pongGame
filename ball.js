const INITIAL_VELOCITY = 0.025;
const VELOCITY_INCREASE = 0.000001;
const gameWindow = document.querySelector(".game-window");

export default class Ball{
    constructor(ballElem){
        this.ballElem = ballElem;
        this.reset();
    }
    get x(){
        return parseFloat((getComputedStyle(this.ballElem).getPropertyValue("--x")));

    }
    set x(value){
        this.ballElem.style.setProperty("--x", value);
    }

    get y(){
        return parseFloat((getComputedStyle(this.ballElem).getPropertyValue("--y")));

    }
    set y(value){
        this.ballElem.style.setProperty("--y", value);
    }
    rect(){
        return this.ballElem.getBoundingClientRect();
    }
    reset(){
        this.x = 50;
        this.y = 50;
        this.direction = {x: 0, y: 0,}
        while(Math.abs(this.direction.x < 0.2) || Math.abs(this.direction.x > 0.9)){
            const heading = randomBetweenValues(0, 2* Math.PI);
            this.direction = {x: Math.cos(heading), y: Math.sin(heading)}
        }
        this.velocity = INITIAL_VELOCITY;
    }
    update(delta, paddles){
        this.x += this.direction.x * this.velocity * delta;
        this.y += this.direction.y * this.velocity * delta;
        const rect = this.rect();

        if(rect.bottom >= gameWindow.offsetHeight || rect.top <= 0){
            this.direction.y *= -1;
        }

        
        if (paddles.some(r => isOverlap(r, rect))){
            this.direction.x *= -1;
        }
        this.velocity += VELOCITY_INCREASE * delta;

    }
}
 

function isOverlap(rect1, rect2){
    return rect1.bottom >= rect2.top && rect1.top <= rect2.bottom && rect1.right >= rect2.left && rect1.left <= rect2.right;
}
function randomBetweenValues(min, max){
    return Math.random() * (max - min) + min;
}