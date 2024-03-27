// Bubble class : (x,y: position), (dx,dy: velocity) 
class Bubble {
    constructor(x, y, radius, dx, dy){
        this.radius = radius;
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
    };    
}

//randomx & random y : random x&y coordinates for placing bubbles 
function randomX(bubble) {
    return Math.random() * (window.innerWidth - 2 * bubble.radius) + bubble.radius;
}

function randomY(bubble) {
    return Math.random() * (window.innerHeight - 2 * bubble.radius) + bubble.radius;
}

// randomDx &Dy : Generate random velocities for bubbles in the X and Y directions 
function randomDx() {
    return Math.random() * 10 - 4;
}

function randomDy() {
    return Math.random() * 10 - 3;
}

// calculate the distance between two bubbles
function distance(a, b) {
    return Math.sqrt((a.x - b.x)**2 + (a.y - b.y)**2);
}

//To handle collision with borders,, by reversing the bubble's velocity 
function wallCollision(bubble) {
    if (bubble.x - bubble.radius + bubble.dx < 0 || bubble.x + bubble.radius + bubble.dx > window.innerWidth) {
        bubble.dx *= -1;
    }
    if (bubble.y - bubble.radius + bubble.dy < 0 || bubble.y + bubble.radius + bubble.dy > window.innerHeight) {
        bubble.dy *= -1;
    }
}

//to handle collisions between bubbles by swapping their velocities based
function bubbleCollision() {
    for (let i = 0; i < bubbles.length; i++) {
        for (let j = i + 1; j < bubbles.length; j++) {
            let bubble1 = bubbles[i];
            let bubble2 = bubbles[j];
            let dist = distance(bubble1, bubble2);
            if (dist < bubble1.radius + bubble2.radius) {
                // swap velocities 
                let tempDx = bubble1.dx;
                let tempDy = bubble1.dy;
                bubble1.dx = bubble2.dx;
                bubble1.dy = bubble2.dy;
                bubble2.dx = tempDx;
                bubble2.dy = tempDy;
            }
        }
    }
}

// updatee the position of each bubble based on its velocity & wall colision
function moveBubbles() {
    for (let bubble of bubbles) {
        bubble.x += bubble.dx;
        bubble.y += bubble.dy;
        wallCollision(bubble);
    }
}

//update the css props  of each bubble to reflect its new postion
function drawBubbles() {
    for (let bubble of bubbles) {
        let bubbleElement = document.querySelector(`.bubble${bubbles.indexOf(bubble) + 1}`);
        bubbleElement.style.width = bubble.radius * 2 + 'px'; // update width
        bubbleElement.style.height = bubble.radius * 2 + 'px'; // update height
        bubbleElement.style.left = bubble.x - bubble.radius + 'px';
        bubbleElement.style.top = bubble.y - bubble.radius + 'px';
    }
}

// ccreate bubbles 
let bubbles = [];
const numBubbles = 3;
const bubbleRadius = 50;

for (let i = 0; i < numBubbles; i++) {
    let radius = bubbleRadius;
    let x = randomX({ radius: radius });
    let y = randomY({ radius: radius });
    let dx = randomDx();
    let dy = randomDy();
    bubbles.push(new Bubble(x, y, radius, dx, dy));
}

// handle window resize
function handleWindowResize() {
    bubbles.forEach(bubble => {
        if (bubble.x + bubble.radius > window.innerWidth) {
            bubble.x = window.innerWidth - bubble.radius;
        }
        if (bubble.y + bubble.radius > window.innerHeight) {
            bubble.y = window.innerHeight - bubble.radius;
        }
        if (bubble.x - bubble.radius < 0) {
            bubble.x = bubble.radius;
        }
        if (bubble.y - bubble.radius < 0) {
            bubble.y = bubble.radius;
        }
    });
}

// Add event listener for window resize
window.addEventListener('resize', handleWindowResize);

function draw() {
    moveBubbles();
    bubbleCollision();
    drawBubbles();
    requestAnimationFrame(draw);
}


draw();
