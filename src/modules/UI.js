import DOMPurify from 'dompurify';
import { projects } from './projectsManager';

const dom = (() => {
    const taskModal = document.querySelector('.task-modal');
    const projectModal = document.querySelector('.project-modal');
    const infoModal = document.querySelector('.info-modal');
    const editModal = document.querySelector('.edit-modal');
    const projectForm = document.querySelector('.project-form');
    const projectsDiv = document.querySelector('.projects');
    const tasksDiv = document.querySelector('.tasks');
    const taskForm = document.querySelector('.task-form');
    const priorityButtons = document.querySelectorAll('.priority-checkbox');

    const titleSpan = document.querySelector('.category-info-title');
    const detailsSpan = document.querySelector('.category-info-details');
    const dateSpan = document.querySelector('.category-info-date');
    const prioritySpan = document.querySelector('.category-info-priority');

    const editForm = document.querySelector('.edit-form');
    const editTitle = document.getElementById('edit-title');
    const editDetails = document.getElementById('edit-details');
    const editDate = document.getElementById('edit-date');
    const editPriorityButtons = document.querySelectorAll('.edit-priority-checkbox');

    function toggleTaskModal() {
        taskModal.style.display = getComputedStyle(taskModal).display == 'none' ? 'grid' : 'none';
    }

    function toggleProjectModal() {
        projectModal.style.display = getComputedStyle(projectModal).display == 'none' ? 'grid' : 'none';
    }


    function toggleInfoModal() {
        infoModal.style.display = getComputedStyle(infoModal).display == 'none' ? 'grid' : 'none';
    }

    function toggleEditModal() {
        editModal.style.display = getComputedStyle(editModal).display == 'none' ? 'grid' : 'none';
    }

    function closeModals() {
        taskModal.style.display = 'none';
        projectModal.style.display = 'none';
        infoModal.style.display = 'none';
        editModal.style.display = 'none';
    }

    function addProject() {
        if (projectForm.reportValidity()){
            const title = document.getElementById('project-title').value;
            projects.projectsAppend(title);
            return title;
        }
        else {
            return false;
        }
    }

    function createProject(title) {

        const sanitizedTitle = DOMPurify.sanitize(title);

        const newP = document.createElement('div');
        newP.classList.add('project');
        newP.innerHTML = `
        <button class="project-btn" id="${sanitizedTitle}">${sanitizedTitle}</button>
        <button><i class="fa-solid fa-trash project-remove"></i></button>
        `
        return newP;
    }

    function createTask(title) {
        const sanitizedTitle = DOMPurify.sanitize(title);

        const newT = document.createElement('div');
        newT.classList.add('card');
        newT.innerHTML = `
        <h4><button class="tick"><i class="fa-regular fa-circle"></i></button>${sanitizedTitle}</h4>
        <div class="card-buttons">
            <button><i class="fa-solid fa-circle-info"></i></button>
            <button><i class="fa-solid fa-pen-to-square"></i></button>
            <button><i class="fa-solid fa-trash"></i></button>
        </div>
        `

        return newT;
    }

    function displayProjects() {
        let list = projects.getProjectsList();
        projectsDiv.innerHTML = "";
        list.forEach(project => projectsDiv.appendChild(createProject(project.title)));
    }

    function displayTasks() {
        let activeProject = projects.getActiveProject();

        if (activeProject === undefined) {
            tasksDiv.innerHTML = "";
            return;
        }

        let list = activeProject.getTasks();
        tasksDiv.innerHTML = "";
        list.forEach(task => tasksDiv.appendChild(createTask(task.title)));
        let addTaskButton = document.createElement('button');
        addTaskButton.className = 'add-task';
        addTaskButton.innerHTML = '<i class="fa-solid fa-plus"></i>&ensp;Add task';
        
        tasksDiv.appendChild(addTaskButton);
    }

    function createInfo(task) {
        titleSpan.textContent = task.title;
        detailsSpan.textContent = task.details;
        dateSpan.textContent = task.date;
        prioritySpan.textContent = task.priority;
    }

    function createEdit(task) {
        editTitle.value = task.title;
        editDetails.value = task.details;
        editDate.value = task.date;
        let priority = task.priority;
        Array.from(editPriorityButtons).forEach(btn => {
            if (btn.value === priority) {
                btn.checked = true;
                return;
            }
        });

    }

    function findChecked(buttons) {
        let checked;
        Array.from(buttons).forEach(btn => {
            if (btn.checked === true) {
                checked = btn.value;
                return;
            }
        });
        return checked;
    }

    function getActiveTask(e) {
        let taskTitle = e.target.parentNode.parentNode.previousElementSibling.textContent;
        let activeP = projects.getActiveProject();
        let task = activeP.getTask(taskTitle);

        return task;
    }

    function validateTaskForm() {
        if (taskForm.reportValidity()){
            let title = document.getElementById('task-title').value;
            let details = document.getElementById('details').value;
            let date = document.getElementById('date').value;
            let priority = findChecked(priorityButtons);
            projects.getActiveProject().tasksAppend(title, details, date, priority);
            dom.createTask(title);
            dom.displayTasks();
            dom.closeModals();
            taskForm.reset();
        }
    }

    function validateEditForm(task) {
        if (editForm.reportValidity()){
            let title = document.getElementById('edit-title').value;
            let details = document.getElementById('edit-details').value;
            let date = document.getElementById('edit-date').value;
            let priority = findChecked(editPriorityButtons);

            task.title = title;
            task.details = details;
            task.date = date;
            task.priority = priority;
            dom.displayTasks();
            dom.closeModals();
        }
    }

    return {
        toggleTaskModal,
        toggleProjectModal,
        toggleInfoModal,
        closeModals,
        addProject,
        createProject,
        displayProjects,
        createTask,
        displayTasks,
        createInfo,
        createEdit,
        toggleEditModal,
        validateTaskForm,
        validateEditForm,
        getActiveTask,
    }
})();

export default dom;