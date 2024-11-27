import { z } from 'zod';

export const PlanType = z.enum(['FREE', 'CREATOR', 'PRO']);
export type PlanType = z.infer<typeof PlanType>;

export const UserPlan = z.object({
  type: PlanType,
  videosRemaining: z.number(),
  startDate: z.date(),
  endDate: z.date(),
});
export type UserPlan = z.infer<typeof UserPlan>;

export const UserProfile = z.object({
  id: z.string(),
  email: z.string().email(),
  displayName: z.string().nullable(),
  photoURL: z.string().nullable(),
  plan: UserPlan,
  createdAt: z.date(),
  preferences: z.object({
    theme: z.enum(['light', 'dark']),
    language: z.enum(['fr', 'en']),
  }),
  socialConnections: z.object({
    youtube: z.boolean().default(false),
    tiktok: z.boolean().default(false),
    instagram: z.boolean().default(false),
  }),
});
export type UserProfile = z.infer<typeof UserProfile>;

export const planLimits = {
  FREE: {
    videosPerWeek: 3,
    downloadsPerVideo: 10,
    maxDuration: 30 * 60, // 30 minutes
    maxSize: 2 * 1024 * 1024 * 1024, // 2GB
  },
  CREATOR: {
    videosPerWeek: 10,
    downloadsPerVideo: Infinity,
    maxDuration: 45 * 60, // 45 minutes
    maxSize: 3 * 1024 * 1024 * 1024, // 3GB
  },
  PRO: {
    videosPerWeek: 25,
    downloadsPerVideo: Infinity,
    maxDuration: 60 * 60, // 60 minutes
    maxSize: 5 * 1024 * 1024 * 1024, // 5GB
    features: ['autoPost', 'silenceRemoval', 'advancedAnalytics'],
  },
} as const;