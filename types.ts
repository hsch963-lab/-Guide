
export type ViewType = 'dashboard' | 'growth' | 'nutrition' | 'mind-care' | 'vaccines';

export interface UserProfile {
  parentName: string;
  babyName: string;
  babyBirthday: string; // YYYY-MM-DD
  months: number;
}

export interface DashboardData {
  sleep_time: string;
  feeding_amount: string;
  weight: string;
  status_message: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export type ActionType = 'RECORD' | 'DIAGNOSIS' | 'GUIDE_COMPLETE' | null;
