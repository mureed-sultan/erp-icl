<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html ng-app="myApp">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="icon" href='<c:url value="/resources/img/favicon.ico" />' type="image/x-icon">
<title>Customer Portal</title>
<!-- BOOTSTRAP STYLES-->
<!-- " rel="stylesheet" /> -->
<!-- FONTAWESOME STYLES-->
<%-- <link href="<c:url value="/resources/css/font-awesome.css"/>" rel="stylesheet" /> --%>
<!-- CUSTOM STYLES-->
<%--    <link href="<c:url value="/resources/css/custom.css"/>" rel="stylesheet" /> --%>
<!-- GOOGLE FONTS-->
<!-- <script
	src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js">
</script> -->
<script	src="<c:url value="/resources/js/angular.min.js"/>"></script>
<!-- <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.8/angular-route.js"></script> -->

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">

<style>
    body {
        margin: 0;
        overflow: hidden;
        font-family: 'Arial', sans-serif;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background: radial-gradient(circle at center, #064fc5, #020c3c 100%) center/cover no-repeat;
    }

    canvas {
        position: absolute;
        top: 0;
        left: 0;
        pointer-events: none;
        /* Ensure pointer events do not interfere with background canvas */
    }
    p, i{
      color: white;
    }
    #globeCanvas {
        position: absolute;
        top: 0;
        right: 0;
        left: auto;
        width: 50%;
        height: 100%;
        z-index: -1;
        transform: translateX(100%);
    }

    #loginform {
        position: absolute;
        left: 0%;
        text-align: center;
        color: white;
        font-size: 18px;
        width: 45%;
        transform: translateX(-100%);

    }

    #loginform input {
        width: 80%;
        padding: 10px;
        margin: 8px 0;
        box-sizing: border-box;
        font-size: 16px;
        border-radius: 15px 5px 15px 5px;
        outline: none;
        transition-duration: .3s;
    }    
     #loginform input:focus, #loginform input:hover {
        border-radius: 0px 0 0px 0;

    }

    #loginform a {
        color: white;
        text-decoration: none;
    }

    #loginBtn {
        position: relative;
        overflow: hidden;
        background-color: transparent;
        color: white;
        border: none;
        border-radius: 15px 0 15px 0;
        padding: 10px 30px;
        border: 1px solid white;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }
    
    #loginBtn::before {
        content: "";
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: white;
        color: black;
        transition: left 0.3s ease;
    }
    
    #loginBtn:hover::before {
        left: 0;
        z-index: -1;
    }
    
    #loginBtn:hover {
        background-color: transparent;
        color: black;
        
    }
    
    .move-button {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    p.input-title{
        margin: 0;
        text-align: start;
        margin-left: 50px;
    }
    .forgot-password, .create-account{
        margin-top: 1rem;
        margin-bottom: 1rem;
    }

    @keyframes slideInFromRight {
      0% {
          transform: translateX(100%);
          opacity: 0;
      }
      100% {
          transform: translateX(0);
          opacity: 1;
      }
  }
  
  @keyframes slideInFromLeft {
      0% {
          transform: translateX(-100%);
          opacity: 0;
      }
      100% {
          transform: translateX(0);
          opacity: 1;
      }
  }
  
  #loginform, #globeCanvas {
      animation: slideInFromLeft 1s ease-out forwards;
  }
  
  #loginform {
      animation-delay: 0.5s;
  }
  
  #globeCanvas {
      animation: slideInFromRight 1s ease-out forwards;
  }
  
    
</style>
</head>

<!-- <input type='text' id='username' name='username' value=''  placeholder="Username"> -->

<body>

  
  <div id="globeCanvas"></div>
<script type="module">
  import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';
  import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js';

  let scene, camera, renderer;
  let controls;
  const group = new THREE.Group();

  init();
  animate();

  function init() {
      camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 4000);
      camera.position.z = 800;

      scene = new THREE.Scene();
      scene.background = null; // Remove background
      scene.add(group);
      let w = window.innerHeight;
      console.log(w)
      const helper = new THREE.Mesh(new THREE.IcosahedronGeometry(410, 6), new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true }));
      group.add(helper);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.outputEncoding = THREE.sRGBEncoding;

      const globeCanvas = document.getElementById('globeCanvas');
      globeCanvas.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.minDistance = 800;
      controls.maxDistance = 3000;
      controls.enableDamping = true;
      controls.enablePan = false;

      window.addEventListener('resize', onWindowResize);
  }

  function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function animate() {
      controls.update();
      requestAnimationFrame(animate);
      render();
  }

  function render() {
      group.rotation.y += 0.001;
      renderer.render(scene, camera);
  }
</script>


<script>
  const canvas = document.getElementById('background');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const stars = [];

  for (let i = 0; i < 100; i++) {
      const angle = Math.random() * Math.PI * 2; // Random angle for movement
      const speed = Math.random() * 1 + 0.5; // Varying speeds between 0.5 and 1.5
      stars.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          radius: Math.random() * 3 + 1, // Varying sizes between 1 and 4
          blink: Math.random() < 0.05, // Adjust this probability for slower blinking
          angle,
          speed,
      });
  }

  function drawStars() {
      for (const star of stars) {
          // Blinking logic
          if (Math.random() < 0.002) { // Adjust this probability for slower blinking
              star.blink = !star.blink;
          }

          if (star.blink) {
              ctx.beginPath();
              ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
              ctx.fillStyle = 'white';
              ctx.fill();
          }
      }
  }

  function updatePositions() {
      for (const star of stars) {
          // Update positions based on angle and speed
          star.x += Math.cos(star.angle) * star.speed;
          star.y += Math.sin(star.angle) * star.speed;

          // Wrap around the canvas
          if (star.x > canvas.width + star.radius) {
              star.x = -star.radius;
          }
          if (star.x < -star.radius) {
              star.x = canvas.width + star.radius;
          }
          if (star.y > canvas.height + star.radius) {
              star.y = -star.radius;
          }
          if (star.y < -star.radius) {
              star.y = canvas.height + star.radius;
          }
      }
  }

  function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update positions
      updatePositions();

      // Draw stars
      drawStars();

      requestAnimationFrame(draw);
  }

  draw();



  const loginButton = document.getElementById('loginBtn');
  const loginForm = document.getElementById('loginform');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');

  loginButton.addEventListener('mouseenter', () => {
      if (usernameInput.value === '' || passwordInput.value === '') {
          moveButtonRandomly();
      }
  });

  loginButton.addEventListener('mouseleave', () => {
      if (usernameInput.value === '' && passwordInput.value === '') {
          moveButtonRandomly();
      }
  });

  usernameInput.addEventListener('input', () => {
      moveButtonToOriginalPosition();
  });

  passwordInput.addEventListener('input', () => {
      moveButtonToOriginalPosition();
  });
  function moveButtonRandomly() {

      const canvasWidth = window.innerWidth;
      const canvasHeight = window.innerHeight;

      const maxX = canvasWidth - loginButton.clientWidth;
      const maxY = canvasHeight - loginButton.clientHeight;

      const moveDistanceX = Math.max(0, Math.min(Math.random() * maxX, maxX));
      const moveDistanceY = Math.max(0, Math.min(Math.random() * maxY, maxY));

      // Ensure the button stays within the left and top boundaries
      const leftBoundary = 0;
      const topBoundary = 0;

      const finalX = Math.min(leftBoundary + moveDistanceX, maxX) / 2;
      const finalY = Math.min(topBoundary + moveDistanceY, maxY) / 2;

      console.log(finalX, finalY);
      console.log(canvasWidth, canvasHeight);

      loginButton.style.transform = `translate(${finalX}px, ${finalY}px)`;
  }



  function moveButtonToOriginalPosition() {
      loginButton.style.transform = 'translate(0, 0)';
  }


</script>
</body>
</html>