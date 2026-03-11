import { useCVStore } from '../../store/useCVStore';
import RichTextEditor from '../ui/RichTextEditor';
import './FormInputs.css';

const PersonalInfoForm = () => {
  const personalInfo = useCVStore((state) => state.data.personalInfo);
  const updatePersonalInfo = useCVStore((state) => state.updatePersonalInfo);

  return (
    <div className="form-section">
      <div className="form-grid">
        <div className="form-group span-2">
          <label htmlFor="fullName">Full Name</label>
          <input 
            id="fullName"
            type="text" 
            className="glass-input" 
            placeholder="e.g., John Doe"
            value={personalInfo.fullName}
            onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input 
            id="email"
            type="email" 
            className="glass-input" 
            placeholder="john@example.com"
            value={personalInfo.email}
            onChange={(e) => updatePersonalInfo({ email: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input 
            id="phone"
            type="text" 
            className="glass-input" 
            placeholder="+1 234 567 890"
            value={personalInfo.phone}
            onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
          />
        </div>
        <div className="form-group span-2">
          <label htmlFor="location">Location</label>
          <input 
            id="location"
            type="text" 
            className="glass-input" 
            placeholder="San Francisco, CA"
            value={personalInfo.location}
            onChange={(e) => updatePersonalInfo({ location: e.target.value })}
          />
        </div>
        <div className="form-group span-2">
          <label htmlFor="summary">Professional Summary</label>
          <RichTextEditor
            value={personalInfo.summary}
            onChange={(val) => updatePersonalInfo({ summary: val })}
            placeholder="Briefly describe your career goals and highlights..."
            minHeight="110px"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
