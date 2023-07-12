const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const taskList = document.querySelector('#taskList');
const emptyList = document.querySelector('#emptyList');

function addTask(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    const newTask = {
        id: Date.now(),
        text: data.get("taskInput"),
        done: false,
    }

    localStorage.setItem(newTask.id, JSON.stringify(newTask));

    visualiseTask(newTask);

    event.target.reset();

};

function deleteTask(event) {
    if (event.target.dataset.action !== 'delete') return;

    const parentNode = event.target.closest('li');

    parentNode.remove();

    localStorage.removeItem(parentNode.id);

    checkIfIsEmpty();
};

/**
 * @param {PointerEvent<HTMLButtonElement>} event 
 */
function markAsDone(event) {
    console.log(event.target.constructor);

    if (event.target.dataset.action !== 'done') return;

    const parentNode = event.target.closest('li');

    parentNode.classList.toggle('disabled');

    const task = JSON.parse(localStorage.getItem(parentNode.id));

    task.done = !task.done;

    localStorage.setItem(task.id, JSON.stringify(task));

};

function checkIfIsEmpty() {
    if (localStorage.length === 0) {
        taskList.innerHTML = `<li id="emptyList" class="list-group-item empty-list">
            <h1>🥳</h1>
            <div class="empty-list__title">Список дел пуст</div>
            </li>`;
    } else {
        const emptyListElement = document.getElementById('emptyList');
        if (emptyListElement) {
            emptyListElement.remove()
        };
    }
};

function visualiseTask(task) {
    const cssClass = task.done ? 'disabled' : 'task-title';
    const template = document.getElementById("item-template").innerHTML;

    const taskMarkUp = template
        .replace("{{ID}}", task.id)
        .replace("{{CSS_CLASS}}", cssClass)
        .replace("{{TEXT}}", task.text);

    taskList.insertAdjacentHTML('beforeend', taskMarkUp);
};

form.addEventListener('submit', addTask);
taskList.addEventListener('click', deleteTask);
taskList.addEventListener('click', markAsDone);

document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded and parsed");

    for (let i = 0; i < localStorage.length; i++) {
        const task = JSON.parse(localStorage.getItem(localStorage.key(i)));

        visualiseTask(task);
    };

    checkIfIsEmpty();
});