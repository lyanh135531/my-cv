import { motion } from 'framer-motion';
import { Code, Download, ShieldCheck, Sparkles, RotateCcw } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import HeroSection from '../components/HeroSection';
import { useCVStore, initialData } from '../store/useCVStore';
import ConfirmationModal from '../components/ui/ConfirmationModal';
import LanguageSwitcher from '../components/LanguageSwitcher';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const { t } = useTranslation();
  const [isResetModalOpen, setIsResetModalOpen] = React.useState(false);
  const data = useCVStore((state) => state.data);
  const hasData = JSON.stringify(data.personalInfo) !== JSON.stringify(initialData.personalInfo) || 
                  data.experience.length > 2 || 
                  data.projects.length > 2;

  const handleReset = () => {
    localStorage.removeItem('resume-ai-storage');
    window.location.reload();
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const features = [
    {
      icon: <Sparkles size={24} />,
      title: t('landing.feature1Title'),
      desc: t('landing.feature1Desc')
    },
    {
      icon: <ShieldCheck size={24} />,
      title: t('landing.feature2Title'),
      desc: t('landing.feature2Desc')
    },
    {
      icon: <Download size={24} />,
      title: t('landing.feature3Title'),
      desc: t('landing.feature3Desc')
    },
  ];

  return (
    <div className="landing-page-wrapper">
      <header className="glass-panel" style={{
        margin: '1.5rem 2rem',
        padding: '1rem 2.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: '1rem',
        zIndex: 50,
        borderRadius: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            background: 'linear-gradient(135deg, var(--accent-base), var(--accent-glow))',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)'
          }}>
            <Code size={18} color="white" />
          </div>
          <h2 className="text-gradient" style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.5px' }}>ResumeAI</h2>
        </div>
        <nav style={{ display: 'none' }} className="md-flex">
          <div style={{ display: 'flex', gap: '3rem' }}>
            <a href="#" style={{ color: 'var(--text-secondary)', fontWeight: 600, transition: 'color 0.2s' }}>{t('landing.features')}</a>
            <a href="#" style={{ color: 'var(--text-secondary)', fontWeight: 600, transition: 'color 0.2s' }}>{t('landing.pricing')}</a>
          </div>
        </nav>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {hasData && (
            <button 
              onClick={() => setIsResetModalOpen(true)} 
              className="icon-btn" 
              title={t('landing.resetProgressTitle')}
              style={{ width: '40px', height: '40px', borderRadius: '12px' }}
            >
              <RotateCcw size={18} />
            </button>
          )}
          <LanguageSwitcher />
          <button onClick={onStart} className="btn-primary" style={{ padding: '10px 24px', borderRadius: '12px' }}>
            {hasData ? t('landing.btnResumeWorking') : t('landing.btnGetStarted')}
          </button>
        </div>
      </header>

      <main>
        <HeroSection onStart={onStart} />

        <section className="sections-wrapper">
          <motion.div
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2 variants={itemVariants}>{t('landing.craftedForProfessionals')}</motion.h2>
            <motion.p variants={itemVariants}>
              {t('landing.craftedSubtitle')}
            </motion.p>
          </motion.div>

          <motion.div
            className="features-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {features.map((feature, idx) => (
              <motion.div key={idx} className="feature-card" variants={itemVariants}>
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section className="sections-wrapper" style={{ background: 'rgba(255,255,255,0.01)', borderRadius: '60px' }}>
          <div className="section-header">
            <h2>{t('landing.howItWorks')}</h2>
            <p>{t('landing.howItWorksDesc')}</p>
          </div>

          <div className="features-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            <div className="feature-card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: 800, color: 'rgba(139, 92, 246, 0.2)', marginBottom: '1rem' }}>01</div>
              <h3>{t('landing.step1Title')}</h3>
              <p>{t('landing.step1Desc')}</p>
            </div>
            <div className="feature-card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: 800, color: 'rgba(139, 92, 246, 0.2)', marginBottom: '1rem' }}>02</div>
              <h3>{t('landing.step2Title')}</h3>
              <p>{t('landing.step2Desc')}</p>
            </div>
            <div className="feature-card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: 800, color: 'rgba(139, 92, 246, 0.2)', marginBottom: '1rem' }}>03</div>
              <h3>{t('landing.step3Title')}</h3>
              <p>{t('landing.step3Desc')}</p>
            </div>
          </div>
        </section>

        <section className="hero-container" style={{ minHeight: '60vh' }}>
          <div className="hero-content" style={{ textAlign: 'center', margin: '0 auto' }}>
            <h2 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>
              {hasData ? t('landing.readyFinishMasterpiece') : t('landing.readyLandDreamJob')} <span className="text-gradient">{hasData ? t('landing.masterpiece') : t('landing.dreamJob')}</span>?
            </h2>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '3rem' }}>
              {hasData ? t('landing.readySubtitleHasData') : t('landing.readySubtitleNoData')}
            </p>
            <button onClick={onStart} className="btn-primary shimmer" style={{ padding: '16px 40px', fontSize: '1.25rem', borderRadius: '18px' }}>
              {hasData ? t('landing.btnContinueEditing') : t('landing.btnCreateNow')}
            </button>
          </div>
        </section>
      </main>

      <footer>
        <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center', gap: '2rem' }}>
          <a href="#" style={{ color: 'var(--text-secondary)' }}>{t('landing.privacyPolicy')}</a>
          <a href="#" style={{ color: 'var(--text-secondary)' }}>{t('landing.termsOfService')}</a>
          <a href="#" style={{ color: 'var(--text-secondary)' }}>{t('landing.contactUs')}</a>
        </div>
        <p>{t('landing.footerText')}</p>
      </footer>

      <ConfirmationModal 
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleReset}
        title={t('landing.resetProgressTitle')}
        message={t('landing.resetProgressMessage')}
        confirmText={t('landing.btnYesReset')}
        cancelText={t('landing.btnKeepEditing')}
      />
    </div>
  );
};

export default LandingPage;
