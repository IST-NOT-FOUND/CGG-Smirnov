var gl;
var shaderProgram;
var vertexBuffer; // буфер вершин
var indexBuffer; //буфер индексов
var colorBuffer; //буфер цветов

var mvMatrix = mat4.create();
var pMatrix = mat4.create();
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

    shaderProgram.MVMatrix = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    shaderProgram.ProjMatrix = gl.getUniformLocation(shaderProgram, "uPMatrix");
}

function setMatrixUniforms(){
    gl.uniformMatrix4fv(shaderProgram.ProjMatrix,false, pMatrix);
    gl.uniformMatrix4fv(shaderProgram.MVMatrix, false, mvMatrix);
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

  var vertices =[
              // лицевая часть
              -0.5, -0.5, 0.5,
              0.0, 1.0, 0.0,
               0.5, 0.5, 0.5,
               0.5, -0.5, 0.5,
              // задняя часть
              -0.5, -0.5, -0.5,
              -0.5, 0.5, -0.5,
               0.5, 0.5, -0.5,
               0.5, -0.5, -0.5,
               0.0, 0.0, 0.5
               ];

  var indices = [0, 4, 7, 7, 3, 0, 7, 1, 4, 7, 1, 3, 3, 1 , 0, 4, 1, 0];

 // установка буфера вершин
  vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  vertexBuffer.itemSize = 3;

  // создание буфера индексов
  indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    // указываем число индексов это число равно числу индексов
    indexBuffer.numberOfItems = indices.length;

    // установка цветов для каждой вершины
    var сolors = [
      vRedColor, vGreenColor, vBlueColor,
      vRedColor, vGreenColor, vBlueColor,
      vRedColor, vGreenColor, vBlueColor,
      vRedColor, vGreenColor, vBlueColor,

      vRedColor, vGreenColor, vBlueColor,
      vRedColor, vGreenColor, vBlueColor,
      vRedColor, vGreenColor, vBlueColor,
      vRedColor, vGreenColor, vBlueColor,
    ];
    colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(сolors), gl.STATIC_DRAW);
}

function draw() {

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute,
                         vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexColorAttribute,
                        vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.enable(gl.DEPTH_TEST);

    gl.drawElements(gl.TRIANGLES, indexBuffer.numberOfItems, gl.UNSIGNED_SHORT,0);
}
function setupWebGL()
{
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT || gl.DEPTH_BUFFER_BIT);

    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    mat4.perspective(pMatrix, 1.04, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0);
    mat4.identity(mvMatrix);
    mat4.translate(mvMatrix,mvMatrix,[0, 0, -2.0]);
    mat4.rotate(mvMatrix,mvMatrix, 2.0, [0, 1, 0]);
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
        setupWebGL();
        setMatrixUniforms();
        draw();
    }
}
function changeColor(){
    vRedColor=document.getElementById("B").value/70;
    vGreenColor=document.getElementById("B").value/32;
    vBlueColor=document.getElementById("B").value/400;

    // установка цветов для каждой вершины
    var сolors = [
      vRedColor, vGreenColor, vBlueColor,
      vRedColor, vGreenColor, vBlueColor,
      vRedColor, vGreenColor, vBlueColor,
      vRedColor, vGreenColor, vBlueColor,

      vRedColor, vGreenColor, vBlueColor,
      vRedColor, vGreenColor, vBlueColor,
      vRedColor, vGreenColor, vBlueColor,
      vRedColor, vGreenColor, vBlueColor,
    ];
    colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(сolors), gl.STATIC_DRAW);
}
function initSlider(){
    initShaders();
    changeColor()
    setupWebGL();
    setMatrixUniforms();
    draw();
}
