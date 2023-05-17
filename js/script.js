// Seleção de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

let oldInputValue;

//Funções
const saveTodo = (text) => { //criando uma div para armazenar o valor do todoForm
    const todo = document.createElement("div")
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerHTML = text;
    todo.appendChild(todoTitle);

    //Adicionando os botoes nas proximas tarefas
    const doneBtn = document.createElement("button"); 
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    todo.appendChild(doneBtn)

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editBtn)

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove-todo");
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    todo.appendChild(deleteBtn)

    todoList.appendChild(todo);

    todoInput.value = "";
    todoInput.focus();
};

const toggleForm = () => { //Aparecer o formulario de edição
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
};

const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo"); //pegar todos os Todos
    todos.forEach((todo) => {

        let todoTitle = todo.querySelector("h3")

        if(todoTitle.innerText === oldInputValue){ //se o h3 for o mesmo na memoria
            todoTitle.innerText = text // text enviado pelo parametro
        }
    })
};   
//Eventos
todoForm.addEventListener("submit", (e) => {
    e.preventDefault(); //nao manda para o backend
    const inputValue = todoInput.value;

    if(inputValue){
        //save todo
        saveTodo(inputValue);//salva o valor do todoForm

    }
});

document.addEventListener("click", (e) => { 
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    let todoTitle;

    if(parentEl && parentEl.querySelector("h3")){
        todoTitle = parentEl.querySelector("h3").innerText;
    }

    if(targetEl.classList.contains("finish-todo")){//Para marcar como conluido
        parentEl.classList.toggle("done");
    }

    if(targetEl.classList.contains("remove-todo")){ //Para marcar como deletar
        parentEl.remove();
    }
    if(targetEl.classList.contains("edit-todo")){//Para marcar editar
       toggleForm();

       editInput.value = todoTitle //mudar o valor 
       oldInputValue = todoTitle //salvar na memoria
    }
});

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault(); //

    toggleForm();
});

editForm.addEventListener("submit", (e) => {
    e.preventDefault(); //

    const editInputValue = editInput.value;

    if(editInputValue){
        //atualizar
        updateTodo(editInputValue)
    }
    toggleForm()
})

