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

        // case SECOND_QD:
        //     pointX = ((-x)*radius);
        //     pointY = radius - (y*radius);
        //     break
        // case THIRD_QD:
        //     pointX = ((-x)*radius);
        //     pointY = radius - ((-y)*radius);
        //     break
        // case FOURTH_QD:
        //     pointX = (x*radius);
        //     pointY = radius - ((-y)*radius);
        // break

  
  // for ( let deg = 0; deg < 360; deg++ ) {
    // color = "black";
    // alert(deg/8 - deg%8)
    // radius + (deg/8 - deg%8)
    // radius = radius + 1;
    // drawPoint(this.ctx, ideg++,  radius , color);
  // }
  // radius ++
  

  // if ( (ideg % 255) == 0 ){
  //   colorndx = ( Math.trunc(ideg/255) ) > (256-1) ? (Math.trunc(ideg/255)%255) : Math.trunc(ideg/255)
  // }
  
  // alert (colorndx);

  //  color = get_rgb(255 + 0        + 0);
  //  color = get_rgb(0    + 256 + 0);
  //  color = get_rgb(0    + 0        + 256*256);
  // if ( cicle == 1 )
  //   color ="#ff0000"
  // if ( cicle == 2 )
  //   color ="#00ff00"
  // if ( cicle == 3 )
  //   color ="#0000ff"
  // color = get_rgb(ideg);


const FIRST_QD = 1
const SECOND_QD = 2
const THIRD_QD = 3
const FOURTH_QD = 4
const X_ORIG_OFFSET = 300
const Y_ORIG_OFFSET = 250
const INITIAL_RADIUS = 0
const RADIUS_INCREMENT = 100
let ideg = 0
let color = "";
var radius = INITIAL_RADIUS;
let cicle = 1;

function drawPoint(context, angle, radius, color) {

  var size = 3;
  var offsetx = X_ORIG_OFFSET
  var offsety = Y_ORIG_OFFSET
  var y = Math.sin(angle * (Math.PI/ 180.0));
  var x = Math.cos(angle * (Math.PI/ 180.0));
  var pointX;
  var pointY;

  pointX = (x*radius);
  pointY = Number(radius - (y*radius));
  

  context.beginPath();
  context.fillStyle = color;
  var newpointy = Number(offsety+pointY)
  var newpointx = Number(offsetx+pointX)
  if ( color == "red"){
    var size = 5;
    // alert(newpointx + " " + newpointy)
  }
  context.fillRect(newpointx, newpointy, size, size);
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
  // drawOriginAxis(this.ctx, X_ORIG_OFFSET, Y_ORIG_OFFSET)
  drawOriginAxis(this.ctx, X_ORIG_OFFSET, Y_ORIG_OFFSET+100)
  drawLine(this.ctx, 300, 300);
  drawLine(this.ctx, 300, -300);
  drawLine(this.ctx, -300, -300);
  drawLine(this.ctx, -300, 300);
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

function drawOriginAxis(ctx, xAxis, yAxis){
  ctx.beginPath();
  ctx.moveTo(0, yAxis)
  ctx.lineTo(600, yAxis); // origem y constante
  ctx.moveTo(xAxis, yAxis)
  ctx.lineTo(xAxis, 600); // origem x constante
  ctx.stroke(); 
}
function drawLine(ctx, xpos, ypos){
  ctx.beginPath();
  ctx.moveTo(X_ORIG_OFFSET, Y_ORIG_OFFSET);
  ctx.lineTo((X_ORIG_OFFSET+xpos),(Y_ORIG_OFFSET+ypos));
  ctx.stroke(); 
}

function get_rgb(int_value){
    let arrret = [];
    arrret[0] = int_value & 255
    arrret[1] = (int_value >> 8) & 255
    arrret[2] = (int_value >> 16) & 255
    return "#"+ `${arrret[0]}`.padStart(2,'0').slice(-2)+ `${arrret[1]}`.padStart(2,'0').slice(-2)+`${arrret[2]}`.padStart(2,'0').slice(-2);
  }

Game.update = function (delta) {
  color = "black"
  drawPoint(this.ctx, ideg++,  radius , color);
  if ( (ideg % 360) == 0 ){
    color = "red"
    radius += RADIUS_INCREMENT;
    drawPoint(this.ctx, ideg++,  radius , color);
    // cicle ++ 
    // if ( cicle > 3)
    //   cicle = 1
  }
  
};

Game.render = function () {

};
Game.tick = function (elapsed) {
  window.requestAnimationFrame(this.tick);

  // clear previous frame
  // this.ctx.clearRect(0, 0, 640, 640);
  // compute delta time in seconds -- also cap it
  var delta = (elapsed - this._previousElapsed) / 1000.0;
  // delta = Math.min(delta, 0.25); // maximum delta of 250 ms
  // delta = Math.min(delta, 0.05); // maximum delta of 250 ms
  this._previousElapsed = elapsed;

  this.update(delta);
  // this.render();
}.bind(Game);

window.onload = function () {
  var context = document.getElementById('demo').getContext('2d');
  Game.run(context);
};

