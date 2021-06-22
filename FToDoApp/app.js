//Seçiçiler
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listener
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


//Fonksiyonlar

function addTodo(event) {
    //form submitini engellemeye yarıyor.
    event.preventDefault();
    //Todo Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //Li oluşturma
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //Localstorage'a todo eklemek
    saveLocalTodos(todoInput.value);
    //Tamamlandı butonu
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"><i>';
    completedButton.classList.add('completed-btn');
    todoDiv.appendChild(completedButton);
    //Silme butonu
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"><i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    //Listeye ekleme
    todoList.appendChild(todoDiv);
    //İnput değerini sıfırlama
    todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;
    // SİLME İŞLEMİ 
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        //Silme Animasyonu
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove();
        });
    }

    //Yapıldı işareti
    if (item.classList[0] === 'completed-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        const mStyle = todo.style;
        if (mStyle != undefined && mStyle != null) {
            switch (e.target.value) {
                case "all":
                    mStyle.display = "flex";
                    break;
                case "completed":
                    if (todo.classList.contains('completed')) {
                        mStyle.display = 'flex';
                    } else {
                        mStyle.display = "none";
                    }
                    break;
                case "uncompleted":
                    if (todo.classList.contains('completed')) {
                        mStyle.display = 'none';
                    }
                    else {
                        mStyle.display = "flex";
                    }
                    break;
            }
        }
    })
}

function saveLocalTodos(todo) {
    //Localstorage kontrolü
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    //Localstorage kontrolü
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function (todo) {
        //Todo Div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        //Li oluşturma
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //Tamamlandı butonu
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"><i>';
        completedButton.classList.add('completed-btn');
        todoDiv.appendChild(completedButton);
        //Silme butonu
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"><i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);
        //Listeye ekleme
        todoList.appendChild(todoDiv);
    });
}

//Todo'ları Localstorage'dan silmek
function removeLocalTodos(todo){
    //Localstorage kontrolü
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos", JSON.stringify(todos));
}