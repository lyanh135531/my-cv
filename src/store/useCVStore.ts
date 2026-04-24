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
      "<strong>AI Engineer</strong> with 3+ years of experience specializing in <strong>Deep Learning</strong>, <strong>Computer Vision</strong>, and <strong>Generative AI (LLMs)</strong>. Proven track record of architecting <strong>GPU-accelerated ML inference systems</strong> utilizing <strong>NVIDIA Triton Server</strong> and <strong>TensorRT (FP16)</strong> for high-throughput, low-latency deployments. Expertise in engineering end-to-end <strong>PyTorch training pipelines</strong> and building robust <strong>Agentic RAG frameworks</strong> to power hallucination-free corporate chatbots. Passionate about pushing the boundaries of applied machine learning and transforming complex AI models into scalable, production-ready solutions.",
  },
  socialLinks: [
    { id: "1", label: "GitHub", url: "github.com/lyanh135531" },
    { id: "2", label: "LinkedIn", url: "linkedin.com/in/lyanh-lian" },
  ],
  experience: [
    {
      id: "1",
      company: "AUTOSERVER VIETNAM",
      position: "AI Engineer",
      startDate: "Jul 2024",
      endDate: "Present",
      description:
        "<ul><li>Led the deployment of high-throughput computer vision models (YOLO, ResNet) to production via <strong>NVIDIA Triton Inference Server</strong>. Implemented <strong>TensorRT FP16 quantization</strong> and dynamic batching to maximize concurrent GPU (CUDA) utilization.</li><li>Architected scalable <strong>Python/FastAPI</strong> microservices to orchestrate multi-stage AI pipelines (object detection → plate censoring → OCR), integrating an <strong>LLM proxy gateway</strong> to route requests dynamically across model ensembles.</li><li>Engineered reproducible, automated <strong>PyTorch</strong> training workflows for highly imbalanced datasets. Applied <strong>AMP mixed-precision</strong>, <strong>WeightedRandomSampler</strong>, and differential learning rates to significantly boost classification accuracy.</li><li>Developed an advanced <strong>Agentic RAG Chatbot</strong> leveraging <strong>GPT/Gemini</strong> and custom <strong>LLM tool-routers</strong>. Implemented intent classification, contextual memory, and strict verification logic to guarantee hallucination-free corporate FAQ responses.</li><li>Built a centralized ML evaluation and active learning platform, integrating continuous dataset annotation tools and real-time performance tracking for iterative model improvements.</li><li>Designed custom <strong>MLOps tracking solutions</strong> to monitor distributed GPU container health, automating recovery policies to ensure high availability for critical inference nodes.</li></ul>",
    },
    {
      id: "2",
      company: "IDTEK",
      position: "Backend & AI Developer",
      startDate: "Jun 2021",
      endDate: "Jun 2024",
      description:
        "<ul><li>Architected and scaled backend services for enterprise management platforms (HRM, IDTASK, IDSPACE) using <strong>NestJS, Python</strong>, and <strong>PostgreSQL</strong>, ensuring high availability for thousands of daily corporate users.</li><li>Spearheaded the integration of <strong>Generative AI</strong> into the HRM system, developing an automated CV screening and candidate ranking pipeline utilizing <strong>OpenAI APIs</strong> and custom prompting strategies.</li><li>Engineered an intelligent task summarization and categorization microservice for IDTASK using <strong>FastAPI</strong> and <strong>LLMs</strong>, reducing manual project management overhead by 30%.</li><li>Optimized complex <strong>SQL queries</strong> and implemented caching layers via <strong>Prisma ORM</strong> and <strong>Redis</strong>, significantly improving data retrieval efficiency and reducing overall API response times by 40%.</li></ul>",
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
      name: "ASNET",
      description:
        "<strong>Team Size:</strong> 5 members <br/>Engineered a production-grade enterprise AI ecosystem, bridging machine learning research with scalable backend microservices to automate complex business operations.<br/><ul><li><strong>High-Performance Inference:</strong> Deployed vehicle classification (ResNet50) and context detection (YOLO) models to a centralized <strong>NVIDIA Triton Inference Server</strong>. Applied <strong>TensorRT FP16 quantization</strong> and dynamic batching, orchestrating preprocessing, NMS, and blurring via optimized <strong>FastAPI</strong> endpoints.</li><li><strong>Microservice Architecture:</strong> Architected a multi-service AI mesh managed via <strong>Docker Compose</strong> deployment profiles. Built an <strong>Nginx API Gateway</strong> with an internal LLM proxy to orchestrate complex multi-stage workflows (e.g., object detection → plate censoring → OCR).</li><li><strong>Automated Training Pipelines:</strong> Engineered reproducible <strong>PyTorch</strong> training workflows for imbalanced datasets. Implemented <strong>AMP mixed-precision</strong>, differential learning rates, and <strong>WeightedRandomSampler</strong>, alongside <strong>TensorBoard</strong> tracking and automated Teams webhook epoch alerts.</li><li><strong>Agentic RAG Chatbot:</strong> Engineered an <strong>Agentic RAG</strong> corporate chatbot incorporating <strong>tool-calling routers</strong> for dynamic intent classification. Implemented strict FAQ best practices: <strong>contextual memory</strong> for multi-turn follow-ups, <strong>confidence-threshold fallbacks</strong>, and an internal <strong>self-verification layer</strong> to guarantee zero-hallucination policy responses.</li></ul>",
      technologies: [
        "Python",
        "PyTorch / Keras",
        "NVIDIA Triton Server",
        "TensorRT (FP16)",
        "CUDA",
        "Agentic RAG / LLMs",
        "OpenAI API / Gemini",
        "FastAPI / Docker Compose",
      ],
      link: "AUTOSERVER VIETNAM"
    },
    {
      id: "6",
      name: "IDSPACE",
      description:
        "<strong>Role:</strong> Backend & AI Developer<br/>Architected the core backend services and integrated Applied AI features for IDSPACE, a large-scale corporate workspace platform.<br/><ul><li><strong>Backend Architecture:</strong> Engineered scalable RESTful APIs utilizing <strong>NestJS</strong> and <strong>PostgreSQL</strong>. Implemented robust authentication, <strong>Redis</strong> caching layers, and optimized <strong>Prisma ORM</strong> queries to support high-concurrency corporate traffic and minimize latency by 40%.</li><li><strong>Intelligent Data Extraction:</strong> Built an automated document processing microservice using <strong>Python</strong> and <strong>FastAPI</strong>. Integrated <strong>OCR engines</strong> and <strong>Gemini LLMs</strong> to extract structured entities (vendor names, dates, financial values) from unstructured PDF invoices and contracts.</li></ul>",
      technologies: [
        "NestJS",
        "Python / FastAPI",
        "PostgreSQL / Redis",
        "Prisma ORM",
        "OpenAI API"
      ],
      link: "IDTEK",
    },
  ],
  skills: [
    { id: "1", name: "Machine Learning: PyTorch, Keras, YOLO, ResNet" },
    { id: "2", name: "GPU Inference: NVIDIA Triton, TensorRT FP16, CUDA" },
    { id: "3", name: "Generative AI: Agentic RAG, GPT/Gemini, Tool-calling" },
    { id: "4", name: "Backend: Python, FastAPI, Microservices Architecture" },
    { id: "5", name: "MLOps: Docker Compose, Nginx" },
    { id: "6", name: "Databases: PostgreSQL, Redis, Vector DBs (Qdrant)" },
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
