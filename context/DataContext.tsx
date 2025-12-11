import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Profile, Photo, TravelItem, WorkExperience, BlogPost, Education, Project, Award, Research } from '../types';
import { USER_PROFILE, PHOTOS, TRAVEL_LOGS, WORK_DATA, BLOG_POSTS, EDUCATION_DATA, PROJECT_DATA, AWARD_DATA, RESEARCH_DATA } from '../constants';

interface DataContextType {
  profile: Profile;
  photos: Photo[];
  travelLogs: TravelItem[];
  workData: WorkExperience[];
  educationData: Education[];
  projectData: Project[];
  awardData: Award[];
  researchData: Research[];
  blogPosts: BlogPost[];
  
  updateProfile: (data: Partial<Profile>) => void;
  
  addPhoto: (photo: Photo) => void;
  updatePhoto: (id: number, data: Partial<Photo>) => void;
  deletePhoto: (id: number) => void;
  
  addTravelLog: (log: TravelItem) => void;
  updateTravelLog: (id: number, data: Partial<TravelItem>) => void;
  deleteTravelLog: (id: number) => void;
  addTravelPhoto: (travelId: number, photo: Photo) => void;
  deleteTravelPhoto: (travelId: number, photoId: number) => void;
  setTravelCover: (travelId: number, photoUrl: string) => void;
  
  // Resume Actions
  addWorkItem: (item: WorkExperience) => void;
  updateWorkItem: (id: number, data: Partial<WorkExperience>) => void;
  deleteWorkItem: (id: number) => void;
  
  addEducation: (item: Education) => void;
  updateEducation: (id: number, data: Partial<Education>) => void;
  deleteEducation: (id: number) => void;

  addProject: (item: Project) => void;
  updateProject: (id: number, data: Partial<Project>) => void;
  deleteProject: (id: number) => void;

  addAward: (item: Award) => void;
  updateAward: (id: number, data: Partial<Award>) => void;
  deleteAward: (id: number) => void;

  addResearch: (item: Research) => void;
  updateResearch: (id: number, data: Partial<Research>) => void;
  deleteResearch: (id: number) => void;
  
  addBlogPost: (post: BlogPost) => void;
  updateBlogPost: (id: number, data: Partial<BlogPost>) => void;
  deleteBlogPost: (id: number) => void;

  exportDataAsTypeScript: () => string;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Helper to load data from localStorage or fallback to constants
const getInitialData = <T,>(key: string, fallback: T): T => {
    try {
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) : fallback;
    } catch (e) {
        console.warn(`Error parsing localStorage for ${key}`, e);
        return fallback;
    }
};

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state from LocalStorage (lazy initialization)
  const [profile, setProfile] = useState<Profile>(() => getInitialData('app_profile', USER_PROFILE));
  const [photos, setPhotos] = useState<Photo[]>(() => getInitialData('app_photos', PHOTOS));
  const [travelLogs, setTravelLogs] = useState<TravelItem[]>(() => getInitialData('app_travel', TRAVEL_LOGS));
  
  const [workData, setWorkData] = useState<WorkExperience[]>(() => getInitialData('app_work', WORK_DATA));
  const [educationData, setEducationData] = useState<Education[]>(() => getInitialData('app_edu', EDUCATION_DATA));
  const [projectData, setProjectData] = useState<Project[]>(() => getInitialData('app_proj', PROJECT_DATA));
  const [awardData, setAwardData] = useState<Award[]>(() => getInitialData('app_award', AWARD_DATA));
  const [researchData, setResearchData] = useState<Research[]>(() => getInitialData('app_res', RESEARCH_DATA));
  
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => getInitialData('app_blog', BLOG_POSTS));

  // --- Persistence Effects: Save to LocalStorage whenever state changes ---
  useEffect(() => localStorage.setItem('app_profile', JSON.stringify(profile)), [profile]);
  useEffect(() => localStorage.setItem('app_photos', JSON.stringify(photos)), [photos]);
  useEffect(() => localStorage.setItem('app_travel', JSON.stringify(travelLogs)), [travelLogs]);
  useEffect(() => localStorage.setItem('app_work', JSON.stringify(workData)), [workData]);
  useEffect(() => localStorage.setItem('app_edu', JSON.stringify(educationData)), [educationData]);
  useEffect(() => localStorage.setItem('app_proj', JSON.stringify(projectData)), [projectData]);
  useEffect(() => localStorage.setItem('app_award', JSON.stringify(awardData)), [awardData]);
  useEffect(() => localStorage.setItem('app_res', JSON.stringify(researchData)), [researchData]);
  useEffect(() => localStorage.setItem('app_blog', JSON.stringify(blogPosts)), [blogPosts]);

  // --- Export Function ---
  const exportDataAsTypeScript = () => {
    return `
import { Profile, Photo, TravelItem, WorkExperience, BlogPost, Education, Project, Award, Research } from './types';

export const USER_PROFILE: Profile = ${JSON.stringify(profile, null, 2)};

export const PHOTOS: Photo[] = ${JSON.stringify(photos, null, 2)};

export const TRAVEL_LOGS: TravelItem[] = ${JSON.stringify(travelLogs, null, 2)};

export const WORK_DATA: WorkExperience[] = ${JSON.stringify(workData, null, 2)};

export const EDUCATION_DATA: Education[] = ${JSON.stringify(educationData, null, 2)};

export const PROJECT_DATA: Project[] = ${JSON.stringify(projectData, null, 2)};

export const AWARD_DATA: Award[] = ${JSON.stringify(awardData, null, 2)};

export const RESEARCH_DATA: Research[] = ${JSON.stringify(researchData, null, 2)};

export const BLOG_POSTS: BlogPost[] = ${JSON.stringify(blogPosts, null, 2)};
`;
  };

  const updateProfile = (data: Partial<Profile>) => {
    setProfile(prev => ({ ...prev, ...data }));
  };

  const addPhoto = (photo: Photo) => {
    setPhotos(prev => [photo, ...prev]);
  };

  const updatePhoto = (id: number, data: Partial<Photo>) => {
    setPhotos(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
  };

  const deletePhoto = (id: number) => {
    setPhotos(prev => prev.filter(p => p.id !== id));
  };

  const addTravelLog = (log: TravelItem) => {
    setTravelLogs(prev => [log, ...prev]);
  };

  const updateTravelLog = (id: number, data: Partial<TravelItem>) => {
    setTravelLogs(prev => prev.map(t => t.id === id ? { ...t, ...data } : t));
  };

  const deleteTravelLog = (id: number) => {
    setTravelLogs(prev => prev.filter(t => t.id !== id));
  };

  const addTravelPhoto = (travelId: number, photo: Photo) => {
    setTravelLogs(prev => prev.map(t => {
      if (t.id === travelId) {
        return { ...t, photos: [photo, ...t.photos] };
      }
      return t;
    }));
  };

  const deleteTravelPhoto = (travelId: number, photoId: number) => {
      setTravelLogs(prev => prev.map(t => {
          if (t.id === travelId) {
              return { ...t, photos: t.photos.filter(p => p.id !== photoId) };
          }
          return t;
      }));
  };

  const setTravelCover = (travelId: number, photoUrl: string) => {
    setTravelLogs(prev => prev.map(t => 
      t.id === travelId ? { ...t, imageUrl: photoUrl } : t
    ));
  };

  // Resume Action Implementations
  const addWorkItem = (item: WorkExperience) => setWorkData(prev => [item, ...prev]);
  const updateWorkItem = (id: number, data: Partial<WorkExperience>) => setWorkData(prev => prev.map(r => r.id === id ? { ...r, ...data } : r));
  const deleteWorkItem = (id: number) => setWorkData(prev => prev.filter(r => r.id !== id));

  const addEducation = (item: Education) => setEducationData(prev => [item, ...prev]);
  const updateEducation = (id: number, data: Partial<Education>) => setEducationData(prev => prev.map(e => e.id === id ? { ...e, ...data } : e));
  const deleteEducation = (id: number) => setEducationData(prev => prev.filter(e => e.id !== id));

  const addProject = (item: Project) => setProjectData(prev => [item, ...prev]);
  const updateProject = (id: number, data: Partial<Project>) => setProjectData(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
  const deleteProject = (id: number) => setProjectData(prev => prev.filter(p => p.id !== id));

  const addAward = (item: Award) => setAwardData(prev => [item, ...prev]);
  const updateAward = (id: number, data: Partial<Award>) => setAwardData(prev => prev.map(a => a.id === id ? { ...a, ...data } : a));
  const deleteAward = (id: number) => setAwardData(prev => prev.filter(a => a.id !== id));

  const addResearch = (item: Research) => setResearchData(prev => [item, ...prev]);
  const updateResearch = (id: number, data: Partial<Research>) => setResearchData(prev => prev.map(r => r.id === id ? { ...r, ...data } : r));
  const deleteResearch = (id: number) => setResearchData(prev => prev.filter(r => r.id !== id));

  const addBlogPost = (post: BlogPost) => {
    setBlogPosts(prev => [post, ...prev]);
  };

  const updateBlogPost = (id: number, data: Partial<BlogPost>) => {
    setBlogPosts(prev => prev.map(b => b.id === id ? { ...b, ...data } : b));
  };

  const deleteBlogPost = (id: number) => {
    setBlogPosts(prev => prev.filter(b => b.id !== id));
  };

  return (
    <DataContext.Provider value={{
      profile, photos, travelLogs, workData, educationData, projectData, awardData, researchData, blogPosts,
      updateProfile,
      addPhoto, updatePhoto, deletePhoto,
      addTravelLog, updateTravelLog, deleteTravelLog, addTravelPhoto, deleteTravelPhoto, setTravelCover,
      addWorkItem, updateWorkItem, deleteWorkItem,
      addEducation, updateEducation, deleteEducation,
      addProject, updateProject, deleteProject,
      addAward, updateAward, deleteAward,
      addResearch, updateResearch, deleteResearch,
      addBlogPost, updateBlogPost, deleteBlogPost,
      exportDataAsTypeScript
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

// Helper for image upload
export const readFileAsDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const confirmDelete = (): boolean => {
    return window.confirm("确认要删除吗？此操作无法撤销。");
};