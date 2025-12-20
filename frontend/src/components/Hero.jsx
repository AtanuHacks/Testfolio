import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../styles/hero.css';

function Hero() {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-title', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.2
      });

      gsap.from('.hero-subtitle', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.5
      });

      gsap.from('.hero-description', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.8
      });

      gsap.from('.hero-buttons', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 1.1
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero" ref={heroRef}>
      <div className="hero-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>
      
      <div className="container hero-content">
        <div className="hero-text" ref={textRef}>
          <p className="hero-subtitle">Hi, I'm</p>
          <h1 className="hero-title">
            <span className="text-gradient">Your Name</span>
          </h1>
          <h2 className="hero-role">Full Stack Developer</h2>
          <p className="hero-description">
            I build exceptional digital experiences that combine beautiful design 
            with powerful functionality. Passionate about creating solutions that 
            make a difference.
          </p>
          <div className="hero-buttons" ref={buttonRef}>
            <button className="btn btn-primary" onClick={scrollToContact}>
              Get In Touch
            </button>
            <button className="btn btn-outline" onClick={scrollToProjects}>
              View Projects
            </button>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="mouse"></div>
        <p>Scroll Down</p>
      </div>
    </section>
  );
}

export default Hero;