const $ = (element) => document.querySelector(element);
const $$ = (element) => [...document.querySelectorAll(element)];

const $input = $(".new-todo");
const $toDoBox = $(".todo-list");
const $ToggleAll = $("#toggle-all"); // toggleAll
const $ToDoCount = $(".todo-count"); // todoCount
const $Filters = $(".filters");
const $filterItems = $$(".filters li a");
const $main = $(".main");
const $clearBtn = $(".clear-completed");

function createToDo() {
  if ($input.value === "") {
    alert("입력하세요");
  } else {
    $toDoBox.innerHTML += `
    <li>
      <div class="view">
        <input class="toggle" type="checkbox" />
        <label>${$input.value}</label>
        <button class="destroy"></button>
      </div>
      </li>
    `;
    $input.value = "";
  }
  UpdatToDoCount();
  ifToDo();
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
      if (button.parentNode.parentNode.classList.contains("completed")) {
        button.parentNode.parentNode.classList.remove("completed");
      } else {
        button.parentNode.parentNode.classList.add("completed");
      }
    });
  });
}

function ifToDo() {
  const mainChildNode = $main.childNodes[3];
  $toDoBox.children.length == 0
    ? (mainChildNode.style.display = "none")
    : (mainChildNode.style.display = "block");
}

ifToDo();

function completeAll() {
  $ToggleAll.addEventListener("click", () => {
    Array.from($toDoBox.children).forEach((element) => {
      if ($ToggleAll.checked == true) {
        element.classList.add("completed");
        element.children[0].childNodes[1].checked = true;
      } else {
        element.classList.remove("completed");
        element.children[0].childNodes[1].checked = false;
      }
    });
  });
}

function UpdatToDoCount() {
  $ToDoCount.childNodes[0].textContent = $toDoBox.children.length;
  console.log($toDoBox.children.length);
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

window.addEventListener("hashchange", function () {
  $filterItems.forEach(($filterItem) => {
    if ($filterItem.hash == window.location.hash) {
      $filterItem.classList.add("selected");
    } else {
      $filterItem.classList.remove("selected");
    }
  });
});

window.addEventListener("hashchange", () => {
  Array.from($toDoBox.children).forEach((Box) => {
    if (window.location.hash == "#/active") {
      !Box.classList.contains("completed")
        ? (Box.style.display = "flex")
        : (Box.style.display = "none");
    } else if (window.location.hash == "#/completed") {
      Box.classList.contains("completed")
        ? (Box.style.display = "flex")
        : (Box.style.display = "none");
    } else {
      Box.style.display = "flex";
    }
  });
});

// window.addEventListener('hashchange',function(){

//   $filterItems.forEach( $filterItem => {
//     const methodName = $filterItem.hash === window.location.hash ? 'add' : 'remove';
//     const check = $filterItem.hash === window.location.hash ;
//     $filterItem.classList[methodName]('selected')

//   });
// })

$input.addEventListener("keypress", (e) => {
  if (e.keyCode !== 13) return;
  ifToDo();
  createToDo();
  AddCompleted();
  DelFun();
  completeAll();
  clearCompete();
});

// -------먼저 실행------------
clearCompete();

completeAll();

AddCompleted();

DelFun();
