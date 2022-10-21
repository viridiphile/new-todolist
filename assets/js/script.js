window.addEventListener('load', () => {
    const nameInput = document.querySelector('#name');
    const username = localStorage.getItem('username') || '';

    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const list_el = document.querySelector("#tasks");

    nameInput.value = username;

    nameInput.addEventListener('change', (e) => {
        localStorage.setItem('username', e.target.value);
    })

    form.addEventListener('submit', (e) => {
        e.preventDefault(); //prevents page from reloading/refreshing

        const task = input.value;
        if(!task) {
            alert("Please fill out the task");
            return;
        }

        const task_el = document.createElement("div"); 
        //allows us to create a dom element
        task_el.classList.add("task");//adds a class

        const task_content_el = document.createElement("div");
        task_content_el.classList.add("content");

        task_el.appendChild(task_content_el);

        const task_input_el = document.createElement("input");

        task_input_el.classList.add("text");
        task_input_el.type = "text";
        task_input_el.value = task;
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
    })
})