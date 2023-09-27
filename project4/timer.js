
const startStop=document.querySelector("#startstop")
const resetBtn=document.querySelector("#reset")

let seconds=0;
let minutes=0;
let hours=0;
 //variables for leading values

 let leadingSeconds=0;
 let leadingMinutes=0;
 let leadingHours=0;


 let timeInterval=null;
 let timeStatus="stopped";

function stopWatch(){
  seconds++;
  if(seconds/60===1){
    seconds=0;
    minutes++;

    if(minutes/60===1){
      minutes=0;
      hours++;
    }
  }

  if(seconds<10){
    leadingSeconds="0"+ seconds.toString();
  }else{
    leadingSeconds=seconds;
  }

  if(minutes<10){
    leadingMinutes="0"+ minutes.toString();
  }else{
    leadingMinutes=minutes;
  }

  if(hours<10){
    leadingHours="0"+ hours.toString();
  }else{
    leadingHours=hours;
  }
  let displayTimer=document.getElementById("timer").innerText = leadingHours +":" + leadingMinutes + ":" + leadingSeconds;
}

startStop.addEventListener("click", function(){
  if(timeStatus==="stopped"){
    timeInterval= window.setInterval(stopWatch,10);
    document.querySelector("#startstop").innerHTML= `<i class="fa-solid fa-pause" id="pause"></i>`
    timeStatus="started"

  }
  else {
    window.clearInterval(timeInterval);
    document.querySelector("#startstop").innerHTML= `<i class="fa-solid fa-play" id="play"></i>`
    timeStatus="stopped"

  }
})

resetBtn.addEventListener("click",function(){
  window.clearInterval(timeInterval);
  seconds=0;
  minutes=0;
  hours=0;

  document.querySelector('#timer').innerHTML="00:00:00"

})

//window.setInterval(stopWatch,1)
