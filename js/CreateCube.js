window.onload=function(){
    var camera, scene, renderer;
    var geometry, material, mesh;

    init();
    animate();
    // инициализация начальных значений
    function init() {
        // создаем камеру - перспективная проекция
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
        // установка z-координаты камеры
        camera.position.z = 600;
        // настройка сцены
        scene = new THREE.Scene();
        // настройка геометрии - в качестве геометрии будет куб
        // настроим его ширину, высоту и длину по оси z
        geometry = new THREE.CubeGeometry(200, 200, 200);
        geometry2 = new THREE.CubeGeometry(100, 100, 100);
        geometry3 = new THREE.CubeGeometry(50, 50, 50);
        geometry4 = new THREE.CubeGeometry(400, 400, 400);
        //geometrySpher = new THREE.PlanGeomtry(60, 20);
        // настройка материала - установка цвета
        material = new THREE.MeshBasicMaterial({ color: 0x00FF00, wireframe: true});
        material2 = new THREE.MeshBasicMaterial({ color: 0xFF00FF, wireframe: true});
        material3 = new THREE.MeshBasicMaterial({ color: 0xFFFFF0, wireframe: true});
        material4 = new THREE.MeshBasicMaterial({color: 0xFF0000, wireframe: true});
        //planeMaterial = new THREE.MeshBasicMaterial({color: 0xcccccc});
        // настраиваем меш, который будет отображать куб
        mesh = new THREE.Mesh(geometry, material);
        mesh2 = new THREE.Mesh(geometry2, material2);
        mesh3 = new THREE.Mesh(geometry3, material3);
        mesh4 = new THREE.Mesh(geometry4, material4);
        //meshPlane = new THREE.Mesh(geometrySpher, planeMaterial);
        scene.add(mesh);
        scene.add(mesh2);
        scene.add(mesh3);
        scene.add(mesh4);
        //scene.add(meshPlane);
        // создаем объект для рендеринга сцены
        renderer = new THREE.WebGLRenderer();
        // установка размеров
        renderer.setSize(window.innerWidth, window.innerHeight);
        // встраиваем в DOM-структуру страницы
        document.body.appendChild(renderer.domElement);
    }
    // функция анимации
    function animate() {

        requestAnimationFrame(animate);
        // вращение меша вокруг осей
        mesh.rotation.x += 0.03;
        mesh.rotation.y += 0.02;
        mesh2.rotation.x -= 0.04;
        mesh2.rotation.y -= 0.05;
        mesh3.rotation.x += 0.04;
        mesh3.rotation.z += 0.03;
        mesh4.rotation.y += 0.005;

        // рендеринг сцены - метод, производящий по сути отрисовку
        renderer.render(scene, camera);
    }
}
