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

export interface CVData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
    github?: string;
    linkedin?: string;
    website?: string;
  };
  experience: Experience[];
  education: Education[];
  skills: Skill[];
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
  
  addSkill: (skill: Skill) => void;
  removeSkill: (id: string) => void;
}

// English Mock Data for better first impression
const initialData: CVData = {
  personalInfo: {
    fullName: 'Johnathan Doe',
    email: 'john.doe@techvision.com',
    phone: '+1 (555) 0123 4567',
    location: 'San Francisco, CA',
    summary: 'Senior Frontend Engineer with 6+ years of experience building high-performance web applications. Expert in React, TypeScript, and modern UI/UX principles. Passionate about creating seamless user experiences with a "Wow" factor.',
  },
  experience: [
    {
      id: '1',
      company: 'InnovateTech Solutions',
      position: 'Senior Frontend Developer',
      startDate: 'Jan 2021',
      endDate: 'Present',
      description: '- Orchestrated the migration of legacy architecture to a micro-frontend setup, improving deploy speed by 50%.\n- Optimized application bundle size by 35% through advanced code-splitting and tree-shaking techniques.\n- Led a team of 4 developers to deliver a premium analytics dashboard used by Fortune 500 clients.',
    }
  ],
  education: [
    {
      id: '1',
      school: 'Stanford University',
      degree: 'B.S. in Computer Science',
      startDate: '2015',
      endDate: '2019',
    }
  ],
  skills: [
    { id: '1', name: 'React / Next.js' },
    { id: '2', name: 'TypeScript' },
    { id: '3', name: 'Design Systems' },
    { id: '4', name: 'Performance Optimization' }
  ],
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
}));
