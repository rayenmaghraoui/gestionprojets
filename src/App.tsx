import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Form from "./components/Form/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/App.css";
import { addProject, getProjects, deleteProject, Project } from "./firebase/projectService";

function App() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [formVisible, setFormVisible] = useState(false);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const projectsData = await getProjects();
                setProjects(projectsData);
            } catch (error) {
                console.error("Failed to fetch projects:", error);
            }
        };

        fetchProjects();
    }, []);

    const handleAddProject = async (project: Project) => {
        if (editingProject) {
            // Logique pour mettre à jour un projet (si nécessaire)
        } else {
            try {
                const newProject = await addProject(project);
                setProjects([...projects, newProject]);
                toast.success("Project has been created successfully!", {
                    position: "bottom-right",
                    style: { backgroundColor: "#4caf50", color: "white" },
                });
            } catch (error) {
                toast.error("Failed to create project!", {
                    position: "bottom-right",
                    style: { backgroundColor: "#dc3545", color: "white" },
                });
            }
        }
        setFormVisible(false);
    };

    const handleDeleteProject = async (projectToDelete: Project) => {
        if (projectToDelete.id) {
            try {
                await deleteProject(projectToDelete.id);
                setProjects(projects.filter((project) => project.id !== projectToDelete.id));
                toast.error("Project has been deleted successfully!", {
                    position: "bottom-right",
                    style: { backgroundColor: "#dc3545", color: "white" },
                });
            } catch (error) {
                toast.error("Failed to delete project!", {
                    position: "bottom-right",
                    style: { backgroundColor: "#dc3545", color: "white" },
                });
            }
        }
    };

    const handleEditProject = (projectToEdit: Project) => {
        setEditingProject(projectToEdit);
        setFormVisible(true);
    };

    return (
        <div className="app-container">
            <Sidebar
                projects={projects}
                onAddProject={() => {
                    setEditingProject(null);
                    setFormVisible(true);
                }}
                onDeleteProject={handleDeleteProject}
                onEditProject={handleEditProject}
            />
            <div className="main-content">
                {formVisible ? (
                    <div className="form-container">
                        <h2>{editingProject ? "Edit Project" : "Create a New Project"}</h2>
                        <Form
                            onSave={handleAddProject}
                            editingProject={editingProject}
                            onCancel={() => setFormVisible(false)}
                        />
                    </div>
                ) : (
                    <div className="empty-state">
                        <img
                            src="/icone.png"
                            alt="No projects"
                            className="empty-state-image"
                        />
                        <p className="empty-state-text">
                            Choose an existing project or create a new one
                        </p>
                        <button
                            className="create-project-btn"
                            onClick={() => {
                                setEditingProject(null);
                                setFormVisible(true);
                            }}
                        >
                            Start fresh
                        </button>
                    </div>
                )}
            </div>
            <ToastContainer />
        </div>
    );
}

export default App;