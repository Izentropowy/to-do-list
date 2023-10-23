
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

    function getTasks() {
        return tasks;
    }

    return {
        title,
        getTasks,
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

    return {
        projectsAppend,
        getProjectsList,
    }
})();

