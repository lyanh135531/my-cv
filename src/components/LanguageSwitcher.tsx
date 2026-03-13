import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  // Handle language change
  const toggleLanguage = () => {
    // i18next-browser-languagedetector can detect 'en-US', so check if starts with 'vi'
    const isVi = i18n.language?.startsWith('vi');
    const newLang = isVi ? 'en' : 'vi';
    i18n.changeLanguage(newLang);
  };

  return (
    <button 
      onClick={toggleLanguage}
      title="Switch Language"
      style={{ 
        padding: '8px 16px', 
        borderRadius: '12px',
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        color: 'var(--text-primary)',
        cursor: 'pointer',
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '48px',
        transition: 'all 0.2s ease'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
      }}
    >
      {i18n.language?.startsWith('vi') ? 'VI' : 'EN'}
    </button>
  );
};

export default LanguageSwitcher;
