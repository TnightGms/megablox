// Usuarios guardados en localStorage
let users = JSON.parse(localStorage.getItem("megabloxUsers")) || [];

// Crear superadmin si no existe
if(!users.find(u=>u.username==="admin")){
  users.push({username:"admin", password:"Ancor289", role:"superadmin"});
  localStorage.setItem("megabloxUsers", JSON.stringify(users));
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

// Panel y insignia WebP
function showPanel(user){
  auth.style.display="none";
  panel.style.display="block";

  let badge = (user.role==="admin" || user.role==="superadmin") ? 
              `<img src="assets/AdminICON.webp" width="20" alt="Admin Icon">` : "";

  userDisplay.innerHTML = `${user.username} (${user.role}) ${badge}`;

  if(user.role==="admin" || user.role==="superadmin") adminPanel.style.display="block";
}
