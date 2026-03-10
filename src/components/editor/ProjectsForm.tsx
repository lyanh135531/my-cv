import { useCVStore } from '../../store/useCVStore';
import { Plus, Trash2, Wand2, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { optimizeProjectDescription } from '../../store/aiService';
import { useState } from 'react';
import './FormInputs.css';

const ProjectsForm = () => {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const projects = useCVStore((state) => state.data.projects);
  const addProject = useCVStore((state) => state.addProject);
  const updateProject = useCVStore((state) => state.updateProject);
  const removeProject = useCVStore((state) => state.removeProject);

  const handleAdd = () => {
    addProject({
      id: crypto.randomUUID(),
      name: '',
      description: '',
      technologies: [],
      link: '',
    });
  };

  const handleAI = async (id: string, name: string, description: string) => {
    setLoadingId(id);
    try {
      const optimized = await optimizeProjectDescription(name, description);
      updateProject(id, { description: optimized });
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="form-section">
      <AnimatePresence>
        {projects.map((project, index) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="experience-card glass-panel"
            style={{ padding: '1.5rem', marginBottom: '1.5rem', background: 'rgba(255,255,255,0.02)' }}
          >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                 <h4 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1rem', opacity: 0.7 }}>Project #{index + 1}</h4>
                 <button onClick={() => removeProject(project.id)} className="icon-btn danger-hover" title="Remove this project">
                   <Trash2 size={18} />
                 </button>
              </div>
              
              <div className="form-grid">
                <div className="form-group span-2">
                  <label>Project Name</label>
                  <input 
                    type="text" 
                    className="glass-input" 
                    placeholder="e.g., E-commerce Microservices"
                    value={project.name}
                    onChange={(e) => updateProject(project.id, { name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Technologies (comma separated)</label>
                  <input 
                    type="text" 
                    className="glass-input" 
                    placeholder="React, Node.js, AWS"
                    value={project.technologies.join(', ')}
                    onChange={(e) => updateProject(project.id, { technologies: e.target.value.split(',').map(s => s.trim()) })}
                  />
                </div>
                <div className="form-group">
                  <label>Project Link (Optional)</label>
                  <input 
                    type="text" 
                    className="glass-input" 
                    placeholder="github.com/yourname/project"
                    value={project.link || ''}
                    onChange={(e) => updateProject(project.id, { link: e.target.value })}
                  />
                </div>
                <div className="form-group span-2">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '0.4rem' }}>
                      <label style={{ margin: 0 }}>Impact & Technical Details</label>
                      <button 
                        className="magic-wand-btn" 
                        title="Optimize with AI"
                        onClick={() => handleAI(project.id, project.name, project.description)}
                        disabled={loadingId === project.id}
                      >
                          {loadingId === project.id ? (
                            <Loader2 size={14} className="spin-animation" />
                          ) : (
                            <Wand2 size={14} />
                          )}
                          <span>{loadingId === project.id ? 'Optimizing...' : 'AI Enhance'}</span>
                      </button>
                  </div>
                  <textarea 
                    className="glass-input" 
                    rows={4}
                    placeholder="- Leveraged FFmpeg and Go to achieve 3x faster processing...&#10;- Reduced latency by 40%..."
                    value={project.description}
                    onChange={(e) => updateProject(project.id, { description: e.target.value })}
                  />
                </div>
              </div>
          </motion.div>
        ))}
      </AnimatePresence>
      
      <button className="btn-secondary" onClick={handleAdd} style={{ width: '100%', padding: '14px', borderStyle: 'dashed', background: 'transparent', opacity: 0.6 }}>
        <Plus size={18} style={{ marginRight: '8px' }} /> Add New Project
      </button>
    </div>
  );
};

export default ProjectsForm;
