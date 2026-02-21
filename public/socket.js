const socket = io();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 5;
const light = new THREE.HemisphereLight(0xffffff,0x444444);
scene.add(light);

const grid = new THREE.GridHelper(100,100);
scene.add(grid);

function animate(){
  requestAnimationFrame(animate);
  renderer.render(scene,camera);
}
animate();

document.addEventListener("mousemove", e=>{
  socket.emit("move",{x:e.clientX,y:e.clientY});
});