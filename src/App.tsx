import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Form from "./components/Form/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/App.css";
import { addProject, getProjects, deleteProject, updateProject, Project } from "./firebase/projectService";

function App() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [formVisible, setFormVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [status, setStatus] = useState("In Progress");

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
            // Logique pour mettre à jour un projet existant
            try {
                const updatedProject = { ...editingProject, ...project }; // Fusionne les modifications
                await updateProject(updatedProject); // Appelle la fonction dans projectService
                setProjects(
                    projects.map((p) =>
                        p.id === updatedProject.id ? updatedProject : p
                    )
                );
                toast.success("Project has been updated successfully!", {
                    position: "bottom-right",
                    style: { backgroundColor: "#4caf50", color: "white" },
                });
            } catch (error) {
                toast.error("Failed to update project!", {
                    position: "bottom-right",
                    style: { backgroundColor: "#dc3545", color: "white" },
                });
            }
        } else {
            // Logique pour ajouter un nouveau projet
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
        setEditingProject(null); // Réinitialise l'état d'édition
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

    const handleSearch = (query: string) => {
        setSearchQuery(query.toLowerCase());
    };

    const filteredProjects = projects.filter(
        (project) =>
            project.title.toLowerCase().includes(searchQuery) || // Utilisez `title` au lieu de `name`
            project.description.toLowerCase().includes(searchQuery)
    );

    return (
        <div className="app-container">
            <Sidebar
                projects={filteredProjects}
                onAddProject={() => {
                    setEditingProject(null);
                    setFormVisible(true);
                }}
                onEditProject={handleEditProject} // Utilisation directe de handleEditProject
                onDeleteProject={handleDeleteProject}
            />
            <div className="main-content">
                <input
                    type="text"
                    placeholder="Search projects..."
                    onChange={(e) => handleSearch(e.target.value)}
                    className="search-bar"
                />
                {formVisible ? (
                    <div className="form-container">
                        <h2>{editingProject ? "Edit Project" : "Create a New Project"}</h2>
                        <Form
                            onSave={handleAddProject}
                            editingProject={editingProject}
                            onCancel={() => setFormVisible(false)}
                        />
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                            <option value="Pending">Pending</option>
                        </select>
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