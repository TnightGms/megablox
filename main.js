// Usuarios guardados en localStorage
let users = JSON.parse(localStorage.getItem("megabloxUsers")) || [];

// Crear superadmin si no existe
if(!users.find(u=>u.username==="admin")){
  users.push({username:"admin", password:"Ancor289", role:"superadmin"});
  localStorage.setItem("megabloxUsers", JSON.stringify(users));
}

// Juegos precargados
const preloadedGames = [
  {name:"Isla Aventura", creator:"admin", blocks:[
    {x:0,y:0,z:0,color:0xff0000},{x:1,y:0,z:0,color:0x00ff00},{x:0,y:1,z:0,color:0x0000ff}
  ]},
  {name:"Ciudad Bloques", creator:"admin", blocks:[
    {x:0,y:0,z:0,color:0xffff00},{x:1,y:0,z:0,color:0xff00ff},{x:0,y:1,z:1,color:0x00ffff}
  ]}
];

if(!localStorage.getItem("megabloxGames")){
  localStorage.setItem("megabloxGames", JSON.stringify(preloadedGames));
}

// Login
function login(){
  const u = username.value;
  const p = password.value;
  const user = users.find(us=>us.username===u && us.password===p);
  if(!user) return alert("Usuario o contraseña incorrectos");
  localStorage.setItem("megabloxCurrentUser", JSON.stringify(user));
  showPanel(user);
}

// Registro
function register(){
  const u = username.value;
  const p = password.value;
  if(users.find(us=>us.username===u)) return alert("Usuario ya existe");
  const user = {username:u, password:p, role:"user"};
  users.push(user);
  localStorage.setItem("megabloxUsers", JSON.stringify(users));
  alert("Usuario registrado");
}

// Mostrar panel + insignia WebP
function showPanel(user){
  auth.style.display="none";
  panel.style.display="block";

  let badge = (user.role==="admin" || user.role==="superadmin") ? 
              `<img src="assets/AdminICON.webp" width="20" alt="Admin Icon">` : "";

  userDisplay.innerHTML = `${user.username} (${user.role}) ${badge}`;

  if(user.role==="admin" || user.role==="superadmin") adminPanel.style.display="block";

  loadGames();
}

// Cargar lista de juegos
function loadGames(){
  const games = JSON.parse(localStorage.getItem("megabloxGames")) || [];
  const div = document.getElementById("gameList");
  div.innerHTML="";
  games.forEach((g,i)=>{
    div.innerHTML += `<div class="gameCard">
      <h3>${g.name}</h3>
      <p>Creador: ${g.creator}</p>
      <button onclick="playGame(${i})">Jugar</button>
    </div>`;
  });
}

function playGame(index){
  const games = JSON.parse(localStorage.getItem("megabloxGames")) || [];
  localStorage.setItem("currentGame", JSON.stringify(games[index]));
  window.location="game.html";
}
