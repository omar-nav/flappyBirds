var canvas = document.getElementsByTagName("canvas")[0];
var ctx = canvas.getContext("2d");

ctx.fillRect(100, 120, 180, 100);
ctx.fillStyle;

// variables globales
var interval;
var frames;
var images = {
  bg:
    "https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/bg.png?raw=true",
  flappy:
    "https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/flappy.png?raw=true",
  pipe1:
    "https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/obstacle_bottom.png?raw=true",
  pipe2:
    "https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/obstacle_top.png?raw=true"
};

// clases
// todas las clases en un video juego son objectos!!

class Board {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.image = new Image();
    this.image.src = images.bg;
    this.image.onload = () => {
      this.draw();
    };
  }
  draw() {
    this.x--;
    if (this.x < -canvas.width) this.x = 0;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
  }
} // clase board

class Flappy {
  constructor() {
    this.x = 100;
    this.y = 150;
    this.width = 40;
    this.height = 30;
    this.image = new Image();
    this.image.src = images.flappy;
    this.image.onload = () => {
      this.draw();
    };
    this.gravity = 3;
  }
  draw() {
    if (this.y < canvas.height - 50) this.y += this.gravity;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
// SON OBJETOS(INSTANCIAS)
// DE CLASES!!
var board = new Board();
var flappy = new Flappy();

// funciones principales
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  board.draw();
  flappy.draw();
}
function start() {
  interval = setInterval(update, 1000 / 60);
}

addEventListener("keydown", function(e) {
  if (e.keyCode === 32) {
    flappy.y -= 70;
  }
});
start();

// funciones auxiliares

// los observadores
