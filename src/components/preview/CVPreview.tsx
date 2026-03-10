import { useCVStore } from '../../store/useCVStore';
import SiliconValley from './templates/SiliconValley';
import './CVPreview.css';

const CVPreview = () => {
  const data = useCVStore((state) => state.data);

  return (
    <div className="cv-preview-container">
      <div className="cv-document">
        <SiliconValley data={data} />
      </div>
    </div>
  );
};

export default CVPreview;
