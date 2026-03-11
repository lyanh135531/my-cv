import { useCVStore } from '../../store/useCVStore';
import { Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './FormInputs.css';

const PROFICIENCY_LEVELS = [
  'Native/Bilingual',
  'Fluent',
  'Professional Working',
  'Intermediate',
  'Basic'
];

const LanguagesForm = () => {
  const languages = useCVStore((state) => state.data.languages || []);
  const addLanguage = useCVStore((state) => state.addLanguage);
  const updateLanguage = useCVStore((state) => state.updateLanguage);
  const removeLanguage = useCVStore((state) => state.removeLanguage);

  const handleAdd = () => {
    addLanguage({
      id: crypto.randomUUID(),
      name: '',
      proficiency: 'Professional Working',
    });
  };

  return (
    <div className="form-section">
      <AnimatePresence>
        {languages.map((lang, index) => (
          <motion.div 
            key={lang.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="experience-card glass-panel"
            style={{ padding: '1.5rem', marginBottom: '1.5rem', background: 'rgba(255,255,255,0.02)' }}
          >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                 <h4 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1rem', opacity: 0.7 }}>Language #{index + 1}</h4>
                 <button onClick={() => removeLanguage(lang.id)} className="icon-btn danger-hover" title="Remove this language">
                   <Trash2 size={18} />
                 </button>
              </div>
              
              <div className="form-grid">
                <div className="form-group span-2">
                  <label>Language</label>
                  <input 
                    type="text" 
                    className="glass-input" 
                    placeholder="e.g., English, Spanish, Japanese"
                    value={lang.name}
                    onChange={(e) => updateLanguage(lang.id, { name: e.target.value })}
                  />
                </div>
                <div className="form-group span-2">
                  <label>Proficiency</label>
                  <select 
                    className="glass-input custom-select" 
                    value={lang.proficiency}
                    onChange={(e) => updateLanguage(lang.id, { proficiency: e.target.value })}
                  >
                    {PROFICIENCY_LEVELS.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
              </div>
          </motion.div>
        ))}
      </AnimatePresence>
      
      <button className="btn-add-item" onClick={handleAdd}>
        <Plus size={18} /> Add New Language
      </button>
    </div>
  );
};

export default LanguagesForm;
