function MyCar() {
  this.myCarImage = new Image();
  this.myCarImage.src = 'images/my-car.png';
  this.myCarWidth = 105;
  this.myCarHeight = 218;
  this.currentLane = 2;
  this.positionX = canvas.width / 2 - 50;
  this.positionY = canvas.height - this.myCarHeight;
  this.postionChange = 200;

  window.addEventListener('keydown', (e) => {
    if (gameState == 1) {
      if (e.key == 'a' && this.currentLane != 1) {
        console.log('here');
        this.positionX -= this.postionChange;
        this.currentLane--;
      }
      if (e.key == 'd' && this.currentLane != 3) {
        this.positionX += this.postionChange;
        this.currentLane++;
      }
    }
  });

  this.drawMyCar = () => {
    ctx.drawImage(this.myCarImage, this.positionX, this.positionY, 105, 218);
    requestAnimationFrame(this.drawMyCar);
  };

  this.checkCollision = (obstacleList, score) => {
    obstacleList.forEach((obstacle) => {
      if (obstacle.laneNumber == this.currentLane) {
        if (obstacle.y + OBSTACLE_HEIGHT > this.positionY) {
          //alert('Game over');
          road.movementSpeed = 0;
          canvas.style.opacity = 0.6;
          gameState = 2;
          endMenu.style.display = 'block';
          if (score > localStorage.getItem('high-score')) {
            localStorage.setItem('high-score', score);
            highScore.innerHTML = score;
          }
        }
      }
    });
  };
}

var myCar = new MyCar();
myCar.drawMyCar();
