
$( document ).ready(function() {
    calculateW();
    drawDisk();
    drawTrain();
});


var timerId = -1;
var startTime;
var currentTime = 0;
var diskAngularVelocity;
var trainAngularVelocity;
var Dm, Dr, Tm, Tr, Tv;

function calculateW(){
  Dm = document.getElementById("DiskM").value;
  Dr = document.getElementById("DiskR").value;
  Tm = document.getElementById("TrainM").value;
  Tr = document.getElementById("TrainR").value;
  Tv = document.getElementById("TrainV").value;

  console.log(Dm);
  console.log(Dr);
  console.log(Tm);
  console.log(Tr);
  console.log(Tv);

  var Ti = Tm*Tr*Tr;
  var Di = .5*Dm*Dr*Dr;

  diskAngularVelocity = (-1*(Ti)*(Tv/Tr))/((Di)+(Ti));
  console.log(diskAngularVelocity);
  var output = document.getElementById("output");
  output.value = diskAngularVelocity;

  trainAngularVelocity = Tv / Tr + diskAngularVelocity;
}

function drawTrain(){
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  ctx.save();
  ctx.translate(canvas.width/2, canvas.height/2);  // center in the canvs

  var angle = trainAngularVelocity * currentTime / 1000;
  ctx.rotate(-angle);  // Rotate clockwise the angle

  ctx.fillStyle = "#FF0000";
  ctx.translate(0, canvas.height * 3/8 * Tr / Dr);
  ctx.fillRect(-10,-5,20,10);

  ctx.restore();
}

function drawDisk(){
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  // time is in milliseconds, so angle = omega * time / 1000;
  var angle = currentTime * diskAngularVelocity / 1000;
  ctx.save();
  ctx.translate(canvas.width/2, canvas.height/2);  // Move the origin to the center of the canvas
  ctx.rotate(-angle);  // Rotate clockwise the angle

  ctx.fillStyle = "#FFFF00";
  ctx.beginPath();
  ctx.arc(0, 0, canvas.width*3/8, 0, Math.PI/2);
  ctx.lineTo(0, 0);
  ctx.arc(0, 0, canvas.width*3/8, Math.PI*3/2, Math.PI, true);
  ctx.lineTo(0, 0);
  ctx.fill();

  ctx.fillStyle = "#0000FF";
  ctx.beginPath();
  ctx.arc(0, 0, canvas.width*3/8, Math.PI/2, Math.PI);
  ctx.lineTo(0,0);
  ctx.arc(0, 0, canvas.width*3/8, Math.PI*2, Math.PI*3/2, true);
  ctx.lineTo(0,0);
  ctx.fill();

  ctx.restore();
}

function drawCanvas() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDisk();
    drawTrain();
}

function updateTime() {
    var d = new Date();
    currentTime = d.getTime() - startTime;
    drawCanvas();
}

function goButton() {
//    console.log("Button pushed", timerId, document.getElementById("go"));
    if (timerId == -1) {
        calculateW();
        timerId = window.setInterval(updateTime, 15);
        document.getElementById('go').innerHTML = "Stop";
        var d = new Date();
        startTime = d.getTime();
        currentTime = 0;
    }
    else {
        window.clearInterval(timerId);
        timerId = -1;
        document.getElementById('go').innerHTML = "Go";
    }

}