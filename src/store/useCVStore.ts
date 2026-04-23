import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface Experience {
  // ... (rest of interfaces remain same, just wrapping the store)
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

export interface Language {
  id: string;
  name: string;
  proficiency: string;
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
  languages: Language[];
  metadata: {
    templateId: string;
    themeColor: string;
  };
}

interface CVStore {
  data: CVData;
  updatePersonalInfo: (info: Partial<CVData["personalInfo"]>) => void;
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

  addLanguage: (lang: Language) => void;
  updateLanguage: (id: string, lang: Partial<Language>) => void;
  removeLanguage: (id: string) => void;

  setTemplate: (templateId: string) => void;
  setThemeColor: (color: string) => void;
}

export const initialData: CVData = {
  personalInfo: {
    fullName: "Ly Ly Anh",
    email: "lylyanh135@gmail.com",
    phone: "0917 534 909",
    location: "Ho Chi Minh City, Vietnam",
    summary:
      "<strong>Fullstack Developer & AI Engineer</strong> with hands-on experience building <strong>web applications</strong> and <strong>GPU-accelerated ML inference systems</strong>. Proficient in <strong>React/Next.js</strong> for frontend, <strong>NestJS/FastAPI</strong> for backend, and <strong>NVIDIA Triton/TensorRT</strong> for model serving. Skilled in designing <strong>microservice architectures</strong>, <strong>Docker-based deployments</strong>, and <strong>RAG-powered AI chatbots</strong>. Passionate about bridging software engineering and applied machine learning to deliver end-to-end intelligent solutions.",
  },
  socialLinks: [
    { id: "1", label: "GitHub", url: "github.com/lyanh135531" },
    { id: "2", label: "LinkedIn", url: "linkedin.com/in/lyanh-lian" },
    { id: "3", label: "Portfolio", url: "lylyanh.vercel.app" },
  ],
  experience: [
    {
      id: "1",
      company: "AUTOSERVER VIETNAM",
      position: "Fullstack Developer & AI Engineer",
      startDate: "Jul 2024",
      endDate: "Present",
      description:
        "<ul><li>Designed and deployed a <strong>production ML inference platform</strong> using <strong>NVIDIA Triton Server</strong> and <strong>TensorRT (FP16)</strong>, serving vehicle classification and number plate detection models with optimized GPU utilization.</li><li>Built a <strong>multi-service AI pipeline</strong> (Vision Core) orchestrating <strong>API Gateway</strong>, <strong>YOLO</strong> object detection, <strong>ResNet</strong> classification, and <strong>OCR</strong> services via <strong>Docker Compose</strong> with GPU deployment profiles.</li><li>Developed an <strong>automated data input system</strong> integrating <strong>Keras</strong>-based image classification with <strong>GPT/Gemini</strong>-powered AI analysis, reducing manual data entry workload.</li><li>Architected a <strong>ResNet50 training pipeline</strong> with differential learning rates, <strong>mixed-precision training</strong>, weighted sampling, and <strong>TensorBoard</strong> monitoring for iterative model improvement.</li><li>Created a <strong>Test Lab platform</strong> (<strong>React</strong> + <strong>FastAPI</strong>) for ML model evaluation, featuring image labeling tools, dataset reporting dashboards, and real-time <strong>WebSocket</strong> updates.</li><li>Built a <strong>Docker monitoring solution</strong> for tracking container health, auto-restart policies, and <strong>multi-channel alerting</strong> across production servers.</li></ul>",
    },
    {
      id: "2",
      company: "IDTEK",
      position: "Fullstack Developer & AI Developer",
      startDate: "Jun 2021",
      endDate: "Jun 2024",
      description:
        "<ul><li>Developed and maintained functional modules for various outsourcing web applications, utilizing <strong>React/TypeScript</strong> for frontends and <strong>NestJS</strong> for backend services.</li><li>Assisted in integrating <strong>AI capabilities</strong> into client products by connecting <strong>OpenAI/Gemini APIs</strong> to automate text processing and data categorization tasks.</li><li>Contributed to the development of early-stage <strong>Python/FastAPI</strong> microservices, handling basic data extraction (like <strong>OCR</strong> integrations) to support backend AI workflows.</li><li>Collaborated with senior engineers to implement the company's <strong>Core Base Code</strong> architecture, ensuring <strong>reusable component libraries</strong> and consistent coding standards.</li><li>Wrote and optimized <strong>SQL queries</strong> and database schemas using <strong>PostgreSQL</strong> and <strong>Prisma ORM</strong> to improve system performance.</li></ul>",
    },
  ],
  education: [
    {
      id: "1",
      school: "Ton Duc Thang University",
      degree: "B.S. in Computer Science",
      startDate: "2018",
      endDate: "2022",
    },
  ],
  projects: [
    {
      id: "1",
      name: "ASOP ML Serving — GPU Inference Platform",
      description:
        "Production ML inference system serving <strong>vehicle view classification</strong> (7-class), <strong>car front/rear detection</strong> (ResNet), and <strong>vehicle context detection</strong> (YOLO) using <strong>NVIDIA Triton Server</strong> with <strong>TensorRT FP16</strong> optimization. Handles preprocessing, inference, and postprocessing (NMS, blur) through <strong>FastAPI</strong> endpoints.",
      technologies: [
        "NVIDIA Triton",
        "TensorRT",
        "FastAPI",
        "Docker Compose",
        "CUDA",
      ],
    },
    {
      id: "2",
      name: "ASOP ML Training — ResNet50 Pipeline",
      description:
        "Clean, reproducible <strong>ResNet50 training pipeline</strong> for multi-class image classification. Features <strong>differential learning rates</strong>, <strong>AMP mixed precision</strong>, weighted sampling for imbalanced datasets, gradient clipping, and automated <strong>Teams webhook</strong> notifications on training milestones.",
      technologies: [
        "PyTorch",
        "ResNet50",
        "TensorBoard",
        "Docker",
        "YAML Config",
      ],
    },
    {
      id: "3",
      name: "Vision Core — Multi-Service AI System",
      description:
        "<strong>Microservice architecture</strong> for image classification, <strong>YOLO</strong>-based object detection, number plate censoring, and <strong>OCR</strong>. Features <strong>API Gateway</strong> routing, <strong>Docker Compose</strong> deployment profiles (vision/tools), and <strong>LLM proxy</strong> integration for multi-stage AI processing workflows.",
      technologies: ["FastAPI", "YOLO", "ResNet", "Docker Compose", "Nginx"],
    },
    {
      id: "4",
      name: "ASOP Auto Input — AI-Powered Data Entry",
      description:
        "Automated data input system combining a <strong>Keras</strong> prediction service for image classification with an AI analysis service powered by <strong>GPT</strong> and <strong>Gemini</strong>. Eliminates manual data entry by intelligently categorizing and processing vehicle inspection images.",
      technologies: [
        "FastAPI",
        "Keras",
        "OpenAI API",
        "Gemini",
        "Docker",
        "NVIDIA GPU",
      ],
    },
    {
      id: "5",
      name: "Spiritus — YouTube Shorts Auto Pipeline",
      description:
        "End-to-end <strong>automated YouTube Shorts pipeline</strong>: AI topic generation → script writing → <strong>Edge TTS</strong> voiceover → <strong>Pollinations AI</strong> image generation → <strong>FFmpeg</strong> video compositing → <strong>YouTube upload</strong> with SEO optimization. Runs on scheduled <strong>GitHub Actions</strong> for daily content publishing.",
      technologies: [
        "Python",
        "FFmpeg",
        "Edge TTS",
        "Pollinations AI",
        "YouTube API",
        "GitHub Actions",
      ],
      link: "github.com/lyanh135531",
    },
    {
      id: "6",
      name: "Fullstack Web Platforms — Healthcare & Sports",
      description:
        "Multiple production web applications for <strong>healthcare management</strong> and <strong>sports platform</strong>. Features include rich CRUD operations, <strong>role-based access control</strong>, appointment scheduling, product catalogs, <strong>i18n localization</strong>, and responsive dashboards built with <strong>ShadCN/UI</strong> component library.",
      technologies: [
        "React",
        "NestJS",
        "Prisma",
        "PostgreSQL",
        "TailwindCSS",
        "ShadCN/UI",
      ],
    },
  ],
  skills: [
    { id: "1", name: "React / Next.js / TypeScript" },
    { id: "2", name: "NestJS / FastAPI / Python" },
    { id: "3", name: "NVIDIA Triton / TensorRT / YOLO" },
    { id: "4", name: "Docker / Docker Compose / CI/CD" },
    { id: "5", name: "PostgreSQL / Prisma / Redis" },
    { id: "6", name: "PyTorch / Keras / ML Pipeline" },
    { id: "7", name: "Microservices / System Design" },
  ],
  languages: [
    { id: "1", name: "Vietnamese", proficiency: "Native" },
    { id: "2", name: "English", proficiency: "Intermediate" },
  ],
  metadata: {
    templateId: "silicon-valley",
    themeColor: "#000000",
  },
};

export const useCVStore = create<CVStore>()(
  persist(
    (set) => ({
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
              exp.id === id ? { ...exp, ...updatedExp } : exp,
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
              edu.id === id ? { ...edu, ...updatedEdu } : edu,
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
              project.id === id ? { ...project, ...updatedProject } : project,
            ),
          },
        })),

      removeProject: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            projects: state.data.projects.filter(
              (project) => project.id !== id,
            ),
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
              link.id === id ? { ...link, ...updatedLink } : link,
            ),
          },
        })),

      removeSocialLink: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            socialLinks: state.data.socialLinks.filter(
              (link) => link.id !== id,
            ),
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

      addLanguage: (lang) =>
        set((state) => ({
          data: {
            ...state.data,
            languages: [...(state.data.languages || []), lang],
          },
        })),

      updateLanguage: (id, updatedLang) =>
        set((state) => ({
          data: {
            ...state.data,
            languages: (state.data.languages || []).map((lang) =>
              lang.id === id ? { ...lang, ...updatedLang } : lang,
            ),
          },
        })),

      removeLanguage: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            languages: (state.data.languages || []).filter(
              (lang) => lang.id !== id,
            ),
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
    }),
    {
      name: "resume-ai-storage",
      storage: createJSONStorage(() => localStorage),
      merge: (persistedState: unknown, currentState: CVStore) => {
        // Handle migration of older state that didn't have languages
        const persisted = persistedState as Partial<CVStore>;
        const mergedData = {
          ...currentState.data,
          ...(persisted?.data || {}),
        };

        if (!mergedData.languages) {
          mergedData.languages = [];
        }

        return {
          ...currentState,
          ...(persistedState as Partial<CVStore>),
          data: mergedData,
        };
      },
    },
  ),
);
