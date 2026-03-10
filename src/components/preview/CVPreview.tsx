import { useCVStore } from '../../store/useCVStore';
import SiliconValley from './templates/SiliconValley';
import Executive from './templates/Executive';
import CreativePulse from './templates/CreativePulse';
import './CVPreview.css';

const CVPreview = () => {
  const data = useCVStore((state) => state.data);
  const templateId = data.metadata.templateId || 'silicon-valley';

  const renderTemplate = () => {
    switch (templateId) {
      case 'executive':
        return <Executive data={data} />;
      case 'creative-pulse':
        return <CreativePulse data={data} />;
      case 'silicon-valley':
      default:
        return <SiliconValley data={data} />;
    }
  };

  return (
    <div className="cv-preview-container">
      <div className="cv-document">
        {renderTemplate()}
      </div>
    </div>
  );
};

export default CVPreview;
