
function getUserId(){
   let userId= localStorage.getItem("userId")

  if(!userId){
    userId=Math.floor(100000 + Math.random() * 900000);
    localStorage.setItem("userId",userId);
  }
  return userId
}
