import DOMPurify from 'dompurify';
import { projects } from './projectsManager';

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

    function createProject(title) {
        const sanitizedTitle = DOMPurify.sanitize(title);

        const newP = document.createElement('div');
        newP.classList.add('project');
        newP.innerHTML = `
        <button class="project-btn">${sanitizedTitle}</button>
        <button><i class="fa-solid fa-trash"></i></button>
        `
        return newP;
    }

    function displayProjects() {
        let list = projects.getProjectsList();
        projectsDiv.innerHTML = "";
        list.forEach(project => projectsDiv.appendChild(createProject(project.getTitle())));
    }

    return {
        toggleTaskModal,
        toggleProjectModal,
        closeModals,
        addProject,
        createProject,
        displayProjects,
    }
})();

export default dom;