const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
const syncButton = document.querySelector('.popUp-container');

document.addEventListener('DOMContentLoaded',getTodos);
document.addEventListener('DOMContentLoaded',genQrcode);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

function addTodo(event) {
    event.preventDefault();

    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    saveLocal(todoInput.value);

    //Check button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = "<i class='fa fa-check'></i>";
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //Delete button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = "<i class='fa fa-trash'></i>";
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);

    todoInput.value = "";
}


function deleteCheck(event) {
    const item = event.target;
    //Delete
    if(item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function() {
            todo.remove();
        });
    }
    //Check
    if(item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(event) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch(event.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}


function saveLocal(todo) {
    let todos;
    if(localStorage.getItem('todos') === null){
        todos =[];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos() {
    let todos;
    if(localStorage.getItem('todos') === null){
        todos =[];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo) {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");

        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        //Check button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = "<i class='fa fa-check'></i>";
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        //Delete button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = "<i class='fa fa-trash'></i>";
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos =[];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}


function genQrcode() {
        //Generate QR Code
        const qrCode = new QRCodeStyling({
            width: 148,
            height: 148,
            data: "gieri",
            dotsOptions: {
                color: "black",
                type: "square"
            },
            backgroundOptions: {
                color: "white",
            }
        });
        qrCode.append(document.getElementById("canvas"));
}

//Hide and show QR Code
function syncTodos(todo){
    event.preventDefault();
    if (syncButton.style.display === "none") {
        syncButton.style.display = "flex";
    } else {
        syncButton.style.display = "none";
    }
}