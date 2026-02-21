const canvas = document.getElementById("gameCanvas");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000);
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.set(0,5,10);
const light = new THREE.HemisphereLight(0xffffff,0x444444);
scene.add(light);
const grid = new THREE.GridHelper(50,50);
scene.add(grid);

let blocks = [];

// Crear bloques al click
document.addEventListener("click", ()=>{
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshStandardMaterial({color: Math.random()*0xffffff});
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(Math.floor(Math.random()*10-5),0,Math.floor(Math.random()*10-5));
  scene.add(cube);
  blocks.push({x:cube.position.x,y:cube.position.y,z:cube.position.z,color:material.color.getHex()});
});

function animate(){ requestAnimationFrame(animate); renderer.render(scene,camera); }
animate();

// Guardar mundo
function saveWorld(){
  const user = JSON.parse(localStorage.getItem("megabloxCurrentUser")).username;
  localStorage.setItem("world_"+user, JSON.stringify(blocks));
  alert("Mundo guardado");
}

// Cargar mundo
function loadWorld(){
  const user = JSON.parse(localStorage.getItem("megabloxCurrentUser")).username;
  const saved = JSON.parse(localStorage.getItem("world_"+user)) || [];
  saved.forEach(b=>{
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({color:b.color});
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(b.x,b.y,b.z);
    scene.add(cube);
    blocks.push(b);
  });
  alert("Mundo cargado");
}
