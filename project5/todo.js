
const inputTask=document.getElementById("input-task") 
const addTaskbtn= document.getElementById("add-task")
const taskContainer= document.getElementById("task-container")

addTaskbtn.addEventListener("click",function(){
  let task=document.createElement('div'); //creating div to store the task
  task.classList.add("taskList"); // creating class name to the div
  let listItem= document.createElement('li') //creating list of tasks
  listItem.innerText=`${inputTask.value}` //to display the inputed task
  task.appendChild(listItem) // append the list to stored task

  let checkBtn= document.createElement('button') // creating a check button
  checkBtn.innerHTML=`<i class="fa-solid fa-check"></i>` // check symbol
  checkBtn.classList.add("checkTask") //class name
  task.appendChild(checkBtn) // since it goes inside the div

  let deleteBtn= document.createElement('button') // delete button
  deleteBtn.innerHTML=`<i class="fa-solid fa-trash-can"></i>` //delete symbol
  deleteBtn.classList.add("deleteTask") // class name
  task.appendChild(deleteBtn) // inside div


  if (inputTask.value===""){
    alert('Pleast enter a Task'); // empty list return alert msg
  }else{
    taskContainer.appendChild(task); // container that shows the task list and two buttons
  }

  inputTask.value="" //to clear the placeholder


  checkBtn.addEventListener('click',function(){ // creating event listener to the check button
    checkBtn.parentElement.style.textDecoration="line-through" ;// has to strike through the taskdiv which is one level up the listitem (listitem is inside div)
  })

  deleteBtn.addEventListener('click',function(){ // creating event listener to the delete button
    deleteBtn.parentElement.remove(); ;// has to remove the task from taskdiv 
  })
})