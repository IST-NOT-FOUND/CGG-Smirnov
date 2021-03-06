window.onload = function () {
    init();
};
var camera, scene, renderer;
var geometry, material, mesh;
var isAnimated = false;
var isRight = true;
var k = 0.05;
var request;

function init() {
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 600;
    scene = new THREE.Scene();
    geometry = new THREE.CubeGeometry(250, 250, 250);
    material = new THREE.MeshBasicMaterial({color: 0x000000, wireframe: true});
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    renderer = new THREE.CanvasRenderer();
    renderer.setSize(700, 300);
    renderer.setClearColorHex(0x696969, 0.3);
    document.getElementsByClassName("canvas")[0].appendChild(renderer.domElement);
    renderer.render(scene, camera);
}

function animateCube() {
    if (isAnimated === true) {
        isAnimated = false;
        document.getElementById("btnAnimate").innerHTML = "Старт";
        stop();

    } else {
        isAnimated = true;
        document.getElementById("btnAnimate").innerHTML = "Стоп";
        start();
    }
}

function stop() {
    cancelAnimationFrame(request);
}

function start() {
    request = requestAnimationFrame(start);
    mesh.rotation.y += k;
    renderer.render(scene, camera);
}

function rotateLeft() {
    if (isAnimated) {
        if (isRight === true) {
            isRight = false;
            k = -0.05;
        }
    }
}

function rotateRight() {
    if (isAnimated) {
        if (isRight === false) {
            isRight = true;
            k = 0.05;
        }
    }
}
