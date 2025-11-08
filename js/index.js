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
        <td style="text-decoration: ${Todo[i].completed ? "line-through" : "none"
      }; color: ${Todo[i].completed ? "#aaa" : "#000000ff"};">
          
          <span id="taskname${i}">${Todo[i].name}</span>
          <input type="text" id="edittext${i}" value="${Todo[i].name}" style="display:none">
        </td>
        <td>
        <button id="edit${i}" class="edit" onclick="editTask(${i})">Edit</button>
        <button style="display:none" class="save" id="save${i}" onclick="saveTask(${i})">Save</button>
        </td>
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
  let editText = document.getElementById(`edittext${index}`);
  let saveButton = document.getElementById(`save${index}`);
  let editButton = document.getElementById(`edit${index}`);
  let taskname = document.getElementById(`taskname${index}`);
  taskname.style.display = "none";
  editText.style.display = "block";
  editText.focus();
  editButton.style.display = "none";
  saveButton.style.display = "inline-block";
}

function saveTask(index) {

  let editText = document.getElementById(`edittext${index}`);
  let newText = editText.value.trim();
  if (newText !== "") {
    Todo[index].name = newText;
  }
  display()
}

function deleteTask(index) {
  if (confirm(`Are you sure you want to delete "${Todo[index].name}"?`)) {
    Todo = Todo.filter((_, i) => i !== index)
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