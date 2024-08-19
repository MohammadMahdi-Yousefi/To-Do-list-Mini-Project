// ---------------------------define variables
let $ = document;
const inputElem = $.getElementById("itemInput");
const addButton = $.getElementById("addButton");
const clearButton = $.getElementById("clearButton");
const todoListElem = $.getElementById("todoList");
let todosArray = [];
//--------------------------------------- add todo func///

function addNewTodo() {
  if (inputElem.value) {
    let newTodoTitle = inputElem.value.trim();

    let newTodoObj = {
      id: todosArray.length + 1,
      title: newTodoTitle,
      complete: false,
    };

    inputElem.value = "";

    todosArray.push(newTodoObj);
    setLocalStorage(todosArray);
    todosGenerator(todosArray);

    inputElem.focus();
  }
}

//------------------------- set localstorage func

function setLocalStorage(todosList) {
  localStorage.setItem("todos", JSON.stringify(todosList));
}
//------------------------- todos generators (li, lable , buttons) func

function todosGenerator(todosList) {
  let newTodoLiElem, newTodoLabalElem, newTodoCompleteBtn, newTodoDeleteBtn;

  todoListElem.innerHTML = "";

  todosList.forEach(function (todo) {
    newTodoLiElem = $.createElement("li");
    newTodoLiElem.className = "completed well";

    newTodoLabalElem = $.createElement("label");
    newTodoLabalElem.innerHTML = todo.title;

    newTodoCompleteBtn = $.createElement("button");
    newTodoCompleteBtn.className = "btn btn-success";
    newTodoCompleteBtn.innerHTML = "Complete";
    newTodoCompleteBtn.setAttribute("onclick", "editTodo(" + todo.id + ")"); // complete func

    newTodoDeleteBtn = $.createElement("button");
    newTodoDeleteBtn.className = "btn btn-danger";
    newTodoDeleteBtn.innerHTML = "Delete";
    newTodoDeleteBtn.setAttribute("onclick", "removeTodo(" + todo.id + ")"); // remove todo by btn event

    newTodoLiElem.append(
      newTodoLabalElem,
      newTodoCompleteBtn,
      newTodoDeleteBtn
    );
    if (todo.complete) {
      newTodoLiElem.className = "uncompleted well";
      newTodoCompleteBtn.innerHTML = "inComplete";
    }

    todoListElem.append(newTodoLiElem);
  });
}
// -------------------------------- complete btn func
function editTodo(todoId) {
  localStorageTodos = JSON.parse(localStorage.getItem("todos"));
  todosArray = localStorageTodos;
  todosArray.forEach(function (todo) {
    if (todoId === todo.id) {
      todo.complete = !todo.complete;
    }
  });
  setLocalStorage(todosArray);
  todosGenerator(todosArray);
}
//------------------------- remove todo btn  func

function removeTodo(todoid) {
  localStorageTodos = JSON.parse(localStorage.getItem("todos"));
  let maintodoindex = todosArray.findIndex(function (todo) {
    return todo.id === todoid;
  });
  todosArray = localStorageTodos;
  todosArray.splice(maintodoindex, 1);
  setLocalStorage(todosArray);
  todosGenerator(todosArray);
}
//------------------------- GET LOCAL  STORAGE ON LOAD func

function getLocalStorage() {
  let localStorageTodos = JSON.parse(localStorage.getItem("todos"));

  if (localStorageTodos) {
    todosArray = localStorageTodos;
  } else {
    todosArray = [];
  }

  todosGenerator(todosArray);
}
//------------------------- clear todos btn  func

function clearTodos() {
  todosArray = [];
  todosGenerator(todosArray);
  localStorage.removeItem("todos");
}
//------------------------- defin events

window.addEventListener("load", getLocalStorage);
addButton.addEventListener("click", addNewTodo);
clearButton.addEventListener("click", clearTodos);
inputElem.addEventListener("keydown", function (event) {
  if (event.code === "Enter") {
    addNewTodo();
  }
}); // add toddo by enter
