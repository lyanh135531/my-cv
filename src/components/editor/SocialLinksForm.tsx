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
          <div key={link.id} className="item-card" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
              <input
                type="text"
                className="glass-input"
                value={link.label}
                onChange={(e) => updateSocialLink(link.id, { label: e.target.value })}
                placeholder="Label (e.g., GitHub)"
              />
            </div>
            <div className="form-group" style={{ flex: 2, marginBottom: 0 }}>
              <input
                type="text"
                className="glass-input"
                value={link.url}
                onChange={(e) => updateSocialLink(link.id, { url: e.target.value })}
                placeholder="URL (e.g., github.com/username)"
              />
            </div>
            <button
              onClick={() => removeSocialLink(link.id)}
              className="btn btn-outline"
              style={{ padding: '0.75rem', marginTop: '0' }}
              title="Remove Link"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      <div className="form-grid mt-4" style={{ alignItems: 'end' }}>
        <div className="form-group">
          <label>Platform / Label</label>
          <input
            type="text"
            className="glass-input"
            placeholder="e.g., Medium, Dribbble"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
          />
        </div>
        <div className="form-group">
          <label>Link / URL</label>
          <div style={{ position: 'relative' }}>
            <LinkIcon size={16} style={{ position: 'absolute', top: '15px', left: '15px', opacity: 0.5 }} />
            <input
              type="text"
              className="glass-input"
              style={{ paddingLeft: '40px' }}
              placeholder="e.g., medium.com/@username"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
            />
          </div>
        </div>
        <div className="form-group" style={{ marginBottom: '8px' }}>
          <button 
            className="btn btn-primary" 
            onClick={handleAdd}
            disabled={!newLabel.trim() || !newUrl.trim()}
            style={{ width: '100%' }}
          >
            <Plus size={18} /> Add Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialLinksForm;
