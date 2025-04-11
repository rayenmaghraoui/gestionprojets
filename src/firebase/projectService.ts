import { db } from "./config";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";

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
    const docRef = await addDoc(collection(db, "projects"), project);
    return { id: docRef.id, ...project };
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