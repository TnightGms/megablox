function loadForum(){
  const msgs = JSON.parse(localStorage.getItem("megabloxForum")) || [];
  const div = document.getElementById("messages");
  div.innerHTML="";
  msgs.forEach(m=>{
    let badge = (m.role==="admin"||m.role==="superadmin") ? `<img src="assets/AdminICON.webp" width="15">` : "";
    div.innerHTML += `<p><b>${m.user}:</b> ${badge} ${m.text}</p>`;
  });
}

function sendMsg(){
  const user = JSON.parse(localStorage.getItem("megabloxCurrentUser")).username;
  const role = JSON.parse(localStorage.getItem("megabloxCurrentUser")).role;
  const text = document.getElementById("msg").value;
  if(!text) return;
  const msgs = JSON.parse(localStorage.getItem("megabloxForum")) || [];
  msgs.push({user, role, text});
  localStorage.setItem("megabloxForum", JSON.stringify(msgs));
  document.getElementById("msg").value="";
  loadForum();
}

loadForum();
