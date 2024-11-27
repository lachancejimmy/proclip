import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { UserProfile, PlanType } from '../types/user';

export async function createUserProfile(userId: string, email: string): Promise<UserProfile> {
  const now = new Date();
  const profile: UserProfile = {
    id: userId,
    email,
    displayName: null,
    photoURL: null,
    plan: {
      type: 'FREE' as PlanType,
      videosRemaining: 3,
      startDate: now,
      endDate: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days
    },
    createdAt: now,
    preferences: {
      theme: 'light',
      language: 'fr',
    },
    socialConnections: {
      youtube: false,
      tiktok: false,
      instagram: false,
    },
  };

  await setDoc(doc(db, 'users', userId), profile);
  return profile;
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) {
    return null;
  }

  const data = docSnap.data() as UserProfile;
  return {
    ...data,
    createdAt: data.createdAt.toDate(),
    plan: {
      ...data.plan,
      startDate: data.plan.startDate.toDate(),
      endDate: data.plan.endDate.toDate(),
    },
  };
}

export async function updateUserProfile(userId: string, profile: Partial<UserProfile>): Promise<void> {
  const docRef = doc(db, 'users', userId);
  await setDoc(docRef, profile, { merge: true });
}