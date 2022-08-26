var Loader = {
  images: {}
};

Loader.loadImage = function (key, src) {
  var img = new Image();

  var d = new Promise(function (resolve, reject) {
      img.onload = function () {
          this.images[key] = img;
          resolve(img);
      }.bind(this);

      img.onerror = function () {
          reject('Could not load image: ' + src);
      };
  }.bind(this));

  img.src = src;
  return d;
};

Loader.getImage = function (key) {
  return (key in this.images) ? this.images[key] : null;
};

const FIRST_QD = 1
const SECOND_QD = 2
const THIRD_QD = 3
const FOURTH_QD = 4
function drawPoint(context, angle, color, quadrant) {

  var size = 2;
  var radius = 50;
  var y = Math.sin(angle * (Math.PI/ 180.0));
  var x = Math.cos(angle * (Math.PI/ 180.0));
  var pointX;
  var pointY;

    switch (quadrant){
        case FIRST_QD:
            pointX = (x*radius);
            pointY = radius - (y*radius);
            break
        case SECOND_QD:
            pointX = ((-x)*radius);
            pointY = radius - (y*radius);
            break
        case THIRD_QD:
            pointX = ((-x)*radius);
            pointY = radius - ((-y)*radius);
            break
        case FOURTH_QD:
            pointX = (x*radius);
            pointY = radius - ((-y)*radius);
        break
  }
  context.beginPath();
  context.fillStyle = color;
  
  context.fillRect(200+pointX, 200+pointY, size, size);
  context.fill();

}
var Game = {};

Game.load = function () {
  return [
      Loader.loadImage('tiles', '../assets/tiles.png'),
      Loader.loadImage('hero', '../assets/character.png')
  ];
};

Game.init = function () {

}
Game.run = function (context) {
  this.ctx = context;
  this._previousElapsed = 0;

  var p = this.load();
  Promise.all(p).then(function (loaded) {
      this.init();
      window.requestAnimationFrame(this.tick);
  }.bind(this));
};


Game.update = function (delta) {
  for ( let i = 0; i < 360; i++ ) {
    color = "black";
    
    drawPoint(this.ctx, i,color, FIRST_QD);
    drawPoint(this.ctx, i,color, SECOND_QD);
    drawPoint(this.ctx, i,color, THIRD_QD);
    drawPoint(this.ctx, i,color, FOURTH_QD);
  }
};

Game.render = function () {

};
Game.tick = function (elapsed) {
  window.requestAnimationFrame(this.tick);

  // clear previous frame
  this.ctx.clearRect(0, 0, 640, 640);
  // compute delta time in seconds -- also cap it
  var delta = (elapsed - this._previousElapsed) / 1000.0;
  delta = Math.min(delta, 0.25); // maximum delta of 250 ms
  this._previousElapsed = elapsed;

  this.update(delta);
  this.render();
}.bind(Game);

window.onload = function () {
  var context = document.getElementById('demo').getContext('2d');
  Game.run(context);
};

