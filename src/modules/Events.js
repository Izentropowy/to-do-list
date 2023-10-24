import dom from './UI';
import { projects } from './projectsManager';

const events = (()=> {
    const addTaskButton = document.querySelector('.add-task');
    const addProjectButton = document.querySelector('.add-project');
    const closeModalButtons = document.querySelectorAll('.fa-x');
    const projectFormSubmit = document.querySelector('.project-submit');

    addTaskButton.addEventListener('click', dom.toggleTaskModal);

    addProjectButton.addEventListener('click', dom.toggleProjectModal);

    projectFormSubmit.addEventListener('click', () => {
        const isProjectAdded = dom.addProject();
        console.log(projects.getProjectsList());
        if (isProjectAdded) {
            dom.toggleProjectModal();
            dom.displayProjects(projects.getProjectsList());
        }
    });

    closeModalButtons.forEach(element => {
        element.addEventListener('click', dom.closeModals);
    });
})();

export default events
