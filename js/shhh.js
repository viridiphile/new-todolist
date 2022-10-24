window.addEventListener('load', () => {
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    form = document.querySelector("#new-task-form");
    input = document.querySelector("#new-task-input");

    const nameInput = document.querySelector('#name');
    const username = localStorage.getItem('username') || '';

    nameInput.value = username;//it will output whatever is in our local storage

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

        localStorage.setItem('todos', JSON.stringify(todos));

        //Resetting the form
        e.target.reset();

        DisplayTodos();
    })
})

function DisplayTodos() {
    const list_el = document.querySelector("#tasks");
    const task_el = document.createElement("div"); 
        //allows us to create a dom element
        task_el.classList.add("task");//adds a class

        const task_content_el = document.createElement("div");
        task_content_el.classList.add("content");

        task_el.appendChild(task_content_el);

        const task_input_el = document.createElement("input");

        task_input_el.classList.add("text");
        task_input_el.type = "text";
        task_input_el.value = todo;
        task_input_el.setAttribute("readonly", "readonly");

        task_content_el.appendChild(task_input_el);

        const task_actions_el = document.createElement("div");
        task_actions_el.classList.add("actions");

        const task_edit_el = document.createElement("button");
        task_edit_el.classList.add("edit");
        task_edit_el.innerHTML = "Edit";

        const task_delete_el = document.createElement("button");
        task_delete_el.classList.add("delete");
        task_delete_el.innerHTML = "Delete";

        //appending buttons
        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);

        task_el.appendChild(task_actions_el);

        list_el.appendChild(task_el);

        input.value = "";

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
        })
        // EDIT
        task_edit_el.addEventListener('click', () => {
            if(task_edit_el.innerText.toLocaleLowerCase() == "edit"){
                task_input_el.removeAttribute("readonly");
                task_input_el.focus();
                task_edit_el.innerText = "Save";
            } else {
                task_input_el.setAttribute("readonly", "readonly");
                task_edit_el.innerText = "Edit";
            }
        })

        // DELETE
        task_delete_el.addEventListener('click', () => {
            // list_el.removeChild(task_el);
            if(confirm("Are you sure you want to delete this task?")){
                list_el.removeChild(task_el);
            }
        })
}