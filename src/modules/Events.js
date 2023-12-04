import dom from './UI';
import { projects } from './projectsManager';

const events = (() => {

    function listenClicks() {

        document.addEventListener('click', e => {
            let target = e.target.getAttribute("class");

            if (!target) {
                return
            }

            // addTask
            if (target.includes('add-task')) {
                dom.toggleTaskModal();
            }

            // addProject
            if (target.includes('add-project')) {
                dom.toggleProjectModal();
            }

            // closeModal
            if (target.includes('fa-x')) {
                dom.closeModals();
            }

            // projectFormSubmit
            if (target.includes('project-submit')) {
                let title = document.getElementById('project-title').value;

                projects.projectsAppend(title);
                dom.createProject(title);
                dom.displayProjects();
                dom.closeModals();
            }

            // activeProject
            if (target.includes('project-btn')) {
                console.log(e.target);
                console.log(projects.getProjectsList());
            }
        })
    }

    return {
        listenClicks,
    }
})();

export default events;