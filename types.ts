
export type ViewType = 'dashboard' | 'growth' | 'nutrition' | 'mind-care' | 'vaccines';

export interface BabyStats {
  name: string;
  age: string;
  milestone: string;
  weight: number;
  weightChange: number;
  sleepHours: string;
  sleepStatus: string;
  feedingAmount: number;
  lastFeedingTime: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
