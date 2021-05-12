var canvas = document.getElementById('canvas-1');
var ctx = canvas.getContext('2d');
canvas.style.opacity = 0.6;
canvas.width = 720;
canvas.height = window.innerHeight;

var gameState = 0;
var startMenu = document.querySelector('.game-start-menu');
var endMenu = document.querySelector('.game-over-menu');
var scorePanel = document.querySelector('.score-panel');
var highScore = document.querySelector('.high-score');

if (localStorage.getItem('high-score') === null) {
  localStorage.setItem('high-score', 0);
}

highScore.innerHTML = localStorage.getItem('high-score');
