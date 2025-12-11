export interface Profile {
  name: string;
  avatar: string;
  coverImage: string;
  universityLogo: string; // Added university logo
  gender: string;
  email: string;
  university: string;
  major: string;
  hometown: string;
  location: string;
  socials: {
    douyin?: string;
    xiaohongshu?: string;
    instagram?: string;
  };
  backgroundBlur?: number; // Added for customizing home page background blur
}

export interface Photo {
  id: number;
  url: string;
  title: string;
  category: string;
  date: string; // ISO format YYYY-MM-DD
  location: string;
}

export interface TravelItem {
  id: number;
  year: string;
  location: string;
  description: string;
  imageUrl?: string;
  coordinates?: { lat: number; lng: number };
  photos: Photo[]; // Album for this trip
}

export interface WorkExperience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string[];
}

export interface Education {
  id: number;
  school: string;
  stage: 'Middle School' | 'High School' | 'Bachelor' | 'Master' | 'PhD' | string;
  period: string;
  // Details
  gaokaoScore?: string;
  major?: string;
  gpa?: string;
  rank?: string;
  english?: string; // CET-4/6
  admissionMethod?: string; // e.g. Baoyan
}

export interface Project {
  id: number;
  name: string;
  role: string;
  period: string;
  description: string;
}

export interface Award {
  id: number;
  name: string;
  date: string;
  level: string;
}

export interface Research {
  id: number;
  title: string;
  publication: string;
  date: string;
  description: string;
}

export interface BlogPost {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  readTime: string;
  category: string;
}