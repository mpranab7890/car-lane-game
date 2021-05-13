document.addEventListener('keypress', (e) => {
  if (e.key == 'Enter' && gameState != 1) {
    canvas.style.opacity = 1;

    if (gameState == 0) {
      startMenu.style.display = 'none';
      scorePanel.style.display = 'block';
      bulletPanel.style.display = 'block';
    }
    if (gameState == 2) {
      endMenu.style.display = 'none';
      bulletElement.forEach(
        (bulletE) => (bulletE.style.visibility = 'visible')
      );
      obstacleList = [];
      myCar.positionX = canvas.width / 2 - 50;
      myCar.currentLane = 2;
      createObstacles();
    }
    score = 0;
    road.movementSpeed = 15;
    gameState = 1;
    console.log('Here');
  }
});
