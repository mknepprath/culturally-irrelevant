import type { Dispatch, SetStateAction } from "react";

// `[isDarkMode, setIsDarkMode]`, passed to every page from `_app`.
export type Theme = [boolean, Dispatch<SetStateAction<boolean>>];

export interface ThemeProps {
  theme: Theme;
}

export interface Episode {
  episode: string;
  title: string;
  publish_date: string;
}

export interface Recommendation {
  id: string;
  clip?: any;
  episode?: string;
  medium?: string;
  message?: string;
  name?: string;
  isOfficial?: boolean;
  recommendation?: string;
  url?: string;
  winner?: boolean;
  year?: string | number;
}

export interface Clip {
  id: string;
  clip: any;
  episode?: string;
  name?: string;
}
