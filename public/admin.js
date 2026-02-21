async function makeAdmin(){
  await fetch("/api/makeAdmin", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({ userId:adminId.value })
  });
  alert("Ahora es admin");
}