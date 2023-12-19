import dom from './UI';
import { projects } from './projectsManager';



const events = (() => {

    function listenClicks() {
        let activeTask;
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

            // taskFormSubmit
            if (target.includes('task-submit')) {
                dom.validateTaskForm();
            }

            // editFormSubmit
            if (target.includes('edit-submit')) {
                dom.validateEditForm(activeTask);
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
                activeTask = dom.getActiveTask(e);
                dom.createInfo(activeTask);
                dom.toggleInfoModal();
            }

            // editModal
            if (target.includes('fa-pen-to-square')) {
                activeTask = dom.getActiveTask(e);
                dom.createEdit(activeTask);
                dom.toggleEditModal();
            }

            // taskTrash
            if (target.includes('task-remove')) {
                activeTask = dom.getActiveTask(e);
                console.log(activeTask);
                projects.getActiveProject().removeTask(activeTask);
                dom.displayTasks();
            }

            if (target.includes('fa-circle')) {
                console.log(e.target);
            }
        })
    }

    return {
        listenClicks,
    }
})();

export default events;
