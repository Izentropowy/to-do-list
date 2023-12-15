import dom from './UI';
import { projects, task } from './projectsManager';



const events = (() => {

    const priorityButtons = document.querySelectorAll('.priority-btn');

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
                let title = e.target.id;
                let project = projects.getProject(title);
                let oldActive = projects.getActiveProject();
                if (oldActive != undefined) {
                    oldActive.updateActive();
                }

                const activeP = document.querySelectorAll('.project-active');
                Array.from(activeP).forEach(btn => btn.classList.remove('project-active'));
                e.target.classList.add('project-active');

                project.updateActive();
                dom.displayTasks();
            }

            // priorityButton
            if (target.includes('priority-btn')) {
                Array.from(priorityButtons).forEach(btn => btn.classList.remove('priority-active'));
                e.target.classList.add('priority-active');
            }

            // taskFormSubmit
            if (target.includes('task-submit')) {
                let title = document.getElementById('task-title').value;
                let details = document.getElementById('details').value;
                let date = document.getElementById('date').value;
                let priority = document.querySelector('.priority-active').id;

                projects.getActiveProject().tasksAppend(title, details, date, priority);
                dom.createTask(title);
                dom.displayTasks();
                dom.closeModals();
            }

            // projectTrash
            if (target.includes('project-remove')) {
                let projectRemoved = e.target.parentNode.previousElementSibling.id;
                projects.removeProject(projectRemoved);
                dom.displayProjects();
                dom.displayTasks();
            }

            // infoModal
            if (target.includes('fa-circle-info')) {
                dom.createInfo(e);
                dom.toggleInfoModal();
            }
        })
    }

    return {
        listenClicks,
    }
})();

export default events;
