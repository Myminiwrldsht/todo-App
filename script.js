const form = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

// Load tasks on page load
document.addEventListener("DOMContentLoaded", loadTasks);

// Submit form
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    addTask(taskText);
    saveTask(taskText);
    taskInput.value = "";
  }
});

function addTask(text) {
  const li = document.createElement("li");
  li.innerHTML = `
    <span>${text}</span>
    <div>
      <button onclick="completeTask(this)">✅</button>
      <button onclick="deleteTask(this)">🗑️</button>
    </div>
  `;
  taskList.appendChild(li);
}

function completeTask(button) {
  const task = button.parentElement.parentElement.querySelector("span");
  task.classList.toggle("done");
}

function deleteTask(button) {
  const li = button.parentElement.parentElement;
  const taskText = li.querySelector("span").textContent;
  taskList.removeChild(li);
  removeTask(taskText);
}

// Storage functions
function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(taskToRemove) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((task) => task !== taskToRemove);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(addTask);
}
