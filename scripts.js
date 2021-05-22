// The new concept that I used in my JS code is Math.floor and Math.random for different heights of my game obstacles. The heights of these obstacles are between 60 and 250. This code can be found between lines 114-116.

// Adapted code from https://www.w3schools.com/graphics/game_score.asp

// Declare variables
var myGamePiece;
var myObstacles = [];
var myScore;
var answer;
var i;

// Change background color of game.html.
document.body.style.backgroundColor = "DodgerBlue";

// Adding components to the game (ie.airplane and score).
function startGame() {
    // Controls the size and position of the components. Makes game piece into an image.
    myGamePiece = new component(100, 30, "Pictures/green airplane.png", 500, 140, "image");
    // Image by Clker-Free-Vector-Images https://pixabay.com/vectors/airplane-plane-transportation-303563/
    myScore = new component("30px", "Consolas", "black", 120, 50, "text");
    myGameArea.start();
}
// Creating a gaming area and making it ready for drawing.
var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 1480;
        this.canvas.height = 490;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        // Game Area updates the display 50 times per second like movie frames.
        this.interval = setInterval(updateGameArea, 20);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    // Clears interval and stops GameArea.
    stop: function () {
        clearInterval(this.interval);
        // Asks user if they would like to play the game again or not. Has an error message if the user's input isn't Yes or No.
        answer = prompt("GAME OVER. Would you like to play again? Please write Yes or No.");
        var askAgain = true;
        while (askAgain == true) {
            switch (answer.toUpperCase()) {
                case "YES":
                    location.reload();
                    askAgain = false;
                    break;
                case "NO":
                    alert("Thank you for playing my Airplane Game. Please come back soon.");
                    askAgain = false;
                    break;
                default:
                    alert("Invalid response. Please try again.");
                    answer = prompt("GAME OVER. Would you like to play again? Please write Yes or No.");
            }
        }
    },
};
function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = myGameArea.context;
        if (type == "image") {
            // Draws image of airplane.
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            // Writes score on canvas.
        } else if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.textAlign = "center";
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    };
    // Uses speedX and speedY to change the component's position. Called before drawing the component.
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    };
    // Checks to see if component crashes with an obstacle.
    this.crashWith = function (otherobj) {
        var myleft = this.x;
        var myright = this.x + this.width;
        var mytop = this.y;
        var mybottom = this.y + this.height;
        var otherleft = otherobj.x;
        var otherright = otherobj.x + otherobj.width;
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + otherobj.height;
        var crash = true;
        if (mybottom < othertop || mytop > otherbottom || myright < otherleft || myleft > otherright) {
            crash = false;
        }
        return crash;
    };
}
// The updateGameArea() function calls clear() and update() methods which causes the component to be drawn and cleared 50 times per second.
function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    // Loops through obstacles to see if there is a crash. If there is a crash then the updateGameArea function will stop and no more drawing is done.
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            myGameArea.stop();
            return;
        }
    }
    myGameArea.clear();
    // Counts the score.
    myGameArea.frameNo += 1;
    // Counts frames and adds obstacles for every 150th frame.
    if (myGameArea.frameNo == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;
        // Makes obstacles different heights inbetween 60 and 250. Gaps inbetween are always 60.
        minHeight = 60;
        maxHeight = 250;
        height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
        minGap = 60;
        maxGap = 60;
        gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
        myObstacles.push(new component(30, height, "orange", x, 0));
        myObstacles.push(new component(30, x - height - gap, "grey", x, height + gap));
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        // Moves obstacles.
        myObstacles[i].speedX = -2;
        myObstacles[i].newPos();
        myObstacles[i].update();
    }
    myScore.text = "SCORE: " + myGameArea.frameNo;
    myScore.update();
    myGamePiece.newPos();
    myGamePiece.update();
}
function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {
        return true;
    }
    return false;
}
// Functions for each button to move the component in the selected direction. speedX and speedY are speed indicators.
function moveup() {
    myGamePiece.speedY = -2;
}
function movedown() {
    myGamePiece.speedY = 2;
}
function moveleft() {
    myGamePiece.speedX = -2;
}
function moveright() {
    myGamePiece.speedX = 2;
}
  // Clears all moves from the component so it doesn't leave a trail.
function clearmove() {
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
}
