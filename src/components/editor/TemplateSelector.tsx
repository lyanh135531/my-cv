import { useCVStore } from '../../store/useCVStore';
import { Layout, Palette, Check } from 'lucide-react';
import './TemplateSelector.css';

const templates = [
  { id: 'silicon-valley', name: 'Silicon Valley', desc: 'Minimalist & ATS Friendly' },
  { id: 'executive', name: 'Executive', desc: 'Professional Two-Column' },
  { id: 'creative-pulse', name: 'Creative Pulse', desc: 'Bold & Modern Impact' },
];

const themeColors = [
  { name: 'Black', value: '#000000' },
  { name: 'Royal Blue', value: '#1e3a8a' },
  { name: 'Emerald', value: '#065f46' },
  { name: 'Deep Purple', value: '#5b21b6' },
  { name: 'Burgundy', value: '#7f1d1d' },
];

const TemplateSelector = () => {
  const currentTemplateId = useCVStore((state) => state.data.metadata.templateId);
  const currentThemeColor = useCVStore((state) => state.data.metadata.themeColor);
  const setTemplate = useCVStore((state) => state.setTemplate);
  const setThemeColor = useCVStore((state) => state.setThemeColor);

  return (
    <div className="template-selector-container">
      <div className="selector-section">
        <label className="section-label">
          <Layout size={16} /> Select Template
        </label>
        <div className="template-grid">
          {templates.map((t) => (
            <button
              key={t.id}
              className={`template-card ${currentTemplateId === t.id ? 'active' : ''}`}
              onClick={() => setTemplate(t.id)}
            >
              <div className="template-preview-icon">
                 {/* Simplified Preview Icon based on ID */}
                 <div className={`preview-mini ${t.id}`}></div>
              </div>
              <div className="template-info">
                <span className="template-name">{t.name}</span>
                <span className="template-desc">{t.desc}</span>
              </div>
              {currentTemplateId === t.id && <div className="active-badge"><Check size={12} /></div>}
            </button>
          ))}
        </div>
      </div>

      <div className="selector-section">
        <label className="section-label">
          <Palette size={16} /> Theme Color
        </label>
        <div className="color-palette">
          {themeColors.map((c) => (
            <button
              key={c.value}
              className={`color-swatch ${currentThemeColor === c.value ? 'active' : ''}`}
              style={{ backgroundColor: c.value }}
              onClick={() => setThemeColor(c.value)}
              title={c.name}
            >
              {currentThemeColor === c.value && <Check size={14} color="white" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;
