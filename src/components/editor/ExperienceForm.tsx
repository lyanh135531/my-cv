import { useCVStore } from '../../store/useCVStore';
import { Plus, Trash2, Wand2, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { optimizeExperienceDescription } from '../../store/aiService';
import { useState } from 'react';
import RichTextEditor from '../ui/RichTextEditor';
import './FormInputs.css';

const ExperienceForm = () => {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const experiences = useCVStore((state) => state.data.experience);
  const addExperience = useCVStore((state) => state.addExperience);
  const updateExperience = useCVStore((state) => state.updateExperience);
  const removeExperience = useCVStore((state) => state.removeExperience);

  const handleAdd = () => {
    addExperience({
      id: crypto.randomUUID(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
    });
  };

  const handleAI = async (id: string, position: string, company: string, description: string) => {
    setLoadingId(id);
    try {
      const optimized = await optimizeExperienceDescription(position, company, description);
      updateExperience(id, { description: optimized });
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="form-section">
      <AnimatePresence>
        {experiences.map((exp, index) => (
          <motion.div 
            key={exp.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="experience-card glass-panel"
            style={{ padding: '1.5rem', marginBottom: '1.5rem', background: 'rgba(255,255,255,0.02)' }}
          >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                 <h4 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1rem', opacity: 0.7 }}>Experience #{index + 1}</h4>
                 <button onClick={() => removeExperience(exp.id)} className="icon-btn danger-hover" title="Remove this experience">
                   <Trash2 size={18} />
                 </button>
              </div>
              
              <div className="form-grid">
                <div className="form-group">
                  <label>Company Name</label>
                  <input 
                    type="text" 
                    className="glass-input" 
                    placeholder="e.g., Google"
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Job Title / Position</label>
                  <input 
                    type="text" 
                    className="glass-input" 
                    placeholder="e.g., Software Engineer"
                    value={exp.position}
                    onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Start Date</label>
                  <input 
                    type="text" 
                    className="glass-input" 
                    placeholder="MM/YYYY"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>End Date</label>
                  <input 
                    type="text" 
                    className="glass-input" 
                    placeholder="MM/YYYY or Present"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                  />
                </div>
                <div className="form-group span-2">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '0.4rem' }}>
                      <label style={{ margin: 0 }}>Key Responsibilities & Achievements</label>
                      <button 
                        className="magic-wand-btn" 
                        title="Optimize with AI"
                        onClick={() => handleAI(exp.id, exp.position, exp.company, exp.description)}
                        disabled={loadingId === exp.id}
                      >
                          {loadingId === exp.id ? (
                            <Loader2 size={14} className="spin-animation" />
                          ) : (
                            <Wand2 size={14} />
                          )}
                          <span>{loadingId === exp.id ? 'Optimizing...' : 'AI Enhance'}</span>
                      </button>
                  </div>
                  <RichTextEditor
                    value={exp.description}
                    onChange={(val) => updateExperience(exp.id, { description: val })}
                    placeholder="- Led cross-functional team...&#10;- Improved performance by..."
                    minHeight="130px"
                  />
                </div>
              </div>
          </motion.div>
        ))}
      </AnimatePresence>
      
      <button className="btn-add-item" onClick={handleAdd}>
        <Plus size={18} /> Add New Experience
      </button>
    </div>
  );
};

export default ExperienceForm;
