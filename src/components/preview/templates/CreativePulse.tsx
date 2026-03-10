import type { CVData } from '../../../store/useCVStore';
import './CreativePulse.css';

interface TemplateProps {
  data: CVData;
}

const CreativePulse = ({ data }: TemplateProps) => {
  const { personalInfo, experience, education, projects, skills, metadata } = data;
  const themeColor = metadata.themeColor || '#5b21b6';

  return (
    <div className="cv-template creative-pulse-style" style={{ '--accent-color': themeColor } as any}>
      <header className="cre-header" style={{ backgroundColor: themeColor }}>
        <div className="cre-header-content">
          <h1 className="cre-name">{personalInfo.fullName || 'Your Name'}</h1>
          <div className="cre-contact">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
            {data.socialLinks && data.socialLinks.map(link => (
              <span key={link.id}>{link.label}: {link.url}</span>
            ))}
          </div>
        </div>
      </header>

      <div className="cre-container">
        <section className="cre-section cre-summary-section">
          <div className="cre-summary-box" style={{ borderColor: themeColor }}>
            <p>{personalInfo.summary}</p>
          </div>
        </section>

        <section className="cre-section" style={{ marginTop: '30px' }}>
          <h2 className="cre-section-title" style={{ color: themeColor }}>Technical Expertise</h2>
          <div className="cre-skills-grid">
            {skills.map(skill => (
              <div key={skill.id} className="cre-skill-bubble" style={{ border: `1px solid ${themeColor}44`, borderLeft: `4px solid ${themeColor}` }}>
                {skill.name}
              </div>
            ))}
          </div>
        </section>

        <section className="cre-section">
          <h2 className="cre-section-title" style={{ color: themeColor }}>Professional Experience</h2>
          <div className="cre-timeline">
            {experience.map((exp) => (
              <div key={exp.id} className="cre-timeline-item">
                <div className="cre-timeline-dot" style={{ backgroundColor: themeColor }}></div>
                <div className="cre-timeline-content">
                  <div className="cre-item-header">
                    <h3 className="cre-item-title">{exp.position}</h3>
                    <span className="cre-item-date" style={{ color: themeColor }}>{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <div className="cre-item-company">{exp.company}</div>
                  <div className="cre-item-desc" dangerouslySetInnerHTML={{ __html: exp.description.replace(/\n/g, '<br/>') }}></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="cre-grid">
          {projects && projects.length > 0 && (
            <section className="cre-section">
              <h2 className="cre-section-title" style={{ color: themeColor }}>Key Projects</h2>
              <div className="cre-items">
                {projects.map((project) => (
                  <div key={project.id} className="cre-item" style={{ marginBottom: '20px' }}>
                    <h4 className="cre-item-title" style={{ fontSize: '1rem' }}>{project.name}</h4>
                    {project.link && <p className="cre-item-subtitle" style={{ color: themeColor, fontSize: '0.8rem', margin: '2px 0' }}>{project.link}</p>}
                    <p className="cre-item-description" style={{ fontSize: '0.9rem' }}>{project.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="cre-section">
            <h2 className="cre-section-title" style={{ color: themeColor }}>Education</h2>
            <div className="cre-edu-list">
              {education.map((edu) => (
                <div key={edu.id} className="cre-edu-item">
                  <h4 className="cre-edu-degree">{edu.degree}</h4>
                  <div className="cre-edu-school">{edu.school}</div>
                  <div className="cre-edu-date">{edu.startDate} - {edu.endDate}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CreativePulse;
