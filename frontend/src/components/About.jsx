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
              I'm a third-year Computer Science Engineering student with a passion for building innovative web applications and solving real-world problems through code. My journey in tech began with curiosity about how websites work, and has evolved into a deep interest in full-stack development, algorithms, and emerging technologies.
            </p>
            <p>
              Currently, I'm focused on mastering modern web development frameworks and expanding my skills in both frontend and backend technologies. I enjoy participating in hackathons, contributing to open-source projects, and continuously learning new tools to stay ahead in this ever-evolving field. When I'm not coding, you'll find me exploring new tech trends, collaborating with peers on projects, or sharing knowledge within the developer community.
            </p>
            <p>
              When I'm not coding, you'll find me exploring new technologies, contributing 
              to open-source projects, or sharing knowledge with the developer community.
            </p>
          </div>

          <div className="about-stats-grid">
            <div className="stat-card card about-stats">
              <h3 className="text-gradient">2+</h3>
              <p>Projects Completed</p>
            </div>
            <div className="stat-card card about-stats">
              <h3 className="text-gradient">[Beginner]</h3>
              <p>Years Experience</p>
            </div>
            <div className="stat-card card about-stats">
              <h3 className="text-gradient">N/A</h3>
              <p>Happy Clients</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;