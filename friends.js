const current = JSON.parse(localStorage.getItem("megabloxCurrentUser")).username;
let friends = JSON.parse(localStorage.getItem("friends_"+current)) || [];

function showFriends(){
  const ul = document.getElementById("friendList");
  ul.innerHTML="";
  friends.forEach(f=>{
    let user = users.find(u=>u.username===f);
    let badge = (user && (user.role==="admin"||user.role==="superadmin")) ? `<img src="assets/AdminICON.webp" width="15">` : "";
    ul.innerHTML += `<li>${f} ${badge}</li>`;
  });
}

function addFriend(){
  const name = document.getElementById("friendName").value;
  if(!name || friends.includes(name)) return;
  friends.push(name);
  localStorage.setItem("friends_"+current, JSON.stringify(friends));
  showFriends();
}

showFriends();
