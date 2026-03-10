import type { CVData } from '../../../store/useCVStore';
import './Executive.css';

interface TemplateProps {
  data: CVData;
}

const Executive = ({ data }: TemplateProps) => {
  const { personalInfo, experience, education, projects, skills, metadata } = data;
  const themeColor = metadata.themeColor || '#1e3a8a';

  return (
    <div className="cv-template executive-style" style={{ '--accent-color': themeColor } as any}>
      <header className="exe-header" style={{ borderLeft: `8px solid ${themeColor}` }}>
        <h1 className="exe-name">{personalInfo.fullName || 'Your Name'}</h1>
        <div className="exe-contact">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {data.socialLinks && data.socialLinks.map(link => (
            <span key={link.id}>{link.label}: {link.url}</span>
          ))}
        </div>
      </header>

      <div className="exe-body">
        <aside className="exe-sidebar">
          <section className="exe-section">
            <h3 className="section-title" style={{ color: themeColor }}>Technical Stack</h3>
            <div className="exe-skills-list">
              {skills.map(skill => (
                <div key={skill.id} className="exe-skill-item">
                  <div className="skill-dot" style={{ backgroundColor: themeColor }}></div>
                  {skill.name}
                </div>
              ))}
            </div>
          </section>

          <section className="exe-section">
            <h3 className="section-title" style={{ color: themeColor }}>Professional Summary</h3>
            <p className="exe-summary-text">{personalInfo.summary}</p>
          </section>

          <section className="exe-section">
            <h3 className="section-title" style={{ color: themeColor }}>Education</h3>
            {education.map((edu) => (
              <div key={edu.id} className="exe-edu-item">
                <div className="exe-edu-degree">{edu.degree}</div>
                <div className="exe-edu-school">{edu.school}</div>
                <div className="exe-edu-date">{edu.startDate} - {edu.endDate}</div>
              </div>
            ))}
          </section>
        </aside>

        <main className="exe-main">
          <section className="exe-section">
            <h3 className="section-title" style={{ color: themeColor }}>Professional Experience</h3>
            <div className="exe-exp-list">
              {experience.map((exp) => (
                <div key={exp.id} className="exe-exp-item">
                  <div className="exe-item-header">
                    <h4 className="exe-item-title">{exp.position}</h4>
                    <span className="exe-item-date">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <div className="exe-item-company" style={{ color: themeColor }}>{exp.company}</div>
                  <div className="exe-item-desc" dangerouslySetInnerHTML={{ __html: exp.description.replace(/\n/g, '<br/>') }}></div>
                </div>
              ))}
            </div>
          </section>

          {projects && projects.length > 0 && (
            <section className="exe-section">
              <h3 className="section-title" style={{ color: themeColor }}>Notable Projects</h3>
              <div className="exe-items">
                {projects.map((project) => (
                  <div key={project.id} className="exe-item" style={{ marginBottom: '1rem' }}>
                    <div className="exe-item-header">
                      <h4 className="exe-item-title">{project.name}</h4>
                      {project.link && <span className="exe-item-date">{project.link}</span>}
                    </div>
                    <div className="exe-item-desc">
                      {project.description}
                      {project.technologies && (
                        <div style={{ marginTop: '4px', fontSize: '11px', fontStyle: 'italic', opacity: 0.8 }}>
                           Stack: {project.technologies.join(', ')}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default Executive;
