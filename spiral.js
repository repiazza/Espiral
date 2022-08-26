// function drawPoint(context, x, y, label, color, size) {
//     if (color == null) {
//       color = '#000';
//   }
//   if (size == null) {
//       size = 5;
//   }




  //   // to increase smoothing for numbers with decimal part
  // var pointX = Math.round(x - radius);
  // var pointY = Math.round(y - radius);

  // context.beginPath();
  // context.fillStyle = color;
  // context.fillStyle = color;
  // context.fillRect(pointX, pointY, size, size);
  // context.fill();


//   Game.init = function () {
//     this.tileAtlas = Loader.getImage('tiles');
//     this.tileAtlas = Loader.getImage('trtiles');
// };

// Game.update = function (delta) {
// };

// Game.render = function () {
//     for (var c = 0; c < map.cols; c++) {
//         for (var r = 0; r < map.rows; r++) {
//             var tile = map.getTile(c, r);
//             if (tile !== 0) { // 0 => empty tile
//                 this.ctx.drawImage(
//                     this.tileAtlas, // image
//                     (tile - 1) * map.tsize, // source x
//                     0, // source y
//                     map.tsize, // source width
//                     map.tsize, // source height
//                     c * map.tsize,  // target x
//                     r * map.tsize, // target y
//                     map.tsize, // target width
//                     map.tsize // target height
//                 );
//                 // this.ctx.globalAlpha  = 0.7;
//                 // this.ctx.filter = "brightness(120%) blur(130%) opacity(150%)"
//                 this.ctx.filter ='contrast(1.4) blur(1px) drop-shadow(-9px -9px 10px #f7d7ff)';
//             }
//         }
//     }
// };

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

  //   if (label) {
  //     var textX = Math.round(x);
  //       var textY = Math.round(pointY - 5);
    
  //     context.font = 'Italic 14px Arial';
  //     context.fillStyle = color;
  //     context.textAlign = 'center';
  //     context.fillText(label, textX, textY);
  // }
// }
//
//
//
//
// var degs = "45";
// var rads = degsToRads = deg => (deg * Math.PI) / 180.0;  
var firstRadius= 10;
var allRadius= [1,2,3,4,5,6,7,8,9,10];
// virar square
// function drawcircle(x, y, radius, ctx){
//   ctx.lineWidth = 20;
//   var myfs = "#3370d4";
//   ctx.strokeStyle = myfs
//   // ctx.globalAlpha = 1;
//   ctx.beginPath();
//   ctx.arc(x, y, radius, 0, 2 * Math.PI);
//   ctx.stroke();

// }
function drawPoint(context, angle,color) {

  var  size = 5;
  var radius = 10
  var y = Math.sin(angle * (Math.PI/ 180.0));
  var x = Math.cos(angle * (Math.PI/ 180.0));
  alert(x*radius)
  alert(y*radius)
  var pointX = radius - (x*radius) + 100;
  var pointY = radius - (y*radius) + 100;
  context.beginPath();
  // context.moveTo(100,100);
  // context.lineTo(200, 200);
  context.fillStyle = color;

  // alert(pointX + " " + pointY)
  
  context.fillRect(100, 100, size, size);
  context.fill();


//   Game.init = function () {
//     this.tileAtlas = Loader.getImage('tiles');
//     this.tileAtlas = Loader.getImage('trtiles');
// };
}
// function drawinnercircle(x, y, radius, ctx, fs=null){
//   // var radius = 80*Math.sqrt(2);

//   ctx.lineWidth = 20;
//   var myfs = "#3370d4";
//   ctx.globalAlpha = 0.4;
//   // 

//   ctx.globalCompositeOperation="";
//   if ( fs !== null  ){
//     ctx.globalAlpha = 1;
//     // ctx.globalCompositeOperation="color-burn";
//     ctx.globalCompositeOperation="lighter";
//         // ctx.globalCompositeOperation="overlay";
        
//           // if ( radius > 35.0 )
//         // ctx.globalCompositeOperation="destination-over";
//         myfs = fs; //blue
//         // ctx.strokeStyle = myfs
//   }
   
//   ctx.strokeStyle = myfs


//   ctx.beginPath();
//   ctx.arc(x, y, radius, 0, 2 * Math.PI);
//   ctx.stroke();
//   // ctx.closePath();
// }
var Game = {};

Game.load = function () {
  return [
      Loader.loadImage('tiles', '../assets/tiles.png'),
      Loader.loadImage('hero', '../assets/character.png')
  ];
};

Game.init = function () {
  
  // drawinnercircle(80,80, degs);
  // this.tileAtlas = Loader.getImage('tiles');
  // this.tileAtlas = Loader.getImage('trtiles');
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

let  deltainc = 0;
// let xaxis = 10;
// let yaxis = 10;
let quadrant = 1;

let xaxis = [-10, -9,-8,-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9,10]
let yaxis = [-10, -9,-8,-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9,10]
let alphaangle = [0]
let alphavariation = 1;

Game.update = function (delta) {
  // deltainc += delta;
  // var base = 10;
  // if ( deltainc > base )
  //   base = base * 10
  // if ( parseInt(deltainc % base) < deltainc && (deltainc+1 - parseInt(deltainc % base)) >= 1  ){
  //   deltainc =  parseInt(deltainc % base)+1
  // }
  // var rd = 10;
  // (Math.sqrt(xpos) + Math.sqrt(ypos) ==  Math.sqrt(rd))

  // // xaxis.map((xpos) =>{
  //   // rd = xpos;
  //   drawcircle(xpos, 10, xpos, this.ctx)
  
  for ( let i = 0; i < 90; i++ ) {
    color= "#0000" + i;
    drawPoint(this.ctx, i,color);
    // alert(ang)
  }
  
  // if ( alphaangle.length >= 100 )
   

  alert( " " )
  // });
  // if ( parseInt(deltainc % base) < deltainc && (deltainc+1 - parseInt(deltainc % base)) >= 1  ){
    // deltainc =  parseInt(deltainc % base)+1
  // } 
  // y == 10
  // if ( quadrant == 1 ){
  //   xaxis = xaxis - 1;
  //   if ( xaxis >= -10 )
  //     quadrant = 2;
  // }
  // if ( quadrant == 2 ){
  //   yaxis = yaxis - 1;
  //   if ( yaxis >= -10 )
  //     quadrant = 3;
  // }
  // if ( quadrant == 3 ){
  //   xaxis = xaxis + 1;
  //   if ( xaxis >= 10 )
  //     quadrant = 4;
  // }
  // if ( quadrant == 4 ){
  //   if ( xaxis < 10 )
  //     xaxis = xaxis + 1;
  //   if ( xaxis >= 10 )
  //     yaxis = yaxis + 1;
  //   if ( xaxis >= 10 && yaxis >= 10)
  //     quadrant = 1;
  // }



  
  // // deltainc 
  // allRadius.map((rd) => {
  //   // var xaxisrd = Math.abs(xaxis);
  //   // var yaxisrd = Math.abs(yaxis);
  //   var xaxisrd = (xaxis);
  //   var yaxisrd = (yaxis);
  //   // if ( rd < 35.0 )
  //     drawinnercircle(xaxisrd, yaxisrd, rd, this.ctx, null)
  //     // if ( rd > 35.0 )
  //       drawinnercircle(xaxisrd, yaxisrd, rd, this.ctx, "#c82124")
  // })

  // if ( (deltainc % 2) == 0 ){
  //   firstRadius = firstRadius + 1;
  //   allRadius.push(firstRadius);
  // }

  // if ( deltainc > 50.0 ){
  //   firstRadius = 10
  //   allRadius = [10];
  //   // deltainc = 0.0;
  // }


  
  // this.ctx.beginPath();
  // // ctx.arc(100, x, y, 0, );
  // this.ctx.arc(100, 75, 50, 0, 2 * Math.PI);
  // this.ctx.stroke();
};

Game.render = function () {
  // this.ctx.beginPath();
  // // ctx.arc(100, x, y, 0, );
  // this.ctx.arc(100, 75, 50, 0, 2 * Math.PI);
  // this.ctx.stroke();
  // drawinnercircle(80,80, this.ctx);
  // for (var c = 0; c < map.cols; c++) {
  //     for (var r = 0; r < map.rows; r++) {
  //         var tile = map.getTile(c, r);
  //         if (tile !== 0) { // 0 => empty tile
  //             this.ctx.drawImage(
  //                 this.tileAtlas, // image
  //                 (tile - 1) * map.tsize, // source x
  //                 0, // source y
  //                 map.tsize, // source width
  //                 map.tsize, // source height
  //                 c * map.tsize,  // target x
  //                 r * map.tsize, // target y
  //                 map.tsize, // target width
  //                 map.tsize // target height
  //             );
  //             // this.ctx.globalAlpha  = 0.7;
  //             // this.ctx.filter = "brightness(120%) blur(130%) opacity(150%)"
  //             this.ctx.filter ='contrast(1.4) blur(1px) drop-shadow(-9px -9px 10px #f7d7ff)';
  //         }
  //     }
  // }
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

