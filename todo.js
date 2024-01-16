const toDoForm = document.querySelector(".toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDos = document.querySelector(".toDos");

function paintToDo(toDo) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerHTML = toDo;
  li.appendChild(span);
  toDos.appendChild(li);
}

function createToDo(event) {
  event.preventDefault();
  const toDo = toDoInput.value;
  paintToDo(toDo);
  toDoInput.value = "";
}

function init() {
  toDoForm.addEventListener("submit", createToDo);
}
init();