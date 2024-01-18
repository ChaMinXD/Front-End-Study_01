const toDoForm = document.querySelector(".toDoForm");
const toDoBtn=document.querySelector(".toDoBtn");
const toDoNum=document.querySelector(".toDoNum");
const toDoNumInput = document.querySelector(".toDoImport")
const toDoInput = document.querySelector(".toDoInput");
const toDos = document.querySelector(".toDos");
const TODOLIST="toDoList"
let toDoList=[];
function saveToDoList() {
  localStorage.setItem(TODOLIST, JSON.stringify(toDoList));
}
function delToDo(event) {
  const { target: button } = event;
  const li = button.parentNode;
  console.log(li)
  toDos.removeChild(li);

  toDoList = toDoList.filter((toDo) => toDo.id !== Number(li.id)); 
  saveToDoList();
  console.log(toDoList)
}

function saveToDo(toDo,imp_num,now_time) { // todo 정보 저장
  console.log(toDo)
  const toDoObj = {
    list:{
      text: toDo,
      num:imp_num,
      time:now_time,
    },
    id: toDoList.length + 1,
  };
  console.log(JSON.stringify(toDoObj));
  toDoList.push(toDoObj);
  console.log(JSON.stringify(toDoList));

  saveToDoList();
} 

function radioChecked(event){  // 중요도별 게시물보기
  console.log(event.target.value);
  let import_num=event.target.value;
  if(import_num==="완료")
    import_num="0";
  //기존에 떠있던거 지우기
  while (toDos.firstChild) {
    toDos.removeChild(toDos.firstChild);
  }
  //local 불러오기
  const loadToDoList=localStorage.getItem(TODOLIST);
  if(loadToDoList!==null&&loadToDoList!==undefined){
    // 이전 정보 존재
    const parsedToDoList=JSON.parse(loadToDoList);
    parsedToDoList.sort(function(a,b){
      if(a.list.num>b.list.num) return -1;
      if(a.list.num===b.list.num){
        if(a.list.time>b.list.time) return 1;
        if(a.list.time===b.list.time) return 0;
        if(a.list.time<b.list.time) return -1;
      }
      if(a.list.num<b.list.num) return 1;
    });
    for(let toDo of parsedToDoList){
      const list=toDo.list;
    
        if(import_num==="전체"){
          paintToDo(list.text,list.num,toDo.id);
        }
        else{
          if(import_num===list.num){
            paintToDo(list.text,list.num,toDo.id);

          }
        }
  }
}
}
function paintToDo(toDo,num,id) { // todolist 그리기
  const li = document.createElement("li");
  const span = document.createElement("span");
  const span2 = document.createElement("span");
  const delButton = document.createElement("button");
  delButton.innerText = "삭제하기";
  delButton.addEventListener("click", delToDo);

  span.innerHTML = toDo;
  if(num==="0"){
    num="완료";
  }
  span2.innerHTML = num;
  li.appendChild(span);
  span.className="toDo_text";
  span.addEventListener("click",function(){
    handleToDoTextClick(toDo);
  });
  li.appendChild(span2);
  li.appendChild(delButton);
  li.id=id;
  toDos.appendChild(li);
}

function redraw(){ // 다시 그리는 함수
  while (toDos.firstChild) {
    toDos.removeChild(toDos.firstChild);
  }
  toDoList=loadToDoList();
  renderToDoList();
}

function handleToDoTextClick(toDo){ // 클릭시 중요도 완료로 변경
  const getData=localStorage.getItem(TODOLIST);
  const dt=JSON.parse(getData);
  for(let a of dt){
    if(a.list.text==toDo){
      a.list.num="0";
      console.log(a.list.text);
      console.log(toDo);
      }
    }
    localStorage.setItem(TODOLIST,JSON.stringify(dt));
    redraw();
  }


function createToDo(event) {  // 엔터 및 버튼클릭시
  event.preventDefault();
  const toDo = toDoInput.value;
  const num=toDoNumInput.value;
  const date=new Date();
  const time=date.getTime();
  if(num==""){
    const def="1";
    saveToDo(toDo,def,time);
    redraw();
  }
  else{
    saveToDo(toDo,num,time);
    redraw()
  }
  toDoInput.value = "";
  toDoNumInput.value = "";
}

function renderToDoList(){  //기존 데이터 불러오기
    for(let toDo of toDoList){
      const list=toDo.list;
      paintToDo(list.text,list.num,toDo.id);     
    }
  
}
function loadToDoList() {   //데이터 가져오기 및 Sorting
  const loadedList=localStorage.getItem(TODOLIST);
  const parsedToDoList=JSON.parse(loadedList);

  if(loadedList!==null&&loadedList!==undefined){
    // 이전 정보 존재
    parsedToDoList.sort(function(a,b){
      
      if(a.list.num>b.list.num) return -1;
      if(a.list.num===b.list.num){
        if(a.list.time>b.list.time) return 1;
        if(a.list.time===b.list.time) return 0;
        if(a.list.time<b.list.time) return -1;
      }
      if(a.list.num<b.list.num) return 1;
    });
  }
  console.log(loadedList)
  return parsedToDoList ? parsedToDoList : [];
}
function init() {
  //localStorage.clear();
  toDoList=loadToDoList();
  renderToDoList();
  toDoForm.addEventListener("submit", createToDo);
  toDoNum.addEventListener("submit",createToDo);
  toDoBtn.addEventListener("click",createToDo);
  
}
init();