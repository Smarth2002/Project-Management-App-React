import { useState } from "react";
import NoProjectSelected from "./components/NoProjectSelected";
import Sidebar from "./components/Sidebar";
import NewProject from "./components/NewProject";
import SelectedProject from "./components/SelectedProject";

function App() {
    // undefined => no project selected, null => add new project, id => selected project id
    const [projectsState, setProjectsState] = useState({
        selectedProjectId: undefined,
        projects: [],
        tasks: [],
    });

    function handleAddProject() {
        setProjectsState((prevProjectsState) => {
            return {
                ...prevProjectsState,
                selectedProjectId: null,
            };
        });
    }

    function handleCancel() {
        setProjectsState((prevProjectsState) => {
            return {
                ...prevProjectsState,
                selectedProjectId: undefined,
            };
        });
    }

    function handleSave(projectData) {
        const newProject = {
            id: Math.random(),
            ...projectData,
        };

        setProjectsState((prevProjectsState) => {
            return {
                ...prevProjectsState,
                selectedProjectId: undefined,
                projects: [...prevProjectsState.projects, newProject],
            };
        });
    }

    function handleSelectProject(projectId) {
        setProjectsState((prevProjectsState) => {
            return {
                ...prevProjectsState,
                selectedProjectId: projectId,
            };
        });
    }

    function handleDeleteProject() {
        setProjectsState((prevProjectsState) => {
            return {
                ...prevProjectsState,
                projects: prevProjectsState.projects.filter(
                    (project) =>
                        project.id !== prevProjectsState.selectedProjectId
                ),
                selectedProjectId: undefined,
            };
        });
    }

    function handleAddTask(task) {
        setProjectsState((prevProjectsState) => {
            const newTask = {
                id: Math.random(),
                projectId: prevProjectsState.selectedProjectId,
                text: task,
            };

            return {
                ...prevProjectsState,
                tasks: [newTask, ...prevProjectsState.tasks],
            };
        });
    }

    function handleDeleteTask(taskId) {
        setProjectsState((prevProjectsState) => {
            return {
                ...prevProjectsState,
                tasks: prevProjectsState.tasks.filter(
                    (task) => task.id !== taskId
                ),
            };
        });
    }

    const selectedProject = projectsState.projects.find(
        (project) => project.id === projectsState.selectedProjectId
    );

    const projectTasks = projectsState.tasks.filter(
        (task) => task.projectId === projectsState.selectedProjectId
    );

    let content = (
        <SelectedProject
            project={selectedProject}
            tasks={projectTasks}
            onDeleteProject={handleDeleteProject}
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
        />
    );

    if (projectsState.selectedProjectId === null)
        content = <NewProject onCancel={handleCancel} onSave={handleSave} />;
    else if (projectsState.selectedProjectId === undefined)
        content = <NoProjectSelected onAddProject={handleAddProject} />;

    return (
        <main className="h-screen my-8 flex gap-8">
            <Sidebar
                projects={projectsState.projects}
                selectedProjectId={projectsState.selectedProjectId}
                onAddProject={handleAddProject}
                onSelectProject={handleSelectProject}
            ></Sidebar>

            {content}
        </main>
    );
}

export default App;
