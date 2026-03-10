import { create } from 'zustand';

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
}

export interface Skill {
  id: string;
  name: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface SocialLink {
  id: string;
  label: string;
  url: string;
}

export interface CVData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
  };
  socialLinks: SocialLink[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  skills: Skill[];
  metadata: {
    templateId: string;
    themeColor: string;
  };
}

interface CVStore {
  data: CVData;
  updatePersonalInfo: (info: Partial<CVData['personalInfo']>) => void;
  addExperience: (exp: Experience) => void;
  updateExperience: (id: string, exp: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  
  addEducation: (edu: Education) => void;
  updateEducation: (id: string, edu: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  
  addProject: (project: Project) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  removeProject: (id: string) => void;

  addSocialLink: (link: SocialLink) => void;
  updateSocialLink: (id: string, link: Partial<SocialLink>) => void;
  removeSocialLink: (id: string) => void;
  
  addSkill: (skill: Skill) => void;
  removeSkill: (id: string) => void;

  setTemplate: (templateId: string) => void;
  setThemeColor: (color: string) => void;
}

const initialData: CVData = {
  personalInfo: {
    fullName: 'Johnathan Doe',
    email: 'johnathan.dev@techlabs.io',
    phone: '+1 (555) 987 6543',
    location: 'San Francisco, CA',
    summary: 'Senior Fullstack Engineer with 8+ years of experience specialized in distributed systems and high-scale web architectures. Proven track record at FAANG-level companies, delivering features that serve 10M+ DAU. Expert in React, Node.js, and Cloud-native technologies with a focus on performance optimization and developer productivity.',
  },
  socialLinks: [
    { id: '1', label: 'GitHub', url: 'github.com/johndoe-dev' },
    { id: '2', label: 'LinkedIn', url: 'linkedin.com/in/johndoe-engineer' },
    { id: '3', label: 'Portfolio', url: 'johndoe.tech' }
  ],
  experience: [
    {
      id: '1',
      company: 'CloudScale Systems (FAANG)',
      position: 'Senior Fullstack Engineer',
      startDate: 'Jan 2021',
      endDate: 'Present',
      description: '- Architected a real-time data synchronization engine using WebSocket and Redis, reducing latency by 45% for 2M concurrent users.\n- Led the migration of a monolithic checkout flow to a distributed micro-frontend architecture, resulting in a 25% increase in conversion rate and $5M+ additional annual revenue.\n- Optimized CI/CD pipelines using Docker and Kubernetes, cut build times by 60%, and increased deployment frequency from weekly to 5x daily.',
    },
    {
      id: '2',
      company: 'TechFlow Interactive',
      position: 'Fullstack Developer',
      startDate: 'June 2018',
      endDate: 'Dec 2020',
      description: '- Developed a highly reusable React component library used across 12 product teams, reducing UI development time by 40%.\n- Re-engineered the backend API using Node.js and PostgreSQL, improving query response times by 70% through advanced indexing and caching strategies.\n- Implemented automated E2E testing using Cypress, reducing production bugs by 35% within the first 6 months.',
    }
  ],
  education: [
    {
      id: '1',
      school: 'Stanford University',
      degree: 'M.S. in Computer Science (Concentration in Systems)',
      startDate: '2016',
      endDate: '2018',
    }
  ],
  projects: [
    {
      id: '1',
      name: 'OpenStream: High-Performance Video Transcoder',
      description: 'Built a distributed video transcoding platform handling 10,000+ requests daily. Leveraged FFmpeg and Go to achieve 3x faster processing compared to standard cloud solutions.',
      technologies: ['Go', 'FFmpeg', 'Docker', 'AWS S3'],
      link: 'github.com/johndoe/openstream'
    },
    {
      id: '2',
      name: 'AI-Powered Code Reviewer',
      description: 'Developed a GitHub Action that uses LLMs to provide automated code quality feedback. Reduced pull request review time by 20% for a community of 500+ developers.',
      technologies: ['Python', 'OpenAI API', 'GitHub Actions', 'Node.js'],
      link: 'github.com/johndoe/code-ai'
    }
  ],
  skills: [
    { id: '1', name: 'React / Next.js / TypeScript' },
    { id: '2', name: 'Node.js / Go / Python' },
    { id: '3', name: 'AWS / Kubernetes / Docker' },
    { id: '4', name: 'System Design / Microservices' },
    { id: '5', name: 'Redis / PostgreSQL / MongoDB' }
  ],
  metadata: {
    templateId: 'silicon-valley',
    themeColor: '#000000',
  }
};

export const useCVStore = create<CVStore>((set) => ({
  data: initialData,
  
  updatePersonalInfo: (info) =>
    set((state) => ({
      data: {
        ...state.data,
        personalInfo: { ...state.data.personalInfo, ...info },
      },
    })),
    
  addExperience: (exp) =>
    set((state) => ({
      data: {
        ...state.data,
        experience: [...state.data.experience, exp],
      },
    })),
    
  updateExperience: (id, updatedExp) =>
    set((state) => ({
      data: {
        ...state.data,
        experience: state.data.experience.map((exp) =>
          exp.id === id ? { ...exp, ...updatedExp } : exp
        ),
      },
    })),
    
  removeExperience: (id) =>
    set((state) => ({
      data: {
        ...state.data,
        experience: state.data.experience.filter((exp) => exp.id !== id),
      },
    })),

  addEducation: (edu) =>
    set((state) => ({
      data: {
        ...state.data,
        education: [...state.data.education, edu],
      },
    })),
    
  updateEducation: (id, updatedEdu) =>
    set((state) => ({
      data: {
        ...state.data,
        education: state.data.education.map((edu) =>
          edu.id === id ? { ...edu, ...updatedEdu } : edu
        ),
      },
    })),
    
  removeEducation: (id) =>
    set((state) => ({
      data: {
        ...state.data,
        education: state.data.education.filter((edu) => edu.id !== id),
      },
    })),

  addProject: (project) =>
    set((state) => ({
      data: {
        ...state.data,
        projects: [...state.data.projects, project],
      },
    })),
    
  updateProject: (id, updatedProject) =>
    set((state) => ({
      data: {
        ...state.data,
        projects: state.data.projects.map((project) =>
          project.id === id ? { ...project, ...updatedProject } : project
        ),
      },
    })),
    
  removeProject: (id) =>
    set((state) => ({
      data: {
        ...state.data,
        projects: state.data.projects.filter((project) => project.id !== id),
      },
    })),

  addSocialLink: (link) =>
    set((state) => ({
      data: {
        ...state.data,
        socialLinks: [...state.data.socialLinks, link],
      },
    })),
    
  updateSocialLink: (id, updatedLink) =>
    set((state) => ({
      data: {
        ...state.data,
        socialLinks: state.data.socialLinks.map((link) =>
          link.id === id ? { ...link, ...updatedLink } : link
        ),
      },
    })),
    
  removeSocialLink: (id) =>
    set((state) => ({
      data: {
        ...state.data,
        socialLinks: state.data.socialLinks.filter((link) => link.id !== id),
      },
    })),

  addSkill: (skill) =>
     set((state) => ({
      data: {
        ...state.data,
        skills: [...state.data.skills, skill],
      },
    })),

  removeSkill: (id) =>
     set((state) => ({
      data: {
        ...state.data,
        skills: state.data.skills.filter((skill) => skill.id !== id),
      },
    })),

  setTemplate: (templateId) =>
    set((state) => ({
      data: {
        ...state.data,
        metadata: { ...state.data.metadata, templateId },
      },
    })),

  setThemeColor: (themeColor) =>
    set((state) => ({
      data: {
        ...state.data,
        metadata: { ...state.data.metadata, themeColor },
      },
    })),
}));
