
export const task = (title, details, date, priority) => {

    return {
        title,
        details,
        date,
        priority,
    }
}

export const project = (title) => {
    let tasks = [];
    let active = false;

    function tasksAppend(title, details, date, priority) {
        const newTask = task(title, details, date, priority);
        tasks.push(newTask);
    }

    function removeTask(removedTask) {
        tasks = tasks.filter(task => task !== removedTask);
    }

    function getTasks() {
        return tasks;
    }

    function getTask(title) {
        return tasks.find(task => task.title === title);
    }

    function getActive() {
        return active;
    }

    function updateActive() {
        active = !active; 
    }

    return {
        title,
        tasksAppend,
        removeTask,
        getTasks,
        getTask,
        getActive,
        updateActive,
    }
}

export const projects = (() => {
    let projectsList = [];

    function projectsAppend(title) {
        const newProject = project(title);
        projectsList.push(newProject);
    }

    function removeProject(title) {
        projectsList = projectsList.filter(project => project.title !== title);
    }
    
    function getProjectsList() {
        return projectsList
    }

    function getProject(title) {
        return projectsList.find(project => project.title === title);
    }

    function getActiveProject() {
        return projectsList.find(project => project.getActive() === true);
    }

    return {
        projectsAppend,
        getProjectsList,
        getActiveProject,
        getProject,
        removeProject,
    }
})();

