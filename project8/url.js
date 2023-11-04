const inputLink=document.querySelector(".input-link")
const shortenBtn=document.querySelector(".shorten-btn")
const linkContainer=document.querySelector(".link-list-container")
const baseUrl="https://urlshortener-m778.onrender.com/urls" //api link
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

window.onload = function(){
  loadData()
}
shortenBtn.addEventListener("click",function(){
 

  
  let error=document.querySelector(".error") //check for empty input
  if(inputLink.value==="") 
  {
    error.innerText=" Please enter a link"
    inputLink.style.border="thin solid red"
    shortenBtn.style.border="thin solid red"
  return
  }
  else
  {
    error.innerText=""
    inputLink.style.border="none"
    shortenBtn.style.border="none"
        
  }
 
  createShortUrl({
    "fullUrl":inputLink.value,
    userId: getUserId()
  })
  .then(function (data) {
    if(data.status === 200){
      loadData()
    }
  })
  .catch(function (error) { // .then runs if its success , .catch runs error part.
  console.log('Request failed', error);
  });


})




function createRow(fullLink, shortUrlId){ //array of objects - each array contains 2 objects full n short
  
  let link=document.createElement('div');
  link.classList.add("linkList");

  let linkItem=document.createElement('li');

  linkItem.innerText= fullLink// set/returns value
  link.appendChild(linkItem)

  let shortLink=document.createElement('div'); //container thatll store shortern links
  shortLink.classList.add('shorternLink');
  link.appendChild(shortLink); //inside the div.
 
  let shortItem=document.createElement('a'); 


 shortItem.innerText= `${baseUrl}/${shortUrlId}`
 shortItem.href=`${baseUrl}/${shortUrlId}` //set/returns the link value
 shortItem.target = "_blank"; //opens in new tab


  shortLink.appendChild(shortItem)
  linkContainer.appendChild(link);

  // let copyBtn= document.createElement('button')
  // copyBtn.innerHTML="copy" 
  // copyBtn.classList.add("copyLink")
  // link.appendChild(copyBtn) // since it goes inside the div
  let deleteBtn= document.createElement('button') 
  deleteBtn.innerHTML=`<i class="fa-solid fa-trash-can"></i>` 
  deleteBtn.classList.add("deleteTask") 
  link.appendChild(deleteBtn) 

  deleteBtn.addEventListener('click',function(){

    deleteShortUrl(shortUrlId)
    .then(function (data) {
      if(data.status === 200){
        console.log("1")
        loadData()
        console.log("3")

      }
    })


  })


  
}
function displayData(data){
  linkContainer.innerHTML='' 
  for(let i=0;i< data.length;i++){ //loops through array of objects
    createRow(data[i].full, `${data[i].short}`)
  }
  inputLink.value=""
}

function getUrls(userId){
  return fetch(`${baseUrl}?userId=${userId}`, { 
    method: 'get',
    headers
  })
}

function createShortUrl(urlObj){
  return fetch(baseUrl, { 
    method: 'post',
    headers,
    body: JSON.stringify(urlObj)
  })
}

function loadData(){
  //spinner.display:block
  getUrls(getUserId()).then(function(res) // fetch is promise based hence we use .then(here)
  { return res.json(); }) //since its no possible to access the body we use res.json which again returns promise hence we use another then
  .then(function (data) {
    displayData(data)
    console.log("2") //spinnner.display:none
  })
  .catch(function (error) { // then runs if its success , catch runs error part.
  console.log('Request failed', error);
  });
}

function deleteShortUrl(shortUrlId){
 
  return fetch(`${baseUrl}/${shortUrlId}`, 
  {
    method: 'delete',
    headers
  })
}
