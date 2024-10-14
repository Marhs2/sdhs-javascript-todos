const $ = (element) => document.querySelector(element);
const $$ = (element) => [...document.querySelectorAll(element)];

const $input = $(".new-todo");
const $toDoBox = $(".todo-list");
const $ToggleAll = $("#toggle-all"); // toggleAll
const $ToDoCount = $(".todo-count"); // todoCount
const $Filters = $(".filters");
const $filterItems = $$(".filters li a");
const $Main = $(".main");
const $clearBtn = $(".clear-completed");

function createToDo() {
  if (!$input.value.trim()) {
    alert("입력하세요");
  } else {
    const newTodo = document.createElement("li");
    newTodo.innerHTML = `
      <div class="view">
        <input class="toggle" type="checkbox" />
        <label>${$input.value}</label>
        <button class="destroy"></button>
      </div>
    `;

    $toDoBox.appendChild(newTodo);
    $input.value = "";

    change();
    DelFun();
    AddCompleted();
    UpdatToDoCount();
    ifToDo();
  }
}

function DelFun() {
  const $delButtons = document.querySelectorAll(".destroy");
  $delButtons.forEach((button) => {
    button.addEventListener("click", () => {
      button.parentNode.parentNode.remove();
      UpdatToDoCount();
    });
  });
}

function AddCompleted() {
  const $CompleteBtn = document.querySelectorAll(".toggle");
  $CompleteBtn.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.checked) {
        button.parentNode.parentNode.classList.add("completed");
      } else {
        button.parentNode.parentNode.classList.remove("completed");
      }
      completeAll();
      UpdatToDoCount();
      change();
    });
  });
}

function ifToDo() {
  const mainChildNode = $Main.childNodes[3];
  $toDoBox.children.length == 0
    ? (mainChildNode.style.display = "none")
    : (mainChildNode.style.display = "block");
}

function completeAll() {
  Array.from($toDoBox.children).forEach((element) => {
    $ToggleAll.addEventListener("click", (e) => {
      if ($ToggleAll.checked == true) {
        element.classList.add("completed");
        element.children[0].childNodes[1].checked = true;
      } else {
        element.classList.remove("completed");
        element.children[0].childNodes[1].checked = false;
      }
      UpdatToDoCount();
    });

    if (element.children[0].childNodes[1].checked == false) {
      $ToggleAll.checked = false;
    }
  });
  UpdatToDoCount();

}


function edit(e) {
  Array.from($toDoBox.children).forEach((Box) => {
    Box.addEventListener("dblclick", () => {
      if (!Box.classList.contains("editing")) {
        const editbox = document.createElement("input");
        editbox.type = "text";
        editbox.classList.add("edit");
        Box.classList.add("editing");
        Box.appendChild(editbox);
        const edit = Box.querySelector(".edit");

        edit.addEventListener("keypress", (e) => {
          if (e.keyCode === 13) {
            Box.childNodes[1].childNodes[3].textContent = edit.value;
            Box.classList.remove("editing");
            Box.classList.remove("checkDbClick");
            edit.remove();
          }
        });
      }
    });
  });
}

function UpdatToDoCount() {

  
  if ($toDoBox.children.length == 1 || $toDoBox.children.length == 0){
    $ToDoCount.childNodes[0].textContent = $toDoBox.children.length;
    $ToDoCount.childNodes[1].textContent = " item left";  
  }else{
    $ToDoCount.childNodes[0].textContent = $toDoBox.children.length;
    $ToDoCount.childNodes[1].textContent = " items left";
  }

  Array.from($toDoBox.children).forEach((element) => {
    if (element.classList.contains("completed")) {
      $ToDoCount.childNodes[0].textContent--;
    
    }

  });
}

function clearCompete() {
  $clearBtn.addEventListener("click", () => {
    Array.from($toDoBox.children).forEach((ToDos) => {
      if (ToDos.classList.contains("completed")) {
        ToDos.remove();
      }
    });
  });
}

window.addEventListener("hashchange", function () {
  $filterItems.forEach(($filterItem) => {
    if ($filterItem.hash == window.location.hash) {
      $filterItem.classList.add("selected");
    } else {
      $filterItem.classList.remove("selected");
    }
    change();
  });
});

function change() {
  Array.from($toDoBox.children).forEach((Box) => {
    if (window.location.hash == "#/active") {
      !Box.classList.contains("completed")
        ? (Box.style.display = "flex")
        : (Box.style.display = "none");
    } else if (window.location.hash == "#/completed") {
      Box.classList.contains("completed")  ? (Box.style.display = "flex") : (Box.style.display = "none");
    } else {
      Box.style.display = "flex";
    }
  });
}

$input.addEventListener("keypress", (e) => {
  if (e.keyCode !== 13) return;
  createToDo();
  completeAll();
  clearCompete();
  edit();
});

// -------먼저 실행------------

clearCompete();

completeAll();

UpdatToDoCount();

AddCompleted();

DelFun();

ifToDo();

// window.addEventListener('hashchange',function(){

//   $filterItems.forEach( $filterItem => {
//     const methodName = $filterItem.hash === window.location.hash ? 'add' : 'remove';
//     const check = $filterItem.hash === window.location.hash ;
//     $filterItem.classList[methodName]('selected')

//   });
// })

// 1. object안에 add 메소드가 있다
// 2. object안에 sub 메소드가 있다
// 3. 만약에 조건이 true 이면 sub 메소드를 실행 하고
// 4. 만약에 조건이 false 이면 add 메소드를 실행 하고

// const object = {
//   one: 1,
//   two: 4,
//   add(){
//     console.log('add 실행');
//   },

//   sub(){
//     console.log('sub 실행');
//   },

//   print(str) {
//     console.log(str);;
//   }
// }

// const condition = false;
// if(!condition){
//   object.sub()
// }else {
//   object.add()
// }

// !condition ? object.sub() : object.add();a

// object[!condition ? 'sub' : 'add']()
