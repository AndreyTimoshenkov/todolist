const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const taskList = document.querySelector('#taskList');
const emptyList = document.querySelector('#emptyList');

let tasks = [];

function addTask(event) {

    event.preventDefault();

    const taskText = taskInput.value;

    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false,
    }
    tasks.push(newTask);

    saveToLS();

    visualiseTask(newTask);

    taskInput.value = '';

    taskInput.focus();

    checkIfIsEmpty();

};

function deleteTask(event) {
    if (event.target.dataset.action !== 'delete') return;

    const parentNode = event.target.closest('li');

    const id = Number(parentNode.id);

    tasks = tasks.filter((task) => task.id !== id);

    parentNode.remove();

    saveToLS();

    checkIfIsEmpty();
};

function markAsDone(event) {
    if (event.target.dataset.action !== 'done') return;

    const parentNode = event.target.closest('li');

    parentNode.querySelector('.task-title').classList.toggle('task-title--done');

    const id = Number(parentNode.id);

    const task = tasks.find(function (task) {
        return task.id === id
    });

    task.done = !task.done;

    saveToLS();
};

function checkIfIsEmpty() {
    if (tasks.length === 0) {
        const emptyListMarkUp = `<li id="emptyList" class="list-group-item empty-list">
                                <h1>🥳</h1>
                                <div class="empty-list__title">Список дел пуст</div>
                                </li>`;
        taskList.insertAdjacentHTML('afterbegin', emptyListMarkUp);
    } else {
        const emptyListElement = document.querySelector('#emptyList');
        if (emptyListElement) {
            emptyListElement.remove()
        };
    }
};

function saveToLS() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
};

function visualiseTask(task) {
    const cssClass = task.done ? 'disabled' : 'task-title';
    const tagName = task.done ? "del" : "span";

    const taskMarkUp = `
                    <li id ="${task.id} "class="list-group-item d-flex ${cssClass} justify-content-between task-item">
                        <${tagName}>${task.text}</${tagName}>
                        <div class="task-item__buttons">
                            <button type="button" data-action="done" class="btn-action">
                            ✅
                            </button>
                            <button type="button" data-action="delete" class="btn-action">
                            🗑
                            </button>
                        </div>
                    </li>`;
    taskList.insertAdjacentHTML('beforeend', taskMarkUp);
};

form.addEventListener('submit', addTask);
taskList.addEventListener('click', deleteTask);
taskList.addEventListener('click', markAsDone);

document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded and parsed");

    if (localStorage.getItem('tasks')) {
        tasks = JSON.parse(localStorage.getItem('tasks'));

        tasks.forEach(function (task) {
            visualiseTask(task);
        });
    };

    checkIfIsEmpty();
});