const inputLink=document.querySelector(".input-link")
const shortenBtn=document.querySelector(".shorten-btn")
const linkContainer=document.querySelector(".link-list-container")

shortenBtn.addEventListener("click",function(){
  const url="https://urlshrtener.vercel.app/shortUrls"
  
  let error=document.querySelector(".error")
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

  fetch(url, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "fullUrl":inputLink.value
    })
    })
    .then(function(res){ return res.json(); })
    .then(function (data) {
      linkContainer.innerHTML=''
      for(let i=0;i< 5;i++){
        createRow(data[i].full, `https://urlshrtener.vercel.app/${data[i].short}`)
      }
    
    inputLink.value=""
    })
    .catch(function (error) {
    console.log('Request failed', error);
    });


})

function createRow(fullLink, shortLinkUrl){
  
  let link=document.createElement('div');
  link.classList.add("linkList");

  let linkItem=document.createElement('li');

  linkItem.innerText= fullLink// set/returns value
  link.appendChild(linkItem)

  let shortLink=document.createElement('div');
  shortLink.classList.add('shorternLink');
  link.appendChild(shortLink); //inside the div.
 
  let shortItem=document.createElement('a');


 shortItem.innerText=shortLinkUrl
 shortItem.href=shortLinkUrl
 shortItem.target = "_blank";


  shortLink.appendChild(shortItem)
  // link.appendChild(shortItem)
  linkContainer.appendChild(link);

  // let copyBtn= document.createElement('button')
  // copyBtn.innerHTML="copy" 
  // copyBtn.classList.add("copyLink")
  // link.appendChild(copyBtn) // since it goes inside the div

  
}
