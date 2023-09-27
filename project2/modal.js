
let modalBtn = document.getElementById("modal-btn") 
let container = document.getElementById("modal-container")
let closeBtn = document.getElementById("close-btn")


modalBtn.addEventListener("click",function(){
  container.style.display="block";
});

closeBtn.addEventListener("click",function(){
  container.style.display="none";
});

window.addEventListener("click",function(e){
  if(e.target===container){
    container.style.display="none";
  }
});