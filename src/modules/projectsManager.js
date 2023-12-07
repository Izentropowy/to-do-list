
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

    function getTasks() {
        return tasks;
    }

    function getActive() {
        return active;
    }

    function updateActive() {
        active = !active; 
    }

    return {
        title,
        getTasks,
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
    }
})();

