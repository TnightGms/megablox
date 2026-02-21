async function login(){
  const res = await fetch("/api/login", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({ username:username.value, password:password.value })
  });
  if(!res.ok) return alert("Error");
  const user = await res.json();
  localStorage.setItem("user", JSON.stringify(user));
  showPanel(user);
}

async function register(){
  await fetch("/api/register", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({ username:username.value, password:password.value })
  });
  alert("Registrado");
}

function showPanel(user){
  auth.style.display="none";
  panel.style.display="block";
  userDisplay.innerText = user.username + " (" + user.role + ")";
  if(user.role==="admin" || user.role==="superadmin"){
    adminPanel.style.display="block";
  }
}