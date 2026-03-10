import { useCVStore } from '../../store/useCVStore';
import './CVPreview.css';

const CVPreview = () => {
  const data = useCVStore((state) => state.data);

  return (
    <div className="cv-preview">
      {/* Header - Thông tin cá nhân */}
      <header className="cv-header">
        <h1 className="cv-name">{data.personalInfo.fullName || 'Tên Của Bạn'}</h1>
        <div className="cv-contact-info">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
        </div>
      </header>

      {/* Summary */}
      {data.personalInfo.summary && (
        <section className="cv-section">
          <p className="cv-summary">{data.personalInfo.summary}</p>
        </section>
      )}

      {/* Kinh nghiệm làm việc */}
      <section className="cv-section">
        <h3 className="cv-section-title">Professional Experience</h3>
        <div className="cv-items">
          {data.experience.length > 0 ? (
             data.experience.map((exp) => (
                <div key={exp.id} className="cv-item">
                  <div className="cv-item-header">
                    <h3 className="cv-item-title">{exp.position}</h3>
                    <span className="cv-item-date">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <div className="cv-item-subtitle">{exp.company}</div>
                  <div className="cv-item-desc" dangerouslySetInnerHTML={{ __html: exp.description.replace(/\n/g, '<br/>') }}></div>
                </div>
              ))
          ) : (
             <p className="cv-placeholder">Thêm kinh nghiệm làm việc của bạn...</p>
          )}
        </div>
      </section>

      {/* Học vấn */}
      <section className="cv-section">
        <h3 className="cv-section-title">Education</h3>
        <div className="cv-items">
          {data.education.length > 0 ? (
             data.education.map((edu) => (
                <div key={edu.id} className="cv-item">
                  <div className="cv-item-header">
                    <h3 className="cv-item-title">{edu.degree}</h3>
                    <span className="cv-item-date">{edu.startDate} - {edu.endDate}</span>
                  </div>
                  <div className="cv-item-subtitle">{edu.school}</div>
                </div>
              ))
          ) : (
             <p className="cv-placeholder">Thêm thông tin học vấn...</p>
          )}
        </div>
      </section>
      
      {/* Kỹ năng */}
      <section className="cv-section">
        <h3 className="cv-section-title">Skills</h3>
        <div className="cv-skills">
          {data.skills.length > 0 ? (
            data.skills.map(skill => (
               <span key={skill.id} className="cv-skill-tag">{skill.name}</span>
            ))
          ) : (
             <p className="cv-placeholder">Thêm kỹ năng...</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default CVPreview;
