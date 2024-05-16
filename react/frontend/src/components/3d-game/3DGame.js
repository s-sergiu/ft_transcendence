
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

function Game3D() {

	let renderer;
	let scene;
	let camera;
	let planeMaterial;
	let plane;
	let paddleMaterial;
	let paddleGeometry;
	let rightPaddle;
	let leftPaddle;
	let sphereGeo;
	let sphereMaterial;
	let sphere;
	let controls;
	let clock;
	let delta;
	let paddleCenterDistance;
	let ballVelocity = new THREE.Vector3(0, 0, 0);


	//assigned
	let boardWidth = 40;
	let boardHeight = 30;
	let halfBoardWidth = boardWidth / 2;
	let halfBoardHeight = boardHeight / 2;
	let thickness = 1;
	let paddleLength = 4;
	let paddleWidth = 1;
	let halfPaddleLength = paddleLength / 2;
	let distance = 5;
	let radius = 0.3;
	let paddleSpeed = 20;
	let randomSpeed = 20.0;

	//perspective camera
	let fov = 40;
	let near = 0.1;
	let far = 1000;

	//Paddle moves
	let leftPaddleMoveUp = false;
	let leftPaddleMoveDown = false;
	let rightPaddleMoveUp = false;
	let rightPaddleMoveDown = false;

	function initScene() {
		renderer = new THREE.WebGLRenderer({canvas: document.getElementById('canvas'), antialias: true});
		renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(renderer.domElement);
		renderer.setClearColor(0x0000FF);
		renderer.shadowMap.enabled = true;
		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera(
				fov,
				window.innerWidth / window.innerHeight,
				near,
				far
				);
		camera.position.set(0, -55, 30);
		camera.lookAt(0, 0, 0);
		controls = new OrbitControls(camera, renderer.domElement);
	}

	function initPlane(){
		let planeGeo =  new THREE.PlaneGeometry(boardWidth, boardHeight);
		planeMaterial = new THREE.MeshStandardMaterial({
			color: 0xFFFFFF,
			side: THREE.DoubleSide});
		plane = new THREE.Mesh(planeGeo, planeMaterial);
		plane.receiveShadow = true;
		scene.add(plane);
	}


	function initBall(){
		sphereGeo = new THREE.SphereGeometry(radius);
		sphereMaterial = new THREE.MeshStandardMaterial({color: 0xFF0000});
		sphere = new THREE.Mesh(sphereGeo, sphereMaterial);
		sphere.castShadow = true;
		scene.add(sphere);
		resetBall();
	}

	function resetBall(){
		sphere.position.set(0, 0, radius);
		let randomAngle = Math.random() * Math.PI * 2; //random angle in radians
		ballVelocity.set(Math.cos(randomAngle) * randomSpeed, Math.sin(randomAngle) * randomSpeed);
	}

	function initPaddle(){
		paddleGeometry = new THREE.BoxGeometry(paddleWidth, paddleLength, thickness);
		paddleMaterial =  new THREE.MeshBasicMaterial({color: 0x00FF00});
		leftPaddle = new THREE.Mesh(paddleGeometry, paddleMaterial);
		rightPaddle = new THREE.Mesh(paddleGeometry, paddleMaterial);
		rightPaddle.position.set(halfBoardWidth - distance,0, thickness/2);
		leftPaddle.position.set(-(halfBoardWidth - distance),0, thickness/2);
		leftPaddle.castShadow = true;
		leftPaddle.receiveShadow = true;
		rightPaddle.castShadow = true;
		rightPaddle.receiveShadow = true;
		scene.add(leftPaddle);
		scene.add(rightPaddle);
	}

	function initLights(){
		//ambient
		let ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.7);
		scene.add(ambientLight);
		//Hemisphere
		let hemisphereLight = new THREE.HemisphereLight(0xFFFFFF, 0x003300);
		scene.add(hemisphereLight);
		//directional
		let directionLight = new THREE.DirectionalLight(0xFFFFFF/2, 0.7);
		directionLight.position.set(0, 0, radius/2);
		directionLight.castShadow = true;
		scene.add(directionLight);
	}


	function init(){
		initScene();
		initPlane();
		initLights();
		initPaddle();
		initBall();
	}

	function handleKeyDown(event){
		switch (event.code){
			case 'ArrowUp':
				rightPaddleMoveUp = true;
				break;
			case 'ArrowDown':
				rightPaddleMoveDown = true;
				break;
			case 'KeyW':
				leftPaddleMoveUp = true;
				break;
			case 'KeyS':
				leftPaddleMoveDown = true;
				break;
		}
	}

	function handleKeyUp(event){
		switch (event.code){
			case 'ArrowUp':
				rightPaddleMoveUp = false;
				break;
			case 'ArrowDown':
				rightPaddleMoveDown = false;
				break;
			case 'KeyW':
				leftPaddleMoveUp = false;
				break;
			case 'KeyS':
				leftPaddleMoveDown = false;
				break;
		}
	}

	function onWindowResize(){
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
	}

	function addEventListners(){
		window.addEventListener('keydown', handleKeyDown);
		window.addEventListener('keyup', handleKeyUp);
		window.addEventListener('resize', onWindowResize);
	}

	function initVariables(){
		clock = new THREE.Clock();
	}

	function updatePaddles(){
		if (leftPaddleMoveUp){
			leftPaddle.position.y += paddleSpeed * delta;
			leftPaddle.position.y = Math.min(halfBoardHeight - halfPaddleLength, leftPaddle.position.y);
		}
		if (leftPaddleMoveDown){
			leftPaddle.position.y -= paddleSpeed * delta;
			leftPaddle.position.y = Math.max(-halfBoardHeight + halfPaddleLength, leftPaddle.position.y);
		}
		if (rightPaddleMoveUp){
			rightPaddle.position.y += paddleSpeed * delta;
			rightPaddle.position.y = Math.min(halfBoardHeight - halfPaddleLength, rightPaddle.position.y);
		}
		if (rightPaddleMoveDown){
			rightPaddle.position.y -= paddleSpeed * delta;
			rightPaddle.position.y = Math.max(-halfBoardHeight + halfPaddleLength, rightPaddle.position.y);
		}
	}

	paddleCenterDistance = halfBoardWidth - distance - paddleWidth / 2;
	function leftPaddleCollision(){
		return (sphere.position.y + radius >= leftPaddle.position.y - halfPaddleLength &&
			sphere.position.y - radius <= leftPaddle.position.y + halfPaddleLength &&
			sphere.position.x - radius <= leftPaddle.position.x + paddleWidth / 2 &&
			ballVelocity.x < 0);
	}

	function rightPaddleCollision(){
		return (sphere.position.y + radius >= rightPaddle.position.y - halfPaddleLength &&
			sphere.position.y - radius <= rightPaddle.position.y + halfPaddleLength &&
			sphere.position.x + radius >= rightPaddle.position.x - paddleWidth / 2 &&
			ballVelocity.x > 0);
	}

	function collisionDetection(){
		//moving towards the left paddle
		if (leftPaddleCollision()) {
			const collisionPoint = (sphere.position.y - radius - (leftPaddle.position.y + halfPaddleLength)) / paddleLength;
			const angle = Math.PI / 3 * collisionPoint;
			const xComponent = Math.cos(angle) * -ballVelocity.x - Math.sin(angle) * ballVelocity.y;
			const yComponent = Math.sin(angle) * -ballVelocity.x + Math.cos(angle) * ballVelocity.y;
			ballVelocity.set(xComponent, yComponent);
		}
		//moving towards the right paddle
		else if (rightPaddleCollision()) {
			const collisionPoint = (sphere.position.y + radius - (rightPaddle.position.y + halfPaddleLength)) / paddleLength;
			const angle = -(Math.PI / 3 * collisionPoint) + Math.PI;
			const xComponent = Math.cos(angle) * -ballVelocity.x - Math.sin(angle) * ballVelocity.y;
			const yComponent = Math.sin(angle) * -ballVelocity.x + Math.cos(angle) * ballVelocity.y;
			ballVelocity.set(xComponent, yComponent);
		}
	}

	function updateBall(delta){
		sphere.position.x += ballVelocity.x * delta;
		sphere.position.y += ballVelocity.y * delta;

		if (sphere.position.x <= -halfBoardWidth + radius || sphere.position.x >= halfBoardWidth - radius) {
			resetBall();
		}
		if (sphere.position.y >= halfBoardHeight - radius) {
			ballVelocity.y *= -1;
			sphere.position.y =  halfBoardHeight - radius;
		} else if (sphere.position.y <= -halfBoardHeight + radius) {
			ballVelocity.y *= -1;
			sphere.position.y = -halfBoardHeight + radius;
		}
	}

	function animateGame(){
		delta = clock.getDelta();
		updatePaddles();
		collisionDetection();
		updateBall(delta);
		controls.update();
		renderer.render(scene, camera);
	}

	function play(){
		initVariables();
		init();
		addEventListners();
		renderer.setAnimationLoop(animateGame);
	}
	return (
		  <div>
		  <Form className="d-flex">
            <Button onClick = { e => play()} variant="outline-success">Play</Button>
          </Form>
		  <canvas id="canvas"></canvas>
		  </div>
	);
}

export default Game3D;
