window.addEventListener('load', () => {
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    clearAll = document.querySelector(".clear-btn");

    const nameInput = document.querySelector('#name');
    const username = localStorage.getItem('username') || '';

    const form = document.querySelector("#new-todo-form");

    nameInput.value = username;
    //it will output whatever is in our local storage

    nameInput.addEventListener('change', (e) => {
        localStorage.setItem('username', e.target.value);
    })

    // IT ALL STARTS HERE
    form.addEventListener('submit', (e) => {
        e.preventDefault(); //prevents page from reloading/refreshing

        const todo = {
            content: e.target.elements.content.value,
            done: false,
            createdAt: new Date().getTime()
        }
        
        todos.push(todo);

        if(!todo.content) {
            alert("Please fill out the task");
            return;
        }

        localStorage.setItem('todos', JSON.stringify(todos));

        e.target.reset();

        DisplayTodos();
    })

    DisplayTodos();
})

function DisplayTodos() {
    const todoList = document.querySelector('#todo-list');
    todoList.innerHTML ='';

    todos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');

        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        const content = document.createElement('div');
        const actions = document.createElement('div');
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');
        
        input.type = 'checkbox';
        input.checked = todo.done;
        span.classList.add('bubble');

        content.classList.add('todo-content');
        actions.classList.add('actions');
        editButton.classList.add('edit');
        deleteButton.classList.add('delete');

        content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
        editButton.innerHTML = 'Edit';
        deleteButton.innerHTML = 'Delete';

        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(editButton);
        actions.appendChild(deleteButton);
        todoItem.appendChild(label);
        todoItem.appendChild(content);
        todoItem.appendChild(actions);

        todoList.appendChild(todoItem);

        if(todo.done) {
            todoItem.classList.add('done');
        }

        input.addEventListener('click', (e) => {
            todo.done = e.target.checked;
            localStorage.setItem('todos', JSON.stringify(todos));

            if (todo.done){
                todoItem.classList.add('done');
            } else {
                todoItem.classList.remove('done');
            }

            DisplayTodos();
        })

        editButton.addEventListener('click', (e) => {
            const input = content.querySelector('input');
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener('blur', (e) => { //element lost focus(aka click awaY)
                input.setAttribute('readonly', true);
                todo.content = e.target.value;
                localStorage.setItem('todos', JSON.stringify(todos));
                DisplayTodos()
            })
        })

        deleteButton.addEventListener('click', (e) => {
            if(confirm("Are you sure you want to delete this task?")){
                todos = todos.filter(t => t != todo);
                localStorage.setItem('todos', JSON.stringify(todos));
                DisplayTodos()
            }
        })

        clearAll.addEventListener("click", () => {
            todos.splice(0, todos.length);
            localStorage.setItem("todo-list", JSON.stringify(todos));
            DisplayTodos();
        });
    })
}