const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const checkSound = document.getElementById("checkSound");

// Listen for form submission
taskForm.addEventListener("submit", function (e) {
  e.preventDefault(); // prevent page refresh
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    addTask(taskText);
    taskInput.value = ""; // clear input
  }
});

// Function to add a new task
function addTask(taskText, completed=false) {
  const li = document.createElement("li");
  li.classList.add("task");

  // Create the custom checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("check");
  checkbox.checked = completed;

  // Task text
  const span = document.createElement("span");
  span.textContent = taskText;

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete");
  deleteBtn.textContent = "🗑";

  // Checkbox toggles completion
  checkbox.addEventListener("change", () => {
    li.classList.toggle("completed");
    saveTasks();
    checkSound.currentTime = 0;
    checkSound.play();
  });

  // Delete button removes task
  deleteBtn.addEventListener("click", () => {
    li.remove();
    saveTasks();
    checkEmpty();
  });
  if (completed) li.classList.add("completed");

  // Assemble task
  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  saveTasks();
  checkEmpty();
}
window.addEventListener("load", () => {
  const saved = JSON.parse(localStorage.getItem("tasks")) || [];
  saved.forEach((task) => addTask(task.text, task.completed));
});
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#task-list .task").forEach((li) => {
    const text = li.querySelector("span").textContent;
    const completed = li.querySelector("input").checked;
    tasks.push({ text, completed });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function checkEmpty() {
  const msg = document.getElementById("empty-message");
  const hasTasks = document.querySelectorAll("#task-list .task").length > 0;
  msg.style.display = hasTasks ? "none" : "block";
}
function clearAllTasks() {
  const confirmClear= confirm("Are you sure you want to clear all tasks?");
  if (confirmClear){
  // Remove all task elements
  document.getElementById("task-list").innerHTML = "";

  // Clear from localStorage
  localStorage.removeItem("tasks");

  // Show empty message
  checkEmpty();
}
}

