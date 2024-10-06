const $input = document.querySelector('.new-todo');
const $toDoBox = document.querySelector('.todo-list');

function createToDo() {
    if ($input.value === '') {
        alert('입력하세요');
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
        $input.value = '';
    }
}

function DelFun() {
    const $delButtons = document.querySelectorAll('.destroy');
    $delButtons.forEach((button) => {
        button.addEventListener('click', () => {
            button.parentNode.parentNode.remove()
        });
    });
}

function AddCompleted() {
    const $CompleteBtn = document.querySelectorAll('.toggle');
    $CompleteBtn.forEach((button) => {
        button.addEventListener('click', () => {
            if(button.parentNode.parentNode.classList.contains('completed')){
                button.parentNode.parentNode.classList.remove('completed')
            }else{
                button.parentNode.parentNode.classList.add('completed')
            }
            
        });
    });
}
$input.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
        createToDo();
        AddCompleted()
        DelFun()
    }
});
// -------먼저 실행------------
AddCompleted()
DelFun()