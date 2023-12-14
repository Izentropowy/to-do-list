import DOMPurify from 'dompurify';
import { projects } from './projectsManager';

const dom = (() => {
    const taskModal = document.querySelector('.task-modal');
    const projectModal = document.querySelector('.project-modal');
    const projectForm = document.querySelector('.project-form');
    const projectsDiv = document.querySelector('.projects');
    const tasksDiv = document.querySelector('.tasks');

    function toggleTaskModal() {
        taskModal.style.display = getComputedStyle(taskModal).display == 'none' ? 'grid' : 'none';
    }

    function toggleProjectModal() {
        projectModal.style.display = getComputedStyle(projectModal).display == 'none' ? 'grid' : 'none';
    }

    function closeModals() {
        taskModal.style.display = 'none';
        projectModal.style.display = 'none';
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
        <h4><button class="tick"><i class="fa-regular fa-circle"></i></button>&ensp;${sanitizedTitle}</h4>
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
        let list = activeProject.getTasks();
        tasksDiv.innerHTML = "";
        list.forEach(task => tasksDiv.appendChild(createTask(task.title)));
        let addTaskButton = document.createElement('button');
        addTaskButton.className = 'add-task';
        addTaskButton.innerHTML = '<i class="fa-solid fa-plus"></i>&ensp;Add task';
        
        tasksDiv.appendChild(addTaskButton);
    }

    return {
        toggleTaskModal,
        toggleProjectModal,
        closeModals,
        addProject,
        createProject,
        displayProjects,
        createTask,
        displayTasks,
    }
})();

export default dom;