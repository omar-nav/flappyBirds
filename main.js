var canvas = document.getElementsByTagName("canvas")[0];
var ctx = canvas.getContext("2d");

ctx.fillRect(100, 120, 180, 100);
ctx.fillStyle;

// variables globales
var pipes = [];
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
} //clase flappy
class Pipe {
  constructor(y, height, pipeName = "pipe2") {
    this.x = canvas.width - 50;
    this.y = y ? y : 0;
    this.width = 50;
    this.height = height || 100;
    this.image = new Image();
    this.image.src = images[pipeName];
    this.image.onload = () => {
      this.draw();
    };
  }
  draw() {
    this.x -= 2;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
// SON OBJETOS(INSTANCIAS)
// DE CLASES!!
var board = new Board();
var flappy = new Flappy();
var pipe = new Pipe(100, 300, "pipe1");

// funciones principales
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  board.draw();
  // pipe.draw();
  flappy.draw();
  drawPipes();
  generatePipes();
}
function start() {
  interval = setInterval(update, 1000 / 60);
}

addEventListener("keydown", function(e) {
  if (e.keyCode === 32 && e.keyCode) {
    flappy.y -= 70;
  }
  // if (flappy.x === 100 && flappy.y === 512) {
  //   flappy.y = 0;
  // }
});
start();

// funciones auxiliares
function generatePipes() {
  // 1 generar el tubo de arriba
  // var pipe = new Pipe(100, 300, "pipe1");
  var y = 0;
  var alto = Math.floor(Math.random * 400) + 20;
  var topPipe = new Pipe(y, alto, "pipe2");
  // 2 establecer el espacio donde pasa flappy
  var window = 100;
  var alto2 = canvas.height - (window + alto);
  // 3 generar el tubo de abajo
  var bottomPipe = new Pipe(canvas.height - alto2, alto2, "pipe1");

  // 4 donde jodidos pongo los tubos
  pipes.push(bottomPipe);
  pipes.push(topPipe);
}

function drawPipes() {
  pipes.forEach(function(pipe) {
    pipe.draw();
  });
}

// los observadores
