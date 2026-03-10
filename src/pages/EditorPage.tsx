import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Download, ArrowLeft } from 'lucide-react';
import './EditorPage.css';
import CVPreview from '../components/preview/CVPreview';
import PersonalInfoForm from '../components/editor/PersonalInfoForm';
import ExperienceForm from '../components/editor/ExperienceForm';
import EducationForm from '../components/editor/EducationForm';
import SkillsForm from '../components/editor/SkillsForm';

interface EditorPageProps {
  onBack: () => void;
}

const EditorPage = ({ onBack }: EditorPageProps) => {
  const componentRef = useRef<HTMLDivElement>(null);
  
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
            <button onClick={onBack} className="icon-btn" title="Go Back">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h2 className="text-gradient">Edit Resume</h2>
              <p className="text-muted">Perfect your professional profile</p>
            </div>
          </div>
          <button onClick={() => handlePrint()} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px' }}>
            <Download size={18} /> Download PDF
          </button>
        </div>
        
        <div className="editor-form-container glass-panel">
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--accent-hover)' }}>1. Personal Information</h3>
            <PersonalInfoForm />
            
            <div style={{ margin: '3rem 0', height: '1px', background: 'var(--border-light)' }}></div>
            
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--accent-hover)' }}>2. Work Experience</h3>
            <ExperienceForm />
            
            <div style={{ margin: '3rem 0', height: '1px', background: 'var(--border-light)' }}></div>
            
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--accent-hover)' }}>3. Education</h3>
            <EducationForm />
            
            <div style={{ margin: '3rem 0', height: '1px', background: 'var(--border-light)' }}></div>
            
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--accent-hover)' }}>4. Skills</h3>
            <SkillsForm />
        </div>
      </div>

      {/* Right Panel: Live Preview */}
      <div className="editor-right-panel">
        <div className="preview-container">
            <div className="cv-a4-canvas" ref={componentRef}>
                <CVPreview />
            </div>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
