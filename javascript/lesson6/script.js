const formEl = document.getElementById("todo-form");
const todoInputEl = formEl.elements["todo-input"];
const ulEl = document.querySelector("ul");
const countEl = document.querySelector(".count-class");

let savedList = JSON.parse(localStorage.getItem("todoList"));

console.log(savedList);

let todoList = savedList == null || undefined ? [] : savedList;

console.log("todolist", todoList);

todoList.reverse().forEach((todo) => {
  console.log(todo.todoContent);
  addTodo(todo);
});

countTodos();

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoContent = todoInputEl.value;

  const todoObj = {
    id: getRandomId(),
    todoContent,
  };
  todoList.unshift(todoObj);
  addTodo(todoObj);
  formEl.reset();
  todoInputEl.focus();
  countTodos();
  localStorage.setItem("todoList", JSON.stringify(todoList));
});

function addTodo(todoObj) {
  console.log("addTodo", todoObj.todoContent);
  const li = document.createElement("li");
  li.className =
    "list-group-item d-flex align-items-center mb-2 border-0 bg-light";
  li.setAttribute("id", todoObj.id);

  const todoText = document.createElement("div");
  todoText.className = "todo-text";
  todoText.textContent = todoObj.todoContent;

  const deleteTodo = document.createElement("button");
  deleteTodo.className =
    "delete-btn btn btn-sm btn-danger aligh-self-center position-absolute top-50 end-0 translate-middle-y";
  deleteTodo.type = "button";
  deleteTodo.innerHTML = '<i class="bi bi-trash"></i>';
  deleteTodo.onclick = function () {
    removeTodo(todoObj);
  };

  const editTodo = document.createElement("button");
  editTodo.className = "edit-btn btn btn-sm btn-primary aligh-self-center ";
  editTodo.type = "button";
  editTodo.innerHTML = '<i class="bi bi-pencil"></i>';

  editTodo.addEventListener("click", function (e) {
    e.preventDefault();
    selectTodo(todoObj);
  });

  li.append(todoText);
  li.append(editTodo);
  li.append(deleteTodo);
  ulEl.insertBefore(li, ulEl.firstChild);
}

function removeTodo(todoObj) {
  const deletedLi = document.getElementById(todoObj.id);
  console.log(deletedLi);
  ulEl.removeChild(deletedLi);
  todoList.splice(todoList.indexOf(todoObj), 1);
  countTodos();
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

function countTodos() {
  if (todoList.length == 0) {
    countEl.innerHTML = "";
    countEl.textContent = "You have no task today!";
  } else {
    countEl.innerHTML = "";

    const div = document.createElement("div");
    div.className = "count-text";
    div.innerHTML = `You have <b>${todoList.length}</b> tasks`;

    const clear = document.createElement("button");
    clear.className = "btn btn-danger ms-2";
    clear.textContent = "Clear All";

    countEl.append(div);
    countEl.append(clear);

    clear.addEventListener("click", function () {
      console.log("hi");
      todoList = [];
      ulEl.innerHTML = "";
      countTodos();
      localStorage.setItem("todoList", JSON.stringify(todoList));
    });
  }
}

function selectTodo(todoObject) {
  const updateForm = document.querySelector(".update-form");
  updateForm.style.display = "flex";
  updateForm.innerHTML =
    '<input class=" form-control px-3 py-2 bg-body rounded me-2 fs-6" name="update-input" type="text" ></input><button type="submit" class="btn btn-primary rounded-2 px-3 fs-6" name = "update-button"  value="update"><i class="bi bi-check2"></i></button><button type="button" class="btn btn-danger rounded-2 px-3 fs-6" value="cancle" name = "cancel-button" ><i class="bi bi-x"></i></button>';
  formEl.style.display = "none";

  const updatInput = updateForm.elements["update-input"];

  updatInput.value = todoObject.todoContent;
  updatInput.focus();

  updateForm.addEventListener("submit", (e) => {
    e.preventDefault();

    todoList.forEach((todo) => {
      if (todo.id == todoObject.id) {
        console.log("hi", todo.id);
        todo.todoContent = updatInput.value;
      }
    });

    const todoLi = document.getElementById(todoObject.id);
    console.log(todoObject);
    todoLi.firstChild.textContent = updatInput.value;
    updateForm.style.display = "none";

    updateForm.innerHTML = "";
    formEl.style.display = "flex";
    todoInputEl.focus();
    localStorage.setItem("todoList", JSON.stringify(todoList));
  });

  const cancle = updateForm.elements["cancel-button"];
  cancle.addEventListener("click", (e) => {
    e.preventDefault();

    updateForm.style.display = "none";
    formEl.style.display = "flex";
    todoInputEl.focus();
  });
}

function getRandomId() {
  return Math.floor(Math.random() * (10000 - 1000) + 1000);
}
