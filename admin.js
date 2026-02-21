function makeAdmin(){
  const name = adminId.value;
  let user = users.find(u=>u.username===name);
  if(!user) return alert("Usuario no encontrado");
  user.role = "admin";
  localStorage.setItem("megabloxUsers", JSON.stringify(users));
  alert(name + " ahora es admin");
}
