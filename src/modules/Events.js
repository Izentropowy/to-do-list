import dom from './UI';
import { projects } from './projectsManager';

const events = (() => {

    function listenClicks() {

        document.addEventListener('click', e => {
            let target = e.target.getAttribute("class");

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
                const projectTitle = dom.addProject();

                if (projectTitle) {
                    dom.toggleProjectModal();
                    dom.displayProjects(projects.getProjectsList());
                }
            }
        })
    }

    return {
        listenClicks,
    }
})();

export default events;
