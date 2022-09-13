// Run these functions when page loads
displayTasks();

// Define Most used variables
let taskInputValue = document.getElementById('userInput');
let addTaskBtn = document.getElementById('push');
let saveTaskBtn = document.getElementById('save');
let deleteAll = document.getElementById('deleteAll');
let searchInput = document.getElementById('searchBar');

// Add event listener to add task button
addTaskBtn.addEventListener('click', addToStorage);

// function to get items from local storage
function getStorage() {
    let tasksObj;
    let webTasks = localStorage.getItem('localTasks');
    if (webTasks == null) {
        tasksObj = [];
    } else {
        tasksObj = JSON.parse(webTasks);
    }
    return tasksObj;
}

// function to set items in local storage
function setStorage(data) {
    localStorage.setItem('localTasks', JSON.stringify(data));
}

// Function for add tasks to local storage
function addToStorage() {
    let addTaskInputVal = taskInputValue.value;
    if(addTaskInputVal.trim()!= 0){
        let tasksObj = getStorage();
        tasksObj.push(addTaskInputVal);
        setStorage(tasksObj);
        taskInputValue.value = "";
        displayTasks();
    }else{
        let snackBar = document.getElementById("snackBar");
        snackBar.className = "show";
        setTimeout(function () { snackBar.className = snackBar.className.replace("show", ""); }, 3000);
    }
    
}

// Function to display tasks
function displayTasks() {
    let addedTaskList = document.getElementById('tasks');
    let tasksObj = getStorage();
    let html = '';
    tasksObj.forEach((item, index) => {
        html += `
            <div id="task">
            <span id="taskName">
                ${index + 1}. ${item}
            </span>
            <div id="actions">
                <button id="edit" onclick="editTasks(${index})">
                    <ion-icon name="create"></ion-icon> Edit
                </button>
                <button id="delete" onclick="deleteTasks(${index})">
                    <ion-icon name="trash"></ion-icon> Delete
                </button>
            </div>
            </div>
        `
    });
    if (tasksObj.length != 0) {
        addedTaskList.innerHTML = html;
    } else {
        addedTaskList.innerHTML = `<span id="noTasks">There are no tasks to show</span>`;
      }
}

// Function to edit task
function editTasks(index) {
    let tasksObj = getStorage();
    taskInputValue.value = tasksObj[index];
    saveIndex = document.getElementById('saveIndex');
    saveIndex.value = index;
    addTaskBtn.style.display="none";
    saveTaskBtn.style.display="block";
}

// Add event listener to save task button
saveTaskBtn.addEventListener('click', saveTasks)

// Function to save task
function saveTasks() {
    let tasksObj = getStorage();
    saveIndex = document.getElementById('saveIndex').value;
    tasksObj[saveIndex] = taskInputValue.value;
    setStorage(tasksObj);
    taskInputValue.value = "";
    displayTasks();
    addTaskBtn.style.display="block";
    saveTaskBtn.style.display="none";
}

// function to delete tasks
function deleteTasks(index) {
    let tasksObj = getStorage();
    tasksObj.splice(index, 1);
    setStorage(tasksObj);
    displayTasks();
}

// Add event listener to delete all button
deleteAll.addEventListener('click', deleteAllTasks);

// Function to delete all tasks
function deleteAllTasks() {
    let tasksObj = getStorage();
    if(tasksObj != null){
        tasksObj = []
    }
    setStorage(tasksObj);
    taskInputValue.value = "";
    displayTasks();
    addTaskBtn.style.display="block";
    saveTaskBtn.style.display="none";
}

// Add event listener to search input
searchInput.addEventListener('input', searchTasks);

// Function to search tasks
function searchTasks() {
    inputValue = searchInput.value
    inputValue = inputValue.replace(/^./, str => str.toUpperCase()) // Capitalize search input
    let tasks = document.querySelectorAll('#task')
    Array.from(tasks).forEach(function (element) {
       let taskTxt = element.getElementsByTagName('span')[0].innerText;
       if(taskTxt.includes(inputValue)){
        element.style.display = "block"
        element.style.display = "flex"
       }else{
        element.style.display = "none"
       }
    })
}