var gl;
var shaderProgram;
var vertexBuffer; // буфер вершин
var colorBuffer; //буфер цветов
var sliderValue;

var v1r=0.0, v1g=0.5, v1b=1,
    v2r=1.0, v2g=1.0, v2b=0,
    v3r=0.8, v3g=0.0, v3b=0,
    v1r_temp=v1r,
    v1g_temp=v1g,
    v1b_temp=v1b,
    v2r_temp=v2r,
    v2g_temp=v2g,
    v2b_temp=v2b,
    v3r_temp=v3r,
    vr3g_temp=v3g,
    vr3b_temp=v3b;

// установка шейдеров
function initShaders() {
    var fragmentShader = getShader(gl.FRAGMENT_SHADER, 'shader-fs');
    var vertexShader = getShader(gl.VERTEX_SHADER, 'shader-vs');

    shaderProgram = gl.createProgram();

    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);

    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Не удалось установить шейдеры");
    }

    gl.useProgram(shaderProgram);

    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
    shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
    gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);
}
// Функция создания шейдера
function getShader(type,id) {
    var source = document.getElementById(id).innerHTML;
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert("Ошибка компиляции шейдера: " + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}
 // установка буферов вершин и индексов
function initBuffers() {
    var vertices = [
         0.0,  0.5,  0.0,
        -0.5, -0.5,  0.0,
         0.5, -0.5,  0.0
    ];
  // установка буфера вершин
    vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    vertexBuffer.itemSize = 3;
    vertexBuffer.numberOfItems = 3;

    var сolors = [
        v1r, v1g, v1b,
        v2r, v2g, v2b,
        v3r, v3g, v3b
    ];
    colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(сolors), gl.STATIC_DRAW);
}
 // отрисовка
function draw() {

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute,
                         vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexColorAttribute,
                        vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.TRIANGLES, 0, vertexBuffer.numberOfItems);
}

window.onload=function(){

    var canvas = document.getElementById("canvas3D");
    try {
        gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    }
    catch(e) {}

      if (!gl) {
        alert("Ваш браузер не поддерживает WebGL");
      }
    if(gl){
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;
        initShaders();
        initBuffers();
        draw();

    }
}


function RedUp(){
  v1r = 1.0;
  v1g = 0.0;
  v1b = 0.0;
  var сolors = [
      v1r, v1g, v1b,
      v2r, v2g, v2b,
      v3r, v3g, v3b
  ];
 colorBuffer = gl.createBuffer();
 gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
 gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(сolors), gl.STATIC_DRAW);
 initShaders();
 draw();
}
function RedRight(){
  v3r = 1.0;
  v3g = 0.0;
  v3b = 0.0;
  var сolors = [
      v1r, v1g, v1b,
      v2r, v2g, v2b,
      v3r, v3g, v3b
  ];
 colorBuffer = gl.createBuffer();
 gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
 gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(сolors), gl.STATIC_DRAW);
 initShaders();
 draw();
}

function RedLeft(){
  v2r = 1.0;
  v2g = 0.0;

  var сolors = [
      v1r, v1g, v1b,
      v2r, v2g, v2b,
      v3r, v3g, v3b
  ];
 colorBuffer = gl.createBuffer();
 gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
 gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(сolors), gl.STATIC_DRAW);
 initShaders();
 draw();
}

function GreenUp(){
  v1r = 0.0;
  v1g = 1.0;
  v1b = 0.0;
  var сolors = [
      v1r, v1g, v1b,
      v2r, v2g, v2b,
      v3r, v3g, v3b
  ];
 colorBuffer = gl.createBuffer();
 gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
 gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(сolors), gl.STATIC_DRAW);
 initShaders();
 draw();
}
function GreenRight(){
  v3r = 0.0;
  v3g = 1.0;
  v3b = 0.0;
  var сolors = [
      v1r, v1g, v1b,
      v2r, v2g, v2b,
      v3r, v3g, v3b
  ];
 colorBuffer = gl.createBuffer();
 gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
 gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(сolors), gl.STATIC_DRAW);
 initShaders();
 draw();
}
function GreenLeft(){
  v2r = 0.0;
  v2g = 1.0;
  v2b = 0.0;

  var сolors = [
      v1r, v1g, v1b,
      v2r, v2g, v2b,
      v3r, v3g, v3b
  ];
 colorBuffer = gl.createBuffer();
 gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
 gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(сolors), gl.STATIC_DRAW);
 initShaders();
 draw();
}
function BlueUp(){
  v1r = 0.0;
  v1g = 0.0;
  v1b = 1.0;
  var сolors = [
      v1r, v1g, v1b,
      v2r, v2g, v2b,
      v3r, v3g, v3b
  ];
 colorBuffer = gl.createBuffer();
 gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
 gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(сolors), gl.STATIC_DRAW);
 initShaders();
 draw();
}
function BlueRight(){
  v3r = 0.0;
  v3g = 0.0;
  v3b = 1.0;
  var сolors = [
      v1r, v1g, v1b,
      v2r, v2g, v2b,
      v3r, v3g, v3b
  ];
 colorBuffer = gl.createBuffer();
 gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
 gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(сolors), gl.STATIC_DRAW);
 initShaders();
 draw();
}
function BlueLeft(){
  v2r = 0.0;
  v2g = 0.0;
  v2b = 1.0;

  var сolors = [
      v1r, v1g, v1b,
      v2r, v2g, v2b,
      v3r, v3g, v3b
  ];
 colorBuffer = gl.createBuffer();
 gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
 gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(сolors), gl.STATIC_DRAW);
 initShaders();
 draw();
}
