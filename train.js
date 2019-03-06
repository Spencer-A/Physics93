$( document ).ready(function() {
    calculateW();
    drawDisk();
    drawTrain();
});

function calculateW(){
  var Dm = document.getElementById("DiskM").value;
  var Dr = document.getElementById("DiskR").value;
  var Tm = document.getElementById("TrainM").value;
  var Tr = document.getElementById("TrainR").value;
  var Tv = document.getElementById("TrainV").value;

  console.log(Dm);
  console.log(Dr);
  console.log(Tm);
  console.log(Tr);
  console.log(Tv);

  var Ti = Tm*Tr*Tr;
  var Di = .5*Dm*Dr*Dr;

  var result = (-1*(Ti)*(Tv/Tr))/((Di)+(Ti));
  console.log(result);
  var output = document.getElementById("output");
  output.value = result;
}

function drawTrain(){
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  ctx.fillStyle = "#FF0000";
  var width = 200;
  var height = 100;
  var x = Math.round(canvas.width/2 - width/2);
  var y = Math.round(canvas.height/2 + canvas.height*3/4*document.getElementById("TrainR").value/document.getElementById("DiskR").value);

  console.log(x);
  console.log(y);
  console.log(width);
  console.log(height);
  //ctx.fillRect(10,0,100,100)
  ctx.fillRect(Math.round(x),Math.round(y),Math.round(width),Math.round(height));
}

function drawDisk(){
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  ctx.fillStyle = "#FFFF00";
  ctx.beginPath();
  ctx.arc(canvas.width/2, canvas.height/2, canvas.width*3/8, 0, Math.PI/2);
  ctx.lineTo(canvas.width/2, canvas.height/8);
  ctx.arc(canvas.width/2, canvas.height/2, canvas.width*3/8, Math.PI*3/2, Math.PI, true);
  ctx.lineTo(canvas.width*7/8, canvas.height/2);
  ctx.fill();

  ctx.fillStyle = "#0000FF";
  ctx.beginPath();
  ctx.arc(canvas.width/2, canvas.height/2, canvas.width*3/8, Math.PI/2, Math.PI);
  ctx.lineTo(canvas.width*7/8, canvas.height/2);
  ctx.arc(canvas.width/2, canvas.height/2, canvas.width*3/8, Math.PI*2, Math.PI*3/2, true);
  ctx.lineTo(canvas.width/2, canvas.height*7/8);
  ctx.fill();
}
