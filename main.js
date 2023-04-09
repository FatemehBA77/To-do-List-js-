const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todolist");
const filterOption = document.querySelector(".filter-todos");
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", checkRemove);
filterOption.addEventListener("click", filterTodos);
document.addEventListener("DOMContentLoaded", getLocalTodos);
function addTodo(e) {
  e.preventDefault(); // reson submit become refre
  console.log(e);
  const todoDiv = document.createElement("div"); //add to dom
  todoDiv.classList.add("todo");
  const newTodo = `
    <li>${todoInput.value}</li>
    <span><img class="check" src="/assets/images/Tick Square.svg" alt="" /></span>
    <span><img class="trash" src="/assets/images/Delete.svg" alt="" /></span>
      `;
  todoDiv.innerHTML = newTodo;
  todoList.appendChild(todoDiv);
  savedLocalTodos(todoInput.value);
  todoInput.value = " ";
}
function checkRemove(e) {
  const classList1 = [...e.target.classList];
  const item = e.target;
  console.log(classList1);
  console.log(item);
  if (classList1[0] === "check") {
    const todo = item.parentElement.parentElement;
    todo.classList.toggle("compleleted");
  } else if (classList1[0] === "trash") {
    const todo = item.parentElement.parentElement;
    removeLocalTodos(todo);
    todo.remove();
  }
}
function filterTodos(e) {
  console.log(todoList.childNodes);
  const todos = [...todoList.childNodes];
  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("compleleted")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("compleleted")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}
function savedLocalTodos(todo) {
  let savedItems = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  console.log(savedItems);
  savedItems.push(todo);
  localStorage.setItem("todos", JSON.stringify(savedItems));
}
function getLocalTodos() {
  let savedItems = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  savedItems.forEach((todo) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = `
        <li>${todo}</li>
        <span><img class="check" src="/assets/images/Tick Square.svg" alt="" /></span>
        <span><img class="trash" src="/assets/images/Delete.svg" alt="" /></span>
      `;
    todoDiv.innerHTML = newTodo;
    todoList.appendChild(todoDiv);
  });
}
function removeLocalTodos(todo) {
  let savedItems = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  const filteredTodo = savedItems.filter(
    (t) => t !== todo.children[0].innerHTML
  );
  localStorage.setItem("todos", JSON.stringify(filteredTodo));
}
