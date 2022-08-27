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
const X_ORIG_OFFSET = 300
const Y_ORIG_OFFSET = 250
const INITIAL_RADIUS = 10
const RADIUS_INCREMENT = 10
const ORIGIN_AXIS_COLOR = "black"
const CENTER_CIRCLE_AXIS_COLOR = "blue"
let aqdeg = 0
let ideg = 1
let color = "";
var radius = INITIAL_RADIUS;
var aquard = INITIAL_RADIUS;
var cicle = 10;
let setPsize=0;
let ciclex = 10;
let cicley = 10;
let minusy = 1;
let minusx = 1;
let colorcicle = ["red", "blue", "orange", "green", "magenta"];
color  = colorcicle.pop();
colorcicle = [color].concat(colorcicle);


function drawPoint(context, angle, raio, color, xoffset=0, yoffset=0) {

  var size = 2;
  var y = Math.sin(angle * (Math.PI/ 180.0));
  var x = Math.cos(angle * (Math.PI/ 180.0));
  var pointX;
  var pointY;
   

  // if (xoffset==0 && yoffset==0 ){
  //   pointX = (x*raio);
  //   pointY = Number(raio - (y*raio));
  //   // pointY = (y*raio);
  // }
  // else{
    pointY =  Number(yoffset - (y*raio));
    pointX =  Number(xoffset - (x*raio));
  // }

  // var rsl1 = Math.pow(pointX,2) 
  // var rsl2 = Math.pow(pointY,2)
  // alert(pointX +" "+ rsl1)


  // if ( (Math.pow(pointX,2) /Math.pow(pointY,2)) == 1 )
  //   alert(Math.abs(pointX)) 
  // Math.pow(pointX,2) / Math.pow(pointY,2);
  // var rsl1 = Math.pow(pointX,2)*100000
  // var rsl2 = Math.pow(pointY,2)*100000
  // alert(Math.trunc(rsl2));
  // alert(Math.trunc(rsl1));

  // context.globalCompositeOperation="saturation";
  context.beginPath();
  context.fillStyle = color;
  var newpointy = Number(Y_ORIG_OFFSET+pointY)
  var newpointx = Number(X_ORIG_OFFSET+pointX)
  if ( setPsize > 0 )
    size = setPsize;

  context.fillRect(newpointx, newpointy, size, size);
  context.fill();

}
var Game = {};

Game.load = function () {
  return [
      Loader.loadImage('tiles', '../assets/tiles.png'),
      Loader.loadImage('hero', '../assets/character.png')
  ];
}
Game.init = function () {
  
  // radius  = radius + (radius *  (Math.PI/ 180.0)  / Math.PI);
  drawOriginAxis(this.ctx, X_ORIG_OFFSET, Y_ORIG_OFFSET, ORIGIN_AXIS_COLOR)
  drawOriginAxis(this.ctx, X_ORIG_OFFSET, Y_ORIG_OFFSET+100, CENTER_CIRCLE_AXIS_COLOR)
  // this.ctx.strokeStyle = "cyan";
  drawLine(this.ctx, 300, 300);
  drawLine(this.ctx, 300, -300);
  drawLine(this.ctx, -300, -300);
  drawLine(this.ctx, -300, 300);
  // this.ctx.strokeStyle = "";
}
Game.run = function (context) {
  this.ctx = context;
  this._previousElapsed = 0;

  var p = this.load();
  Promise.all(p).then(function (loaded) {
      this.init();
      window.requestAnimationFrame(this.tick);
  }.bind(this));
}
function drawOriginAxis(ctx, xAxis, yAxis, color=null){
  ctx.beginPath();
  ctx.moveTo(0, yAxis)
  if ( color !== null)
    ctx.strokeStyle = color;
  ctx.lineTo(600, yAxis); // origem y constante
  ctx.moveTo(xAxis, yAxis)
  ctx.lineTo(xAxis, 600); // origem x constante
  ctx.stroke();

  ctx.strokeStyle = "black" ;
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
function drawAquamanQuadrants(ctx){
  // var rds = radius;
  drawPoint(ctx, aqdeg++,  aquard , color, ciclex, cicley);
  
  if ( (aqdeg % 360) == 0 ){
    // alert("ciclex" + ciclex)
    // alert("cicley" + cicley)
    
    cicle  = Number(cicle + 2);
    cicley = minusy*cicle;
    ciclex = minusx*cicle;
    aquard = cicle; 

    // if ( cicle > 100 ){
    //   if ( minusy < 0 && minusx > 0 ){
    //     minusx = minusy;
    //     color  = colorcicle.pop();
    //     colorcicle = [color].concat(colorcicle);
    //   }
    //   else if ( minusy < 0 && minusx < 0  ){
    //     minusy = -1*minusy;
    //     color  = colorcicle.pop();
    //     colorcicle = [color].concat(colorcicle);
    //   }
    //   else if ( minusy > 0 && minusx < 0  ){
    //     minusx = -1*minusx;
    //     color  = colorcicle.pop();
    //     colorcicle = [color].concat(colorcicle);
    //   }
    //   else{
    //     minusy = -1*minusy
    //     color  = colorcicle.pop();
    //     colorcicle = [color].concat(colorcicle);
    //   }
    //   cicle  = 0
    //   cicley = 10;
    //   ciclex = 10;
    //   aquard = INITIAL_RADIUS;
    // }
  }
}

// prO's
Game.update = function (delta) {

  // drawAquamanQuadrants(this.ctx);
  //         context, angle,    raio,      color, xoffset=0, yoffset=0)
  // var myrd = ideg ???
  //                            myRd
  //squaresidesize
  // 0.7071
  // 45 --------- raiz2
  // 1               x
  // Arc Length = θ × (π/180) × r,
  // alert 
  // alert ( Math.sqrt(2))
  // alert(Math.sin((ideg * (Math.PI/ 180.0)))*radius)
  // drawPoint(this.ctx, ideg++,  radius++ , "black",   0,         0     );
  // alert( ((ideg * (Math.PI/ 180.0))*radius))
   radius  = radius + (radius *  (Math.PI/ 180.0)  / Math.PI);
   ciclex = (Math.PI/ 180.0)  / Math.PI;
   cicley = (Math.PI/ 180.0)  / Math.PI;
  // ciclex = 10/radius;
  // cicley = 10/radius;
  // radius = cicle;   
  // //  radius  = radius + (radius *  (Math.PI/ 180.0)  / Math.PI);
    color  = colorcicle.pop();
    colorcicle = [color].concat(colorcicle)
  for ( let i = 0; i < radius; i += 10){
    drawPoint(this.ctx, ideg,  radius-i, color,   0,        0     );
    // // drawPoint(this.ctx, ideg,  radius-2 , "red",         ciclex,        cicley     );
    // drawPoint(this.ctx, ideg,  radius-4 , "black",       0,        0     );
  }
  ideg++
  // ideg = ideg+0.5;
  // alert(radius)
  if ( (ideg % 360) == 0 ){
    // radius = 10;
    // radius  = radius + (radius *  (Math.PI/ 180.0)  / Math.PI);
    // cicle = Number(cicle + 10);
    // ciclex = radius;
    // cicley = radius;
    // radius += ciclex/10
    // radius += radius*((Math.PI/ 180.0)/ Math.PI)*ciclex/Math.PI + ciclex
    // ciclex = cicle;
    // cicley = cicle;
    // alert("A");
    // radius += RADIUS_INCREMENT;
    // setPsize=7;
    // drawPoint(this.ctx, ideg,  radius , "cyan", 0, 0); 
    // setPsize=0;
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

