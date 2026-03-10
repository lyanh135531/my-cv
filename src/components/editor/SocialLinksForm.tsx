import { useState } from 'react';
import { useCVStore } from '../../store/useCVStore';
import { Plus, Trash2, Link as LinkIcon } from 'lucide-react';
import './FormInputs.css';

const SocialLinksForm = () => {
  const socialLinks = useCVStore((state) => state.data.socialLinks);
  const addSocialLink = useCVStore((state) => state.addSocialLink);
  const updateSocialLink = useCVStore((state) => state.updateSocialLink);
  const removeSocialLink = useCVStore((state) => state.removeSocialLink);

  const [newLabel, setNewLabel] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const handleAdd = () => {
    if (newLabel.trim() && newUrl.trim()) {
      addSocialLink({
        id: Date.now().toString(),
        label: newLabel.trim(),
        url: newUrl.trim(),
      });
      setNewLabel('');
      setNewUrl('');
    }
  };

  return (
    <div className="form-section">
      <div className="items-list">
        {socialLinks.map((link) => (
          <div key={link.id} className="item-card" style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <input
                type="text"
                className="glass-input"
                style={{ padding: '10px 14px' }}
                value={link.label}
                onChange={(e) => updateSocialLink(link.id, { label: e.target.value })}
                placeholder="Label"
              />
            </div>
            <div className="form-group" style={{ flex: 2 }}>
              <input
                type="text"
                className="glass-input"
                style={{ padding: '10px 14px' }}
                value={link.url}
                onChange={(e) => updateSocialLink(link.id, { url: e.target.value })}
                placeholder="URL"
              />
            </div>
            <button
              onClick={() => removeSocialLink(link.id)}
              className="icon-btn danger-hover"
              title="Remove Link"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      <div className="form-grid" style={{ alignItems: 'end', marginTop: '1.5rem', background: 'rgba(255,255,255,0.02)', padding: '1.25rem', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="form-group">
          <label>Platform / Label</label>
          <input
            type="text"
            className="glass-input"
            style={{ padding: '10px 14px' }}
            placeholder="e.g., Medium"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Link / URL</label>
          <div style={{ position: 'relative' }}>
            <LinkIcon size={14} style={{ position: 'absolute', top: '13px', left: '12px', opacity: 0.4 }} />
            <input
              type="text"
              className="glass-input"
              style={{ paddingLeft: '36px', paddingTop: '10px', paddingBottom: '10px' }}
              placeholder="e.g., medium.com/@user"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
            />
          </div>
        </div>
        <button 
          className="btn-primary" 
          onClick={handleAdd}
          disabled={!newLabel.trim() || !newUrl.trim()}
          style={{ padding: '10px 16px', borderRadius: '10px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
        >
          <Plus size={18} /> Add
        </button>
      </div>
    </div>
  );
};

export default SocialLinksForm;
