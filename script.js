const inputElement = document.querySelector('.new-task-input');
const addTaskButton = document.querySelector('.new-task-button');

const tasksContainer = document.querySelector('.task-container');

const validateInput = () => inputElement.value.trim().length > 0;

const handleAddtask = () => {
    const inputIsvalid = validateInput();

    if(!inputIsvalid) {
        return inputElement.classList.add('error');
    }
    const taskItemContainer = document.createElement('div')
    taskItemContainer.classList.add('task-item')
    
    const taskContent = document.createElement('p')

    taskContent.innerText = inputElement.value;

    taskContent.addEventListener('click', () => handleClick(taskContent));
    
    const deleteItem = document.createElement('i');
    deleteItem.classList.add("far");
    deleteItem.classList.add('fa-trash-alt');

    deleteItem.addEventListener('click', () => handleDeleteClick(taskItemContainer, taskContent));

    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteItem);
    
    tasksContainer.appendChild(taskItemContainer);

    inputElement.value = '';

    
    
    
    
};

const handleClick = (taskContent) => {
    const tasks = tasksContainer.childNodes;
    
    for (const task of tasks) {
        const currentTaskIsBeigClicked = task.firstChild.isSameNode(taskContent)
        if (currentTaskIsBeigClicked){
            task.firstChild.classList.toggle('completed');
        }
    }

    updatelocalStorage();

};

const handleDeleteClick = (taskItemContainer, taskContent) =>{
    const tasks = tasksContainer.childNodes;

    for (const task of tasks) {
        const currentTaskIsBeigClicked = task.firstChild.isSameNode(taskContent)
        if (currentTaskIsBeigClicked){
            taskItemContainer.remove();
        }
    }
    updatelocalStorage();
}

const handleInputChange = () => {
    const inputIsvalid = validateInput();
    if(inputIsvalid) {
        return inputElement.classList.remove('error');
    }
};

const updatelocalStorage = () => {
    const tasks = tasksContainer.childNodes; 
    
    const localStorageTasks = [... tasks].map((task) =>{
        const content = task.firstChild;
        const isCompleted = content.classList.contains('completed')

        return { description: content.innerText, isCompleted };
    })
    localStorage.setItem('tasks'. JSON.stringfy(localStorageTasks));
}




addTaskButton.addEventListener('click', () => handleAddtask());

inputElement.addEventListener('change', () => handleInputChange());