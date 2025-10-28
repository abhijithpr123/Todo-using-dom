let Todo = [];
let filterType = "all"; 

document.getElementById("add").addEventListener("click", () => {
  let task = document.getElementById("task").value.trim();

  if (task === "") return alert("Enter your task name");

  Todo.unshift({ name: task, completed: false });
  document.getElementById("task").value = "";
  display();
});

function display() {
  let str = "";
  for (let i = 0; i < Todo.length; i++) {

    if (
      (filterType === "completed" && !Todo[i].completed) ||
      (filterType === "pending" && Todo[i].completed)
    ) {
      continue;
    }

    str += `
      <tr>
        <td>${i + 1}</td>
        <td>
          <input type="checkbox" 
            ${Todo[i].completed ? "checked" : ""} 
            onchange="toggleTask(${i})">
        </td>
        <td style="text-decoration: ${
          Todo[i].completed ? "line-through" : "none"
        }; color: ${Todo[i].completed ? "#aaa" : "#000000ff"};">
          ${Todo[i].name}
        </td>
        <td><button id="edit" onclick="editTask(${i})">Edit</button></td>
        <td><button id="delete" onclick="deleteTask(${i})">Delete</button></td>
      </tr>
    `;
  }
  document.getElementById("display").innerHTML = str;
}


function toggleTask(index) {
  Todo[index].completed = !Todo[index].completed;
  display();
}


function editTask(index) {
  let newTask = prompt("Edit task:", Todo[index].name);
  if (newTask && newTask.trim() !== "") {
    Todo[index].name = newTask.trim();
    display();
  }
}

function deleteTask(index) {
  if (confirm(`Are you sure you want to delete "${Todo[index].name}"?`)) {
    let newTodo = [];
    for (let i = 0; i < Todo.length; i++) {
      if (i !== index) newTodo.push(Todo[i]);
    }
    Todo = newTodo;
    display();
  }
}


let buttons = document.querySelectorAll(".filter button");

for (let btn of buttons) {
  btn.addEventListener("click", () => {
    filterType = btn.textContent.toLowerCase();
    for (let b of buttons) b.classList.remove("active");
    btn.classList.add("active");
    display();
  });
}