import { create } from 'zustand';
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  query,
  where,
  getDocs,
  orderBy,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './firebase';
import { useAuth } from './auth';

export interface Caption {
  id: string;
  startTime: number;
  endTime: number;
  text: string;
  style?: 'default' | 'highlight' | 'emphasis';
}

export interface Project {
  id: string;
  userId: string;
  name: string;
  thumbnail?: string;
  createdAt: Date;
  videoUrl?: string;
  duration: number;
  captions: Caption[];
  socialConnections?: {
    youtube?: boolean;
    tiktok?: boolean;
  };
}

interface ProjectState {
  projects: Project[];
  currentProject?: Project;
  isProcessing: boolean;
  error: string | null;
  loading: boolean;
  fetchProjects: () => Promise<void>;
  createProject: (name: string) => Promise<Project>;
  updateProject: (projectId: string, data: Partial<Project>) => Promise<void>;
  uploadVideo: (projectId: string, file: File) => Promise<string>;
  uploadVideoFromUrl: (projectId: string, url: string) => Promise<string>;
  setCurrentProject: (project: Project | undefined) => void;
  setIsProcessing: (isProcessing: boolean) => void;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  currentProject: undefined,
  isProcessing: false,
  error: null,
  loading: false,

  fetchProjects: async () => {
    const user = useAuth.getState().user;
    if (!user) return;

    set({ loading: true });
    try {
      const projectsRef = collection(db, 'projects');
      const q = query(
        projectsRef,
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const projects = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        createdAt: doc.data().createdAt.toDate(),
      })) as Project[];

      set({ projects, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  createProject: async (name: string) => {
    const user = useAuth.getState().user;
    if (!user) throw new Error('User not authenticated');

    const newProject: Omit<Project, 'id'> = {
      userId: user.uid,
      name,
      createdAt: new Date(),
      duration: 0,
      captions: [],
    };

    try {
      const docRef = await addDoc(collection(db, 'projects'), newProject);
      const project = { ...newProject, id: docRef.id } as Project;
      set((state) => ({ projects: [project, ...state.projects] }));
      return project;
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    }
  },

  updateProject: async (projectId: string, data: Partial<Project>) => {
    try {
      const projectRef = doc(db, 'projects', projectId);
      await updateDoc(projectRef, data);

      set((state) => ({
        projects: state.projects.map((p) =>
          p.id === projectId ? { ...p, ...data } : p
        ),
        currentProject:
          state.currentProject?.id === projectId
            ? { ...state.currentProject, ...data }
            : state.currentProject,
      }));
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    }
  },

  uploadVideo: async (projectId: string, file: File) => {
    const user = useAuth.getState().user;
    if (!user) throw new Error('User not authenticated');

    try {
      set({ isProcessing: true });

      const storageRef = ref(
        storage,
        `videos/${user.uid}/${projectId}/${file.name}`
      );
      await uploadBytes(storageRef, file);
      const videoUrl = await getDownloadURL(storageRef);

      await get().updateProject(projectId, { videoUrl });

      return videoUrl;
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isProcessing: false });
    }
  },

  uploadVideoFromUrl: async (projectId: string, url: string) => {
    try {
      set({ isProcessing: true });
      await get().updateProject(projectId, { videoUrl: url });
      return url;
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isProcessing: false });
    }
  },

  setCurrentProject: (project) => {
    set({ currentProject: project });
  },

  setIsProcessing: (isProcessing) => {
    set({ isProcessing });
  },
}));
