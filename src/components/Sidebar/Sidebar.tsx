import React from "react";
import "../../styles/Sidebar.css";
import { Project } from "../../firebase/projectService";

const Sidebar = ({
    projects,
    onAddProject,
    onDeleteProject,
    onEditProject,
}: {
    projects: Project[];
    onAddProject: () => void;
    onDeleteProject: (project: Project) => void;
    onEditProject: (project: Project) => void;
}) => {
    return (
        <div className="sidebar">
            <h2 className="sidebar-title">YOUR PROJECTS</h2>
            <button className="add-project-btn" onClick={onAddProject}>
                + Add Project
            </button>
            <ul className="project-list">
                {projects.map((project, index) => (
                    <li key={index} className="project-item">
                        <div>
                            <strong>{project.title}</strong>
                            <p>{project.date}</p>
                            <p>{project.description}</p>
                            <p>Type: {project.type}</p>
                        </div>
                        <div className="project-actions">
                            <button
                                className="edit-btn"
                                onClick={() => onEditProject(project)}
                            >
                                Edit
                            </button>
                            <button
                                className="delete-btn"
                                onClick={() => onDeleteProject(project)}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;