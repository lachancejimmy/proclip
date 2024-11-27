import { create } from 'zustand';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { auth, googleProvider } from './firebase';
import { createUserProfile, getUserProfile, updateUserProfile } from './services/userService';
import { UserProfile } from './types/user';
import toast from 'react-hot-toast';

interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>;
}

export const useAuth = create<AuthState>((set, get) => ({
  user: null,
  profile: null,
  loading: true,
  error: null,

  signIn: async (email: string, password: string) => {
    try {
      set({ loading: true, error: null });
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const profile = await getUserProfile(user.uid);
      set({ profile });
      toast.success('Connexion réussie');
    } catch (error) {
      const message = 'Email ou mot de passe incorrect';
      set({ error: message });
      toast.error(message);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  signUp: async (email: string, password: string) => {
    try {
      set({ loading: true, error: null });
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      const profile = await createUserProfile(user.uid, email);
      set({ profile });
      toast.success('Compte créé avec succès');
    } catch (error) {
      const message = 'Erreur lors de la création du compte';
      set({ error: message });
      toast.error(message);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  signInWithGoogle: async () => {
    try {
      set({ loading: true, error: null });
      const { user } = await signInWithPopup(auth, googleProvider);
      let profile = await getUserProfile(user.uid);
      
      if (!profile) {
        profile = await createUserProfile(user.uid, user.email!);
      }
      
      set({ profile });
      toast.success('Connexion réussie');
    } catch (error) {
      const message = 'Erreur de connexion avec Google';
      set({ error: message });
      toast.error(message);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  signOut: async () => {
    try {
      set({ loading: true, error: null });
      await firebaseSignOut(auth);
      set({ user: null, profile: null });
      toast.success('Déconnexion réussie');
    } catch (error) {
      const message = 'Erreur lors de la déconnexion';
      set({ error: message });
      toast.error(message);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  updateProfile: async (profileUpdate: Partial<UserProfile>) => {
    const { user } = get();
    if (!user) throw new Error('User not authenticated');

    try {
      await updateUserProfile(user.uid, profileUpdate);
      const updatedProfile = await getUserProfile(user.uid);
      set({ profile: updatedProfile });
    } catch (error) {
      toast.error('Erreur lors de la mise à jour du profil');
      throw error;
    }
  },
}));

// Initialize auth state listener
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const profile = await getUserProfile(user.uid);
    useAuth.setState({ user, profile, loading: false });
  } else {
    useAuth.setState({ user: null, profile: null, loading: false });
  }
});