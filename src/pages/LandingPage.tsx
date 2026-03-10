import { motion } from 'framer-motion';
import { Code, Download, ShieldCheck, Sparkles } from 'lucide-react';
import React from 'react';
import HeroSection from '../components/HeroSection';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
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
      title: 'AI-Powered Writing',
      desc: 'Our AI analyzes job standards to optimize your bullet points and descriptions automatically.'
    },
    {
      icon: <ShieldCheck size={24} />,
      title: 'ATS-Optimized',
      desc: 'Templates designed to be easily read by Applicant Tracking Systems of major global corporations.'
    },
    {
      icon: <Download size={24} />,
      title: 'Premium PDF Export',
      desc: 'Export your resume to a professional, high-resolution PDF with pixel-perfect precision.'
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
            <a href="#" style={{ color: 'var(--text-secondary)', fontWeight: 600, transition: 'color 0.2s' }}>Features</a>
            <a href="#" style={{ color: 'var(--text-secondary)', fontWeight: 600, transition: 'color 0.2s' }}>Pricing</a>
          </div>
        </nav>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button className="btn-secondary" style={{ padding: '10px 20px', background: 'transparent', border: 'none' }}>Login</button>
          <button onClick={onStart} className="btn-primary" style={{ padding: '10px 24px', borderRadius: '14px' }}>Get Started</button>
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
            <motion.h2 variants={itemVariants}>Crafted for Professionals</motion.h2>
            <motion.p variants={itemVariants}>
              Stand out in the crowded job market with a resume that reflects your true potential.
              Our tools are built with modern design principles and AI intelligence.
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
            <h2>How it Works</h2>
            <p>Three simple steps to your dream job.</p>
          </div>

          <div className="features-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            <div className="feature-card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: 800, color: 'rgba(139, 92, 246, 0.2)', marginBottom: '1rem' }}>01</div>
              <h3>Enter Your Details</h3>
              <p>Fill in your experience, education, and skills in our intuitive, dark-mode editor.</p>
            </div>
            <div className="feature-card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: 800, color: 'rgba(139, 92, 246, 0.2)', marginBottom: '1rem' }}>02</div>
              <h3>AI Optimization</h3>
              <p>Use our Magic Wand to refine your descriptions and make them stand out to recruiters.</p>
            </div>
            <div className="feature-card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: 800, color: 'rgba(139, 92, 246, 0.2)', marginBottom: '1rem' }}>03</div>
              <h3>Download PDF</h3>
              <p>Get a pixel-perfect, ATS-friendly resume ready to send to top-tier companies.</p>
            </div>
          </div>
        </section>

        <section className="hero-container" style={{ minHeight: '60vh' }}>
          <div className="hero-content" style={{ textAlign: 'center', margin: '0 auto' }}>
            <h2 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Ready to land your <span className="text-gradient">dream job</span>?</h2>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '3rem' }}>Join 10,000+ professionals using ResumeAI to accelerate their careers.</p>
            <button onClick={onStart} className="btn-primary shimmer" style={{ padding: '16px 40px', fontSize: '1.25rem', borderRadius: '18px' }}>
              Create Your Resume Now - It's Free
            </button>
          </div>
        </section>
      </main>

      <footer>
        <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center', gap: '2rem' }}>
          <a href="#" style={{ color: 'var(--text-secondary)' }}>Privacy Policy</a>
          <a href="#" style={{ color: 'var(--text-secondary)' }}>Terms of Service</a>
          <a href="#" style={{ color: 'var(--text-secondary)' }}>Contact Us</a>
        </div>
        <p>&copy; 2026 ResumeAI. Built with passion for excellence.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
