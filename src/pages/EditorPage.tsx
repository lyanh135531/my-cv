import { useRef, useState, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Download, ArrowLeft, Code } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './EditorPage.css';
import CVPreview from '../components/preview/CVPreview';
import PersonalInfoForm from '../components/editor/PersonalInfoForm';
import ExperienceForm from '../components/editor/ExperienceForm';
import EducationForm from '../components/editor/EducationForm';
import SkillsForm from '../components/editor/SkillsForm';
import ProjectsForm from '../components/editor/ProjectsForm';
import SocialLinksForm from '../components/editor/SocialLinksForm';
import LanguagesForm from '../components/editor/LanguagesForm';
import LanguageSwitcher from '../components/LanguageSwitcher';

interface EditorPageProps {
  onBack: () => void;
}

const useScaling = (containerRef: React.RefObject<HTMLDivElement | null>, targetRef: React.RefObject<HTMLDivElement | null>) => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && targetRef.current) {
        const containerWidth = containerRef.current.offsetWidth - 64; // Minus padding
        const targetWidth = 210 * 3.7795275591; // 210mm in pixels (96dpi)
        
        if (containerWidth < targetWidth) {
          setScale(containerWidth / targetWidth);
        } else {
          setScale(1);
        }
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    
    handleResize();
    return () => resizeObserver.disconnect();
  }, [containerRef, targetRef]);

  return scale;
};

const EditorPage = ({ onBack }: EditorPageProps) => {
  const { t } = useTranslation();
  const componentRef = useRef<HTMLDivElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const scale = useScaling(previewContainerRef, componentRef);
  
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: 'My_Premium_Resume',
  });

  return (
    <div className="editor-layout">
      {/* Left Panel: Inputs */}
      <div className="editor-left-panel">
        <div className="editor-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={onBack} className="icon-btn" title={t('editor.goBack')}>
              <ArrowLeft size={20} />
            </button>
            <div style={{
              width: '32px',
              height: '32px',
              background: 'linear-gradient(135deg, var(--accent-base), var(--accent-glow))',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)'
            }}>
                <Code size={18} color="white" />
            </div>
            <div>
              <h2 className="text-gradient" style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.5px' }}>{t('editor.resumeAI')}</h2>
              <p className="text-muted" style={{ fontSize: '0.75rem', marginTop: '-2px' }}>{t('editor.professionalEditor')}</p>
            </div>
            <LanguageSwitcher />
          </div>
          <button onClick={() => handlePrint()} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px' }}>
            <Download size={18} /> {t('editor.downloadPDF')}
          </button>
        </div>
        
        <div className="editor-form-container glass-panel">
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--accent-hover)' }}>{t('editor.sectionPersonalInfo')}</h3>
            <PersonalInfoForm />
            
            <h3 style={{ marginBottom: '1.5rem', marginTop: '2rem', color: 'var(--accent-hover)' }}>{t('editor.sectionLinks')}</h3>
            <SocialLinksForm />
            
            <div style={{ margin: '3rem 0', height: '1px', background: 'var(--border-light)' }}></div>
            
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--accent-hover)' }}>{t('editor.sectionExperience')}</h3>
            <ExperienceForm />
            
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--accent-hover)' }}>{t('editor.sectionProjects')}</h3>
            <ProjectsForm />
            
            <div style={{ margin: '3rem 0', height: '1px', background: 'var(--border-light)' }}></div>
            
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--accent-hover)' }}>{t('editor.sectionEducation')}</h3>
            <EducationForm />
            
            <div style={{ margin: '3rem 0', height: '1px', background: 'var(--border-light)' }}></div>
            
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--accent-hover)' }}>{t('editor.sectionSkills')}</h3>
            <SkillsForm />
            
            <div style={{ margin: '3rem 0', height: '1px', background: 'var(--border-light)' }}></div>
            
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--accent-hover)' }}>{t('editor.sectionLanguages')}</h3>
            <LanguagesForm />
        </div>
      </div>

      {/* Right Panel: Live Preview */}
      <div className="editor-right-panel">
        <div className="preview-container" ref={previewContainerRef}>
            <div 
              className="cv-a4-canvas" 
              ref={componentRef}
              style={{ transform: `scale(${scale})` }}
            >
                <CVPreview />
            </div>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
