import { Profile, Photo, TravelItem, WorkExperience, BlogPost, Education, Project, Award, Research } from './types';

export const USER_PROFILE: Profile = {
  name: "宁相博",
  gender: "Male",
  email: "2025286190130@whu.edu.cn",
  university: "Wuhan University",
  major: "遥感科学与技术",
  hometown: "Shanghai, China",
  location: "Wuhan, China",
  avatar: "https://picsum.photos/id/64/400/400",
  coverImage: "https://picsum.photos/id/19/1920/1080",
  universityLogo: "https://upload.wikimedia.org/wikipedia/zh/3/36/Wuhan_University_Logo.svg",
  socials: {
    douyin: "ningxiangbo",
    xiaohongshu: "2683730115",
    instagram: "linukxiaoyu"
  },
  backgroundBlur: 40 // Default blur amount
};

export const PHOTOS: Photo[] = [
  { id: 1, url: "https://picsum.photos/id/1015/800/600", title: "Alpine Lake", category: "Nature", date: "2024-06-15", location: "Banff, Canada" },
  { id: 2, url: "https://picsum.photos/id/103/800/1200", title: "Urban Steps", category: "City", date: "2024-04-10", location: "Tokyo, Japan" },
  { id: 3, url: "https://picsum.photos/id/1043/800/800", title: "Minimalism", category: "Abstract", date: "2023-11-05", location: "Copenhagen, Denmark" },
  { id: 4, url: "https://picsum.photos/id/1050/800/600", title: "Raw Industrial", category: "City", date: "2023-08-22", location: "Berlin, Germany" },
  { id: 5, url: "https://picsum.photos/id/106/800/1200", title: "Golden Hour", category: "Nature", date: "2022-09-15", location: "Kyoto, Japan" },
  { id: 6, url: "https://picsum.photos/id/117/800/800", title: "Summit", category: "Travel", date: "2022-05-30", location: "Swiss Alps" },
  { id: 7, url: "https://picsum.photos/id/237/800/600", title: "Street Companion", category: "Life", date: "2024-01-12", location: "Shanghai, China" },
  { id: 8, url: "https://picsum.photos/id/28/800/600", title: "Forest Path", category: "Nature", date: "2023-10-01", location: "Oregon, USA" },
];

export const TRAVEL_LOGS: TravelItem[] = [
  { 
    id: 1, 
    year: "2024", 
    location: "Kyoto, Japan", 
    description: "Exploring ancient temples and autumn foliage.", 
    imageUrl: "https://picsum.photos/id/1016/600/400",
    photos: [] 
  },
  { 
    id: 2, 
    year: "2023", 
    location: "Reykjavik, Iceland", 
    description: "Chasing the northern lights and geothermal springs.", 
    imageUrl: "https://picsum.photos/id/1036/600/400",
    photos: [] 
  },
  { 
    id: 3, 
    year: "2022", 
    location: "Paris, France", 
    description: "Architecture tours and cafe culture.", 
    imageUrl: "https://picsum.photos/id/1041/600/400",
    photos: [] 
  },
];

export const WORK_DATA: WorkExperience[] = [
  {
    id: 1,
    role: "Senior Product Designer",
    company: "TechFlow Inc.",
    period: "2022 - Present",
    description: [
      "Led the redesign of the core mobile application, increasing user retention by 25%.",
      "Established a new design system used across 4 different product lines.",
      "Mentored junior designers and conducted weekly design critiques."
    ]
  },
  {
    id: 2,
    role: "Frontend Engineer",
    company: "Creative Solutions",
    period: "2019 - 2022",
    description: [
      "Developed responsive web interfaces using React and TypeScript.",
      "Optimized website performance, achieving a 98/100 Lighthouse score.",
      "Collaborated closely with UX designers to implement pixel-perfect designs."
    ]
  }
];

export const EDUCATION_DATA: Education[] = [
  { id: 1, school: "Wuhan University", stage: "Master", period: "2023 - 2026", major: "Computer Science", admissionMethod: "Baoyan (Recommended)" },
  { id: 2, school: "Wuhan University", stage: "Bachelor", period: "2019 - 2023", major: "Software Engineering", gpa: "3.8/4.0", rank: "Top 5%", english: "CET-6: 620" },
  { id: 3, school: "Shanghai High School", stage: "High School", period: "2016 - 2019", gaokaoScore: "630" }
];

export const PROJECT_DATA: Project[] = [
  { id: 1, name: "Smart Campus App", role: "Team Lead", period: "2023", description: "Developed a comprehensive mobile app for campus services using Flutter and Go." },
];

export const AWARD_DATA: Award[] = [
  { id: 1, name: "National Scholarship", date: "2022", level: "National" },
  { id: 2, name: "ICPC Regional Gold Medal", date: "2021", level: "Regional" },
];

export const RESEARCH_DATA: Research[] = [
  { id: 1, title: "AI in Urban Planning", publication: "IEEE Access", date: "2024", description: "Proposed a novel algorithm for optimizing traffic flow using reinforcement learning." }
];

export const BLOG_POSTS: BlogPost[] = [
  { id: 1, title: "The Art of Digital Minimalism", date: "Oct 12, 2024", excerpt: "How reducing digital clutter can lead to a more focused and creative life.", readTime: "5 min read", category: "Lifestyle" },
  { id: 2, title: "Designing for Accessibility", date: "Sep 28, 2024", excerpt: "Why inclusive design is not just a requirement, but a better experience for everyone.", readTime: "8 min read", category: "Design" },
  { id: 3, title: "A Weekend in Kyoto", date: "Aug 15, 2024", excerpt: "My photo journal and itinerary from a quick getaway to Japan's ancient capital.", readTime: "4 min read", category: "Travel" },
  { id: 4, title: "React 19: What to Expect", date: "July 02, 2024", excerpt: "A deep dive into the upcoming features of the React ecosystem.", readTime: "10 min read", category: "Tech" },
];