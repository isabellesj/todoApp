import "./scss/style.scss";
import { TodoItem } from "./models/TodoItem";

//SKAPA  ARRAY MHA. CLASS TODOITEM
const todoList = [
  new TodoItem("Top of the Rock"),
  new TodoItem("Blue Sky Deli"),
  new TodoItem("Eat bagels at Russ & Daughters"),
];

function main() {
  //FÅ FORMULÄRET ATT INTE SUBMITTA
  const form = document.getElementById("form");
    form.addEventListener("submit", (e) => {
    e.preventDefault();
  });
  
  document.querySelector("#form").addEventListener("submit", makeToDos);
  document.getElementById("sortButton").addEventListener("click", () => {
    sortTasks();
    makeToDos();
  });
  
  makeToDos();
}

//FUNKTION SOM TAR IN USER INPUT, SKAPAR NYTT OBJEKT OCH PUSHAR TILL ARRAYEN
function getNewTaskFromUser() {
  const taskFromUser = document.getElementById("userInput").value;

  if (taskFromUser === "") {
    return;
  }

  const newItem = new TodoItem(taskFromUser);
  todoList.push(newItem);
  localStorage.setItem("todoList", JSON.stringify(todoList) || "[]");
}

//SKAPA NYA TODOS MHA. FUNKTIONEN OVAN
function makeToDos() {
  const task = document.getElementById("task");
  task.innerHTML = "";

  getNewTaskFromUser();

  for (let i = 0; i < todoList.length; i++) {
    const newTask = document.createElement("li");
    newTask.classList = "newTask";
    const newTaskText = document.createElement("p");
    newTaskText.innerHTML = todoList[i].todo;

    const icon = document.createElement("p");
    icon.classList = "icon";
    icon.innerHTML = '<i class="fa-solid fa-xmark"></i>';

    checkTask(newTask, todoList[i]);

    icon.addEventListener("click", () => {
      deleteTask(i);
      makeToDos();
    });

    newTask.appendChild(newTaskText);
    newTask.appendChild(icon);
    task.appendChild(newTask);
    document.getElementById("userInput").value = "";
  }
}

//FUNKTION SOM KONTROLLERAR OM EN TASK ÄR GJORD ELLER EJ
function checkTask(newTaskText, todoItem) {
  if (todoItem.done) {
    newTaskText.classList.add("clicked");
  }

  newTaskText.addEventListener("click", () => {
    todoItem.done = !todoItem.done;
    newTaskText.classList.toggle("clicked");
    localStorage.setItem("todoList", JSON.stringify(todoList) || "[]");
  });
}

//FUNKTION SOM TAR BORT TASKS FRÅN DOM + ARRAY
function deleteTask(i) {
  todoList.splice(i, 1);
  localStorage.setItem("todoList", JSON.stringify(todoList) || "[]");
}

//FUNKTION SOM SORTERAR OM ORDNING EFTER OM TASKS ÄR GJORDA ELLER EJ
function sortTasks() {
  todoList.sort((a, b) => {
    if (a.done === true && b.done === false) {
      return 1;
    }
    if (a.done === false && b.done === true) {
      return -1;
    }
    return 0;
  });
}

main()