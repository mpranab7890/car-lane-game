var obstacleList = [];
var bulletElement = document.querySelectorAll('.bullet');

function MyCar() {
  this.myCarImage = new Image();
  this.myCarImage.src = 'images/my-car.png';
  this.myCarWidth = 105;
  this.myCarHeight = 218;
  this.currentLane = 2;
  this.positionX = canvas.width / 2 - 50;
  this.positionY = canvas.height - this.myCarHeight;
  this.postionChange = 200;
  this.bullets = 3;
  this.bulletElement;
  this.shootingBullet = new Image();
  this.shootingBullet.src = 'images/bullet.png';
  this.bulletX;
  this.bulletY = this.positionY - 25;
  this.bulletLane;
  this.animationFrame;
  this.bulletHit = false;

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
          this.bullets = 3;
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

  this.shoot = () => {
    this.bulletX = this.positionX + 20;
    this.bulletLane = this.currentLane;
    this.animateBullet();
  };

  this.animateBullet = () => {
    // if (this.bulletY < 20 && this.animationFrame) {
    //   cancelAnimationFrame(this.animationFrame);
    //   this.animationFrame = undefined;
    //   console.log('hereee');
    // }
    ctx.drawImage(this.shootingBullet, this.bulletX, this.bulletY, 50, 50);
    if (this.bulletY > 0 && !this.bulletHit) {
      obstacleList.forEach((obstacle, index) => {
        if (this.bulletLane == obstacle.laneNumber) {
          console.log(this.bulletY, obstacle.y + this.myCarHeight);
          if (this.bulletY <= obstacle.y + this.myCarHeight) {
            obstacleList.splice(index, 1);
            this.bulletHit = true;
            score += 1;
          }
        }
      });
      this.bulletY -= road.movementSpeed;
      var a = requestAnimationFrame(this.animateBullet);
    } else {
      cancelAnimationFrame(a);
      this.bulletY = this.positionY;
      this.bulletHit = false;
    }
  };
}

var myCar = new MyCar();
myCar.drawMyCar();
