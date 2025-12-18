

let addBtn = document.getElementById("addBtn");
let taskInput = document.getElementById("taskInput");
let taskList = document.getElementById("taskList");

let text = JSON.parse(localStorage.getItem("tasks")) || [];

function showTask(texts, index) {

    let ul = document.createElement("ul");
    ul.className = "list-group";

    let li = document.createElement("li");
    li.className = "list-group-item mb-2";
    li.style.color = "balck";
    li.style.fontSize = "20px";
    li.style.backgroundColor = "gray";

    let span = document.createElement("span");
    span.innerText = texts;
    li.appendChild(span);

    // delete
    let deleteBtn = document.createElement("button");
    deleteBtn.className = "float-end btn btn-danger btn-sm ms-2";
    deleteBtn.innerHTML = '<i class="bi bi-trash"></i>';
    li.appendChild(deleteBtn);

    deleteBtn.addEventListener("click", function () {
        text.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(text));
        location.reload();
    });

    // edit
    let editBtn = document.createElement("button");
    editBtn.className = "btn btn-warning btn-sm me-2 float-end";
    editBtn.innerHTML = '<i class="bi bi-pencil-square"></i>';
    li.appendChild(editBtn);

    editBtn.addEventListener("click", function () {
        let newTask = prompt("Edit Your task", texts);
        if (newTask && newTask.trim() !== "") {
            text[index] = newTask;
            localStorage.setItem("tasks", JSON.stringify(text));
            span.innerText = newTask;
        }
    });

    ul.appendChild(li);
    taskList.appendChild(ul);
}

// add task
addBtn.addEventListener("click", function () {
    let taskText = taskInput.value;

    if (taskText === "") {
        alert("Please enter your task");
        return;
    }

    text.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(text));
    showTask(taskText, text.length - 1);
    taskInput.value = "";
});

// reload
window.onload = function () {
    taskList.innerHTML = "";
    text.forEach(function (task, index) {
        showTask(task, index);
    });
};
