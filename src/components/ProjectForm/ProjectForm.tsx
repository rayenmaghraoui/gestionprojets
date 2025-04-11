import React, { useState } from "react";
import "../../styles/ProjectForm.css"; // Assurez-vous que le chemin est correct

const ProjectForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ title, date, description, type });
    };

    return (
        <form className="project-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="text"
                placeholder="Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
            />
            <button type="submit">Save Project</button>
        </form>
    );
};

export default ProjectForm;