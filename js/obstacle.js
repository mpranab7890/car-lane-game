const OBSTACLE_WIDTH = 105;
const OBSTACLE_HEIGHT = 218;
var obstacleList = [];
var obstacleX = [110, 310, 510];
var scoreElement = document.querySelector('.score');
var score = 0;
var speedIncreased = false;

function Obstacle(laneNumber, y, obstacleImageNumber) {
  this.laneNumber = laneNumber;
  this.y = y;
  this.obstacleImageNumber = obstacleImageNumber;
  this.obstacleImage = new Image();
  this.obstacleImage.src = `images/obstacle-${this.obstacleImageNumber}.png`;

  this.drawObstacle = () => {
    ctx.drawImage(
      this.obstacleImage,
      obstacleX[this.laneNumber - 1],
      this.y,
      OBSTACLE_WIDTH,
      OBSTACLE_HEIGHT
    );
  };

  this.updateObstaclePosition = () => {
    this.drawObstacle();
    this.y += road.movementSpeed;
  };
}

var createObstacles = () => {
  var noOfObstacles = Math.random() > 0.9 ? 1 : 2;
  for (var i = 0; i < noOfObstacles; i++) {
    let laneNumber = Math.floor(getRandomNumber(1, 3.99));
    if (i == 1) {
      while (laneNumber == obstacleList[0].laneNumber) {
        laneNumber = Math.floor(getRandomNumber(1, 3.99));
      }
    }
    let obstacleImageNumber = Math.floor(getRandomNumber(1, 4.99));
    let y = getRandomNumber(-1, -canvas.height);
    let obstacle = new Obstacle(laneNumber, y, obstacleImageNumber);
    obstacleList.push(obstacle);
  }
};

var animateObstacles = () => {
  // var score = score;
  //   console.log(myCar);
  obstacleList.forEach((obstacle) => {
    myCar.checkCollision(obstacleList, score);
    obstacle.updateObstaclePosition();
    let initialObstacles = obstacleList.length;
    obstacleList = obstacleList.filter((o) => {
      return o.y < canvas.height;
    });
    score += initialObstacles - obstacleList.length;
    scoreElement.innerHTML = score;
    if (score != 0 && score % 15 == 0 && !speedIncreased) {
      road.movementSpeed += 1;
      speedIncreased = true;
    }
    if (obstacleList.length == 0) {
      speedIncreased = false;
      createObstacles();
    }
  });
  requestAnimationFrame(animateObstacles);
};

createObstacles();
animateObstacles();
