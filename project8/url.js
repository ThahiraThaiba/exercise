const inputLink=document.querySelector(".input-link")
const shortenBtn=document.querySelector(".shorten-btn")
const linkContainer=document.querySelector(".link-list-container")

shortenBtn.addEventListener("click",function(){
  let link=document.createElement('div');
  link.classList.add("linkList");

  let linkItem=document.createElement('li');

  linkItem.innerText= `${inputLink.value}`
  link.appendChild(linkItem)

  let copyBtn= document.createElement('button')
  copyBtn.innerHTML="copy" 
  copyBtn.classList.add("copyLink")
  link.appendChild(copyBtn) // since it goes inside the div


  let error=document.querySelector(".error")
  if(inputLink.value==="")
  {
    error.innerText=" Please enter a link"
    error.style.color="red"
    error.style.margin="75px 50px"
    error.style.fontSize="0.8rem"
    inputLink.style.border="thin solid red"
    shortenBtn.style.border="thin solid red"

  }
  else
  {
    error.innerText=""
    inputLink.style.border="none"
    shortenBtn.style.border="none"
    linkContainer.appendChild(link);
        
  }
    
  inputLink.value=""
})