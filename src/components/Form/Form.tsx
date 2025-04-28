import React, { useState, useEffect } from "react";
import "../../styles/Form.css";
import { Project } from "../../firebase/projectService";

const Form = ({
    onSave,
    editingProject,
    onCancel,
}: {
    onSave: (project: Project) => void;
    editingProject: Project | null;
    onCancel: () => void;
}) => {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [error, setError] = useState(""); // État pour gérer les messages d'erreur

    useEffect(() => {
        if (editingProject) {
            setTitle(editingProject.title);
            setDate(editingProject.date);
            setDescription(editingProject.description);
            setType(editingProject.type);
        } else {
            setTitle("");
            setDate("");
            setDescription("");
            setType("");
        }
    }, [editingProject]);

    const handleSave = () => {
        if (!title || !date || !description || !type) {
            setError("All fields are required!"); // Afficher un message d'erreur si un champ est vide
            return;
        }
        setError(""); // Réinitialiser l'erreur si tous les champs sont remplis
        onSave({
            id: editingProject?.id, // Inclure l'ID si c'est une édition
            title,
            date,
            description,
            type,
        });
    };

    return (
        <div className="form">
            {error && <p className="error-message">{error}</p>} {/* Message d'erreur */}
            <input
                type="text"
                placeholder="Project Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <textarea
                placeholder="Project Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="">Select Type</option>
                <option value="Personal">Personal</option>
                <option value="Work">Work</option>
                <option value="Other">Other</option>
            </select>
            <div className="form-actions">
                <button onClick={handleSave}>Save</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default Form;