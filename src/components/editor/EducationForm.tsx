import { useCVStore } from '../../store/useCVStore';
import { Plus, Trash2 } from 'lucide-react';
import './FormInputs.css';

const EducationForm = () => {
  const educations = useCVStore((state) => state.data.education);
  const addEducation = useCVStore((state) => state.addEducation);
  const updateEducation = useCVStore((state) => state.updateEducation);
  const removeEducation = useCVStore((state) => state.removeEducation);

  const handleAdd = () => {
    addEducation({
      id: crypto.randomUUID(),
      school: '',
      degree: '',
      startDate: '',
      endDate: '',
    });
  };

  return (
    <div className="form-section">
      {educations.map((edu, index) => (
        <div key={edu.id} className="experience-card glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem', background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
               <h4 style={{ margin: 0, color: 'var(--text-primary)', opacity: 0.7 }}>Education #{index + 1}</h4>
               <button onClick={() => removeEducation(edu.id)} className="icon-btn danger-hover" title="Remove this entry">
                 <Trash2 size={18} />
               </button>
            </div>
            
            <div className="form-grid">
              <div className="form-group span-2">
                <label>University / School</label>
                <input 
                  type="text" 
                  className="glass-input" 
                  placeholder="e.g., Harvard University"
                  value={edu.school}
                  onChange={(e) => updateEducation(edu.id, { school: e.target.value })}
                />
              </div>
              <div className="form-group span-2">
                <label>Degree / Field of Study</label>
                <input 
                  type="text" 
                  className="glass-input" 
                  placeholder="e.g., Master of Computer Science"
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Start Year</label>
                <input 
                  type="text" 
                  className="glass-input" 
                  placeholder="YYYY"
                  value={edu.startDate}
                  onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>End Year (or Expected)</label>
                <input 
                  type="text" 
                  className="glass-input" 
                  placeholder="YYYY"
                  value={edu.endDate}
                  onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                />
              </div>
            </div>
        </div>
      ))}
      <button className="btn-secondary" onClick={handleAdd} style={{ width: '100%', padding: '14px', borderStyle: 'dashed', background: 'transparent', opacity: 0.6 }}>
        <Plus size={18} style={{ marginRight: '8px' }} /> Add New Education
      </button>
    </div>
  );
};

export default EducationForm;
