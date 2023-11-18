const inputLink=document.querySelector(".input-link");
const shortenBtn=document.querySelector(".shorten-btn");
const linkContainer=document.querySelector(".link-list-container");
const spinner=document.querySelector(".loader");

const paginationContainer = document.querySelector(".pagination"); 
const prevButton = document.getElementById("prev"); // prev button
const pageNumbers = document.querySelector(".pageNumbers"); // btwn prev and next
const nextButton = document.getElementById("next"); //  next button

const baseUrl="https://urlshortener-m778.onrender.com/urls" ;//api link
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}



window.onload = function(){
  loadData(1)
}

function shortBtn(){
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
      loadData(1)
    }
  })
  .catch(function (error) { 
  console.log('Request failed', error);
  });

}
shortenBtn.addEventListener("click",shortBtn)



function createRow(fullLink, shortUrlId){

  
  let link=document.createElement('div');
  link.classList.add("linkList"); //list

  let linkItem=document.createElement('li'); //fullurl
  linkItem.classList.add("fulllinks"); //list


  linkItem.innerText= fullLink// set/returns value
  link.appendChild(linkItem) //append to list

  let shortLink=document.createElement('div'); //container thatll store shortern links
  shortLink.classList.add('shorternLink');
  link.appendChild(shortLink); //inside the div.
 
  let shortItem=document.createElement('a'); //creates anchorlinks


 shortItem.innerText= `${baseUrl}/${shortUrlId}`
 shortItem.href=`${baseUrl}/${shortUrlId}` //set/returns the link value
 shortItem.target = "_blank"; //opens in new tab


  shortLink.appendChild(shortItem)
  linkContainer.appendChild(link);

  let deleteBtn= document.createElement('button') 
  deleteBtn.innerHTML=`<i class="fa-solid fa-trash-can"></i>` 
  deleteBtn.classList.add("deleteTask") 
  link.appendChild(deleteBtn) 

  deleteBtn.addEventListener('click',function(){
    

    deleteShortUrl(shortUrlId)
    .then(function (data) {
      if(data.status === 200){

        loadData(1)
        
      }

    })
    .catch(function (error) { 

      console.log('Request failed', error);
      });

  })
}

function displayData(data){
  linkContainer.innerHTML='' //not to repeat the entire list (double etc...)
  if(data.length==0){
    paginationContainer.style.display="none"
  }
  else{
    paginationContainer.style.display="flex"

  }
  for(let i=0;i< data.length;i++){ 
    createRow(data[i].full, `${data[i].short}`)
  }
  inputLink.value=""
}


function getUrls(userId,offset){
  const limit= Number(document.querySelector(".page-no").value) || 10;
  return fetch(`${baseUrl}?userId=${userId}&limit=${limit}&offset=${offset}`, {
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

function loadData(offset){
  spinner.style.display="block";
  getUrls(getUserId(),offset).then(function(res) 
  { return res.json(); }) 
  .then(function (data) {
    
    displayData(data.shortUrls)
    getPageNumbers(data.totalCount, offset)
    spinner.style.display="none";

  })
  .catch(function (error) { 

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



function displayPageNumbers (index , offset, last=false){
  const pageNumber = document.createElement("a");
  pageNumber.innerText = index;
  pageNumber.setAttribute("index", index);
  if(index==offset){
    pageNumber.classList.add("active")
  }
  if(last){
    pageNumber.setAttribute("position", "last");
  }
  pageNumbers.appendChild(pageNumber);
};

function getPageNumbers(count , offset){


  const limit= Number(document.querySelector(".page-no").value) || 10;


  const pageCount = Math.ceil(count /limit);

  pageNumbers.innerHTML='' //not to repeat the number list (double etc...)

  for(let i=1; i <= pageCount; i++){
      displayPageNumbers(i,offset, pageCount==i?true:false);
  };
};

paginationContainer.addEventListener('click', function(e){
  let activeElement=document.querySelector(".pageNumbers a.active")


  let activeElementIndex=Number(activeElement.getAttribute("index"))



  if(e.target.tagName.toLowerCase() === 'a'){
    const offset = e.target.getAttribute("index")
    const lastElement = e.target.getAttribute("position")
    if(activeElementIndex!=offset){
      loadData(offset)
    }
    if(offset==1){
      prevButton.disabled=true;
    }
    else{
      prevButton.disabled=false;
    }
   if(lastElement=="last"){
    nextButton.disabled=true
   }
   else{
    nextButton.disabled=false;
   }
   
  }

  
  
  else if(e.target.id=="prev"){
    let prevPage=activeElementIndex-1
    nextButton.disabled=false;

    if(prevPage>0){
      loadData(prevPage)
    }
    if(prevPage==1){
       prevButton.disabled=true;
    }
    else{
      prevButton.disabled=false;
    }

  }
  else if(e.target.id=="next"){
    let nextPage=activeElementIndex+1
    let lastPage=(activeElement.getAttribute("position"))
    prevButton.disabled=false;
    if(lastPage!="last"){
      loadData(nextPage)
    }
  let lastElement=document.querySelector(".pageNumbers a[position='last']")
  if(nextPage==lastElement.getAttribute("index")){
    nextButton.disabled=true;
  }

  }
  
})

