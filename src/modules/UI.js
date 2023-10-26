import DOMPurify from 'dompurify';
import { projects } from './projectsManager';

// function appendProjects(name) {
//     const projects = document.querySelector('.projects');
//     const sanitizedName = DOMPurify.sanitize(name);

//     projects.innerHTML += `<button class="project-btn">${sanitizedName}</button>`;

//     return projects;
// }

const dom = (() => {
    const taskModal = document.querySelector('.task-modal');
    const projectModal = document.querySelector('.project-modal');
    const projectForm = document.querySelector('.project-form');
    const projectsDiv = document.querySelector('.projects');

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

    function displayProjects(projects) {
        projectsDiv.innerHTML = "";
        projects.forEach(project => {
            const newButton = document.createElement("button");
            newButton.classList.add('project-btn');
            newButton.textContent = project.title;
            projectsDiv.appendChild(newButton);
        });
    }

    return {
        toggleTaskModal,
        toggleProjectModal,
        closeModals,
        addProject,
        displayProjects,
    }
})();

export default dom;