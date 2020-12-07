'use strict';

let todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

let todoData = [
    {
        value: 'Сварить кофе',
        completed: false
    },
    {
        value: 'Помыть посуду',
        completed: true
    }
];

const render = function(){
    localStorage.setItem('todoData', JSON.stringify(todoData));
    todoData = JSON.parse(localStorage.getItem('todoData'));
    todoList.textContent = '';
    todoCompleted.textContent = '';
    console.log(todoData);
    todoData.forEach(function(item, i){
        let li = document.createElement('li');
        li.classList.add('todo-item');

        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' + 
            '<div class="todo-buttons">' + 
                '<button class="todo-remove"></button>' + 
                '<button class="todo-complete"></button>' + 
            '</div>';

        if(item.completed){
            todoCompleted.append(li);
        } else{
            todoList.append(li);
        }

        const btnTodoCompleted = li.querySelector('.todo-complete');
        btnTodoCompleted.addEventListener('click', function(){
            item.completed = !item.completed;

            render();
        });

        const btnTodoRemove = li.querySelector('.todo-remove');
        btnTodoRemove.addEventListener('click', function(){
            todoData.splice(i, 1);
            render();
        });

    });
};

todoControl.addEventListener('submit', function(event){
    event.preventDefault();

    if(headerInput.value.trim() === ''){
        alert('Вы забыли написать задачу!');
    } else {
        const newTodo = {
            value: headerInput.value,
            completed: false
        };

        todoData.push(newTodo);
        headerInput.value = '';
    }
    // localStorage.setItem('todoData', JSON.stringify(todoData));
    // todoData = JSON.parse(localStorage.getItem('todoData'));


    render();
});

render();