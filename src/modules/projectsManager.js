
export const task = (title, details, date, priority) => {
    return {
        title,
        details,
        date,
        priority,
    }
}

export const project = (title) => {
    let projectTitle = title;
    let tasks = [];
    let active = 0;

    function getTitle() {
        return projectTitle;
    }

    function getTasks() {
        return tasks;
    }

    function isActive() {
        return tasks;
    }

    return {
        getTitle,
        getTasks,
        isActive,
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

    function setActiveProject(project) {

    }

    return {
        projectsAppend,
        getProjectsList,
    }
})();

