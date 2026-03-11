import { Mail, Phone, MapPin, Github, Linkedin, Globe } from 'lucide-react';
import type { CVData } from '../../../store/useCVStore';

interface TemplateProps {
  data: CVData;
}

const SiliconValley = ({ data }: TemplateProps) => {
  const { personalInfo, experience, education, projects, skills, languages = [], metadata } = data;
  const themeColor = metadata.themeColor || '#000000';

  const getSocialIcon = (label: string) => {
    const l = label.toLowerCase();
    if (l.includes('github')) return <Github size={14} />;
    if (l.includes('linkedin')) return <Linkedin size={14} />;
    return <Globe size={14} />;
  };

  const normalizeUrl = (url: string) => {
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return `https://${url}`;
  };

  return (
    <div className="cv-template silicon-valley-style" style={{ '--accent-color': themeColor } as React.CSSProperties}>
      <header className="cv-header">
        <h1 className="cv-name" style={{ color: themeColor }}>{personalInfo.fullName || 'Your Name'}</h1>
        
        <div className="cv-contact-row">
          <div className="contact-column">
            {personalInfo.email && (
              <a className="contact-item" href={`mailto:${personalInfo.email}`}>
                <Mail size={14} className="contact-icon" />
                <span>{personalInfo.email}</span>
              </a>
            )}
            {personalInfo.phone && (
              <a className="contact-item" href={`tel:${personalInfo.phone.replace(/\s/g, '')}`}>
                <Phone size={14} className="contact-icon" />
                <span>{personalInfo.phone}</span>
              </a>
            )}
            {personalInfo.location && (
              <div className="contact-item">
                <MapPin size={14} className="contact-icon" />
                <span>{personalInfo.location}</span>
              </div>
            )}
          </div>

          <div className="contact-column">
            {data.socialLinks && data.socialLinks.map(link => (
              <a key={link.id} className="contact-item social-link" href={normalizeUrl(link.url)} target="_blank" rel="noreferrer">
                {getSocialIcon(link.label)}
                <span>{link.url}</span>
              </a>
            ))}
          </div>
        </div>
      </header>

      {personalInfo.summary && (
        <section className="cv-section">
          <div className="cv-summary" dangerouslySetInnerHTML={{ __html: personalInfo.summary }} />
        </section>
      )}

      <section className="cv-section">
        <h3 className="section-title" style={{ borderColor: themeColor }}>Skills</h3>
        <div className="cv-skills">
          {skills.map(skill => (
            <span key={skill.id} className="cv-skill-tag">{skill.name}</span>
          ))}
        </div>
      </section>

      {languages && languages.length > 0 && (
        <section className="cv-section">
          <h3 className="section-title" style={{ borderColor: themeColor }}>Languages</h3>
          <div className="cv-skills">
            {languages.map(lang => (
              <span key={lang.id} className="cv-skill-tag">
                <strong>{lang.name}</strong> • {lang.proficiency}
              </span>
            ))}
          </div>
        </section>
      )}

      <section className="cv-section">
        <h3 className="section-title" style={{ borderColor: themeColor }}>Professional Experience</h3>
        <div className="cv-items">
          {experience.map((exp) => (
            <div key={exp.id} className="cv-item">
              <div className="cv-item-header">
                <h4 className="cv-item-title">{exp.position}</h4>
                <span className="cv-item-date">{exp.startDate} - {exp.endDate}</span>
              </div>
              <div className="cv-item-subtitle">{exp.company}</div>
              <div className="cv-item-desc" dangerouslySetInnerHTML={{ __html: exp.description }}></div>
            </div>
          ))}
        </div>
      </section>

      {projects && projects.length > 0 && (
        <section className="cv-section">
          <h3 className="section-title" style={{ borderColor: themeColor }}>Notable Projects</h3>
          <div className="cv-items">
            {projects.map((project) => (
              <div key={project.id} className="cv-item">
                <div className="cv-item-header">
                  <h4 className="cv-item-title">{project.name}</h4>
                  {project.link && (
                    <a className="cv-item-date" href={normalizeUrl(project.link)} target="_blank" rel="noreferrer">
                      {project.link}
                    </a>
                  )}
                </div>
                {project.technologies && project.technologies.length > 0 && (
                  <div className="cv-item-subtitle tech-stack">
                    Technologies: {project.technologies.join(', ')}
                  </div>
                )}
                <div className="cv-item-desc" dangerouslySetInnerHTML={{ __html: project.description }}></div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="cv-section">
        <h3 className="section-title" style={{ borderColor: themeColor }}>Education</h3>
        <div className="cv-items">
          {education.map((edu) => (
            <div key={edu.id} className="cv-item">
              <div className="cv-item-header">
                <h4 className="cv-item-title">{edu.degree}</h4>
                <span className="cv-item-date">{edu.startDate} - {edu.endDate}</span>
              </div>
              <div className="cv-item-subtitle">{edu.school}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SiliconValley;
