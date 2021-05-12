function Road() {
  this.roadImage = new Image();
  this.roadImage.src = 'images/road.png';
  this.roadPosition = -canvas.height;
  this.movementSpeed = 0;

  this.drawRoad = () => {
    ctx.drawImage(
      this.roadImage,
      0,
      this.roadPosition,
      canvas.width,
      canvas.height * 2
    );
    this.roadPosition += this.movementSpeed;
    if (this.roadPosition >= 0) {
      this.roadPosition = -canvas.height;
    }
    this.roadAnimation = requestAnimationFrame(this.drawRoad);
  };
}

var road = new Road();
road.drawRoad();
