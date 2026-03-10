import { useCVStore } from '../../store/useCVStore';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';

const SkillsForm = () => {
  const skills = useCVStore((state) => state.data.skills);
  const addSkill = useCVStore((state) => state.addSkill);
  const removeSkill = useCVStore((state) => state.removeSkill);
  
  const [newSkill, setNewSkill] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim()) {
      addSkill({
        id: crypto.randomUUID(),
        name: newSkill.trim()
      });
      setNewSkill('');
    }
  };

  return (
    <div className="form-section">
      <form onSubmit={handleAdd} className="skill-input-form" style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
         <input 
            type="text" 
            className="glass-input" 
            placeholder="e.g., React, UI Design, Negotiation..."
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            style={{ flex: 1 }}
         />
         <button type="submit" className="btn-secondary flex-center" style={{ padding: '0 16px' }}>
            <Plus size={18} /> Add
         </button>
      </form>

      <div className="skills-tags-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
         {skills.map(skill => (
            <div key={skill.id} className="skill-tag" style={{
               display: 'flex', alignItems: 'center', gap: '6px', 
               padding: '6px 12px', background: 'rgba(255, 255, 255, 0.05)',
               border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '20px',
               fontSize: '0.9rem'
            }}>
               <span>{skill.name}</span>
               <button 
                  onClick={() => removeSkill(skill.id)} 
                  className="icon-btn danger-hover" 
                  style={{ padding: '2px', marginLeft: '4px' }}
               >
                  <X size={14} />
               </button>
            </div>
         ))}
      </div>
    </div>
  );
};

export default SkillsForm;
