$(document).ready(function () {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function renderTasks() {
    $("#taskList").empty();
    tasks.forEach((task, index) => {
      $("#taskList").append(`
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <span class="task-text" data-index="${index}">${task}</span>
          <div>
            <button class="btn btn-sm btn-warning edit-btn me-2" data-index="${index}">Edit</button>
            <button class="btn btn-sm btn-danger delete-btn" data-index="${index}">Delete</button>
          </div>
        </li>
      `);
    });
  }

  function addTask(task) {
    tasks.push(task);
    saveTasks();
    renderTasks();
  }

  function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }

  function editTask(index, newTask) {
    tasks[index] = newTask;
    saveTasks();
    renderTasks();
  }

  $("#addTaskBtn").on("click", function () {
    const task = $("#taskInput").val().trim();
    if (task) {
      addTask(task);
      $("#taskInput").val("");
    }
  });

  $("#taskList").on("click", ".delete-btn", function () {
    const index = $(this).data("index");
    deleteTask(index);
  });

  $("#taskList").on("click", ".edit-btn", function () {
    const index = $(this).data("index");
    const currentTask = tasks[index];
    const newTask = prompt("Edit task:", currentTask);
    if (newTask !== null && newTask.trim() !== "") {
      editTask(index, newTask.trim());
    }
  });

  renderTasks();
});
