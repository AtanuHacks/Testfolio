import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/about.css';

gsap.registerPlugin(ScrollTrigger);

function About() {
  const aboutRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ensure GSAP controls initial state
      gsap.set('.about-text p', { opacity: 0, y: 30 });
      gsap.set('.stat-card', { opacity: 0, y: 40 });

      gsap.to('.about-text p', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-content',
          start: 'top 75%',
          once: true, // 🔥 KEY: no flicker on refresh
        },
      });

      gsap.to('.stat-card', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-stats-grid',
          start: 'top 80%',
          once: true, // 🔥 KEY
        },
      });
    }, aboutRef);

    return () => ctx.revert();
  }, []);


  return (
    <section id="about" className="about" ref={aboutRef}>
      <div className="container">
        <div className="section-title">
          <h2>About Me</h2>
        </div>

        <div className="about-content">
          <div className="about-text">
            <p>
              I'm a passionate Full Stack Developer with a strong foundation in modern 
              web technologies. I love turning complex problems into simple, beautiful, 
              and intuitive solutions.
            </p>
            <p>
              My journey in software development started with curiosity and has evolved 
              into a profession I'm truly passionate about. I specialize in building 
              responsive, user-friendly applications that deliver exceptional user experiences.
            </p>
            <p>
              When I'm not coding, you'll find me exploring new technologies, contributing 
              to open-source projects, or sharing knowledge with the developer community.
            </p>
          </div>

          <div className="about-stats-grid">
            <div className="stat-card card about-stats">
              <h3 className="text-gradient">50+</h3>
              <p>Projects Completed</p>
            </div>
            <div className="stat-card card about-stats">
              <h3 className="text-gradient">3+</h3>
              <p>Years Experience</p>
            </div>
            <div className="stat-card card about-stats">
              <h3 className="text-gradient">30+</h3>
              <p>Happy Clients</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;