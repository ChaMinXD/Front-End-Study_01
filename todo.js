const toDoForm = document.querySelector(".toDoForm");
const toDoBtn=document.querySelector(".toDoBtn");
const toDoNum=document.querySelector(".toDoNum");
const toDoNumInput = document.querySelector(".toDoImport")
const toDoInput = document.querySelector(".toDoInput");
const toDos = document.querySelector(".toDos");

function paintToDo(toDo,num) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.id='todolist';
  const span2 = document.createElement("span");
  span2.id='import';
  span.innerHTML = toDo;
  span2.innerHTML = num;
  li.appendChild(span);
  li.appendChild(span2);
  toDos.appendChild(li);
}

function createToDo(event) {
  event.preventDefault();
  const toDo = toDoInput.value;
  const num=toDoNumInput.value;
  if(num==""){
    const def="1";
    paintToDo(toDo,def);
  }
  else{
    paintToDo(toDo,num);
  }
  console.log(toDo);
  console.log(num);

  toDoInput.value = "";
  toDoNumInput.value = "";
}

function init() {
  toDoForm.addEventListener("submit", createToDo);
  toDoNum.addEventListener("submit",createToDo);
  toDoBtn.addEventListener("click",createToDo);
  
}
init();