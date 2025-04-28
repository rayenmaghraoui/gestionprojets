import { db } from "./config";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";

export interface Project {
  id?: string; // Identifiant Firestore
  title: string;
  date: string;
  description: string;
  type: string;
}

// Ajouter un projet dans Firestore
export const addProject = async (project: Project) => {
  try {
    // Exclure le champ `id` avant d'ajouter le projet
    const { id, ...projectData } = project;
    const docRef = await addDoc(collection(db, "projects"), projectData);
    return { id: docRef.id, ...projectData };
  } catch (error) {
    console.error("Error adding project: ", error);
    throw error;
  }
};

// Récupérer tous les projets depuis Firestore
export const getProjects = async (): Promise<Project[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "projects"));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Project[];
  } catch (error) {
    console.error("Error fetching projects: ", error);
    throw error;
  }
};

// Supprimer un projet de Firestore
export const deleteProject = async (projectId: string) => {
  try {
    const projectRef = doc(db, "projects", projectId);
    await deleteDoc(projectRef);
  } catch (error) {
    console.error("Error deleting project: ", error);
    throw error;
  }
};

// Mettre à jour un projet dans Firestore
export const updateProject = async (project: Project): Promise<void> => {
  if (!project.id) {
    throw new Error("Project ID is required for updating.");
  }
  try {
    const projectRef = doc(db, "projects", project.id); // Référence au document
    await updateDoc(projectRef, {
      title: project.title,
      date: project.date,
      description: project.description,
      type: project.type,
    });
  } catch (error) {
    console.error("Error updating project: ", error);
    throw error;
  }
};