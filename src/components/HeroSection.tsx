import { motion } from 'framer-motion';
import { useCVStore, initialData } from '../store/useCVStore';
import { Zap, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface HeroSectionProps {
  onStart: () => void;
}

const HeroSection = ({ onStart }: HeroSectionProps) => {
  const { t } = useTranslation();
  const data = useCVStore((state) => state.data);
  const hasData = JSON.stringify(data.personalInfo) !== JSON.stringify(initialData.personalInfo) || 
                  data.experience.length > 2 || 
                  data.projects.length > 2;

  return (
    <section className="hero-container">
      <div className="hero-content">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-badge"
        >
          <Sparkles size={14} />
          <span>{hasData ? t('hero.welcomeBack') : t('hero.futureProfiles')}</span>
        </motion.div>

        <motion.h1 
          className="hero-title"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', lineHeight: 1.05, textAlign: 'inherit' }}
        >
          {t('hero.buildYour')} <span className="text-gradient">{hasData ? t('hero.future') : t('hero.premium')}</span> <br /> 
          {t('hero.resumeWithAI')}
        </motion.h1>

        <motion.p 
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ fontSize: '1.25rem', opacity: 0.7, maxWidth: '600px' }}
        >
          {hasData ? t('hero.subtitleHasData') : t('hero.subtitleNoData')}
        </motion.p>

        <motion.div 
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'inherit' }}
        >
          <button onClick={onStart} className="btn-primary shimmer" style={{ alignSelf: 'flex-start', padding: '16px 36px', fontSize: '1.1rem', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            {hasData ? t('hero.btnContinueProgress') : t('hero.btnStartBuilding')}
            {hasData && <ArrowRight size={20} />}
          </button>
          <div className="hero-features" style={{ display: 'flex', gap: '2rem', opacity: 0.6 }}>
            <div className="feature-item" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={18} color="var(--accent-base)" /> <span>{t('hero.smartAIAssistant')}</span>
            </div>
            <div className="feature-item" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={18} color="var(--accent-base)" /> <span>{t('hero.atsFriendly')}</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="hero-visual">
         <motion.div 
           className="preview-card-3d"
           initial={{ opacity: 0, scale: 0.8, rotateY: 45 }}
           animate={{ opacity: 1, scale: 1, rotateY: -15 }}
           transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
         >
           <div className="mock-resume">
             <div className="mock-header" style={{ width: '40%', height: '24px', background: 'var(--bg-primary)', opacity: 0.1, marginBottom: '40px' }}></div>
             <div className="mock-line long" style={{ background: '#eee', height: '12px' }}></div>
             <div className="mock-line medium" style={{ background: '#f5f5f5', height: '10px' }}></div>
             <div className="mock-line long" style={{ background: '#f5f5f5', height: '10px', marginTop: '20px' }}></div>
             
             <div className="mock-grid" style={{ marginTop: '40px' }}>
               <div className="mock-col">
                 <div className="mock-line medium" style={{ background: '#eee' }}></div>
                 <div className="mock-line short"></div>
                 <div className="mock-line short"></div>
               </div>
               <div className="mock-col">
                 <div className="mock-line medium" style={{ background: '#eee' }}></div>
                 <div className="mock-line short"></div>
                 <div className="mock-line short"></div>
               </div>
             </div>

             <div className="mock-line long" style={{ marginTop: '40px', background: '#eee' }}></div>
             <div className="mock-line medium"></div>
           </div>
         </motion.div>
         <div className="hero-glow" style={{ width: '600px', height: '600px', top: '-10%', right: '-10%' }}></div>
      </div>
    </section>
  );
};

export default HeroSection;
