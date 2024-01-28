import { useState } from "react";
import NoProjectSelected from "./components/NoProjectSelected";
import Sidebar from "./components/Sidebar";
import NewProject from "./components/NewProject";
import SelectedProject from "./components/SelectedProject";

function App() {
    // we need states for projects array, showInputForm, selectedProject
    // we merge showInputForm and selectedProject to a single state

    // managing projects array state and selectedProject state together as a single object
    const [projectsState, setProjectsState] = useState({
        // undefined => no project selected, null => add new project, id => selected project id
        selectedProjectId: undefined, // content to display in main page along with sidebar
        projects: [], // stores projects in form of array of obj
        tasks: [], // stores tasks in form of array of objects
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

                // deleting currently selected project from projects []
                projects: prevProjectsState.projects.filter(
                    (project) =>
                        project.id !== prevProjectsState.selectedProjectId
                ),

                selectedProjectId: undefined,

                // deleting all tasks pointing/mapped to currently selected project (to be deleted)
                tasks: prevProjectsState.tasks.filter(
                    (task) =>
                        task.projectId !== prevProjectsState.selectedProjectId
                ),
            };
        });
    }

    function handleAddTask(task) {
        setProjectsState((prevProjectsState) => {
            // mapping each task to its project using project ID
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

    // find the currently selected project from projects array to display it
    const selectedProject = projectsState.projects.find(
        (project) => project.id === projectsState.selectedProjectId
    );

    // filter tasks of currently selected project using projectId of each task and selectedProjectId
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
