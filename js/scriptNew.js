const $ = (element) => document.querySelector(element)
const $$ = (element) => [...document.querySelectorAll(element)]
const getLocalStorge = (e) => JSON.parse(localStorage.getItem('save'))
const setItems = () => localStorage.setItems('save', JSON.stringify('save'))


const $todoList = $('.todo-list')
const $input = $('.new-todo')
const $todoCount = $('.todo-count')
const $footer = $('.footer')
const $main = $('.main')
const $toggleAll = $main.children[1]

const $data = getLocalStorge ?? { todo: {} }

function makeTodo() {
    $input.addEventListener('keypress', (e) => {
        if (e.key !== 'Enter') return
        if (!$input.value.trim()) return alert('입력하세요');
        const newTodo = document.createElement('li')
        newTodo.innerHTML = `
                <div class="view">
                    <input class="toggle" type="checkbox">
                    <label>${$input.value}</label>
                    <button class="destroy"></button>
                </div>
        `
        $input.value = ''
        $todoList.appendChild(newTodo)
    })
}

function toggleAll() {
    $toggleAll.addEventListener('click', () => {
        [...$todoList.children].forEach((e) => {
            const $toggleAllFor = e.querySelector('.toggle')
            e.classList.toggle('completed')
            $toggleAllFor.checked = !$toggleAllFor.checked
        })
    })
}

function toggleCompleted() {
    $todoList.addEventListener('click', (e) => {
        if (e.target.classList.contains('toggle'))
            e.target.closest('li').classList.toggle('completed')
        e.target.checked = !e.target.checked
    })
}

function delTodo() {
    $todoList.addEventListener('click', (e) => {
        if (e.target.classList.contains('destroy')) e.target.closest('li').remove()
    })
}

const observer = new MutationObserver((e) => {
    render()
})
// 이건 변화를 확인해서 render를 실행을 시키는것
observer.observe($todoList, {
    //이것은 $todoList에 변화가 있는 확인을 하는것
    childList: true,
    // 자식 요소에 변화가있는지 확인 하는것
    subtree: true,
    // 이것을 그 하위 요소의 변화를 확인하느것
    attributes: true,
    //이것을 class와 같은 것을 확인 하는것
    characterData: true
    // 이것을 텍스트가 변화가 있는 확인을 하는것
})

function render() {
    const $lengthCount = $todoList.children.length;
    [...$todoList.children].forEach((e) => {
        if (!e.classList.contains('completed')) $todoCount.innerHTML = $lengthCount === 1 ? `<strong>0</strong> item left ` : `<strong>0</strong> items left `; $todoCount.children[0].textContent = $lengthCount;
    })
    $footer.style.display = $toggleAll.style.display = $lengthCount === 0 ? "none" : "block";
    // 만약 아무것도 없으면 안보이s게 하는것
}

toggleAll()
render()
delTodo()
makeTodo()
toggleCompleted()