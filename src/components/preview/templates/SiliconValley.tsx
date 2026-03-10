import type { CVData } from '../../../store/useCVStore';

interface TemplateProps {
  data: CVData;
}

const SiliconValley = ({ data }: TemplateProps) => {
  const { personalInfo, experience, education, projects, skills, metadata } = data;
  const themeColor = metadata.themeColor || '#000000';

  return (
    <div className="cv-template silicon-valley-style" style={{ '--accent-color': themeColor } as any}>
      <header className="cv-header">
        <h1 className="cv-name" style={{ color: themeColor }}>{personalInfo.fullName || 'Your Name'}</h1>
        <div className="cv-contact-info">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {data.socialLinks && data.socialLinks.map(link => (
            <span key={link.id} className="cv-link">{link.label}: {link.url}</span>
          ))}
        </div>
      </header>

      {personalInfo.summary && (
        <section className="cv-section">
          <p className="cv-summary">{personalInfo.summary}</p>
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
              <div className="cv-item-desc" dangerouslySetInnerHTML={{ __html: exp.description.replace(/\n/g, '<br/>') }}></div>
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
                  {project.link && <span className="cv-item-date">{project.link}</span>}
                </div>
                {project.technologies && project.technologies.length > 0 && (
                  <div className="cv-item-subtitle" style={{ fontSize: '0.85rem', opacity: 0.8 }}>
                    Technologies: {project.technologies.join(', ')}
                  </div>
                )}
                <div className="cv-item-desc" dangerouslySetInnerHTML={{ __html: project.description.replace(/\n/g, '<br/>') }}></div>
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
