import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/skills.css';

gsap.registerPlugin(ScrollTrigger);

function Skills() {
  const skillsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.skill-card', {
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.skills-grid',
          start: 'top 70%',
        }
      });
    }, skillsRef);

    return () => ctx.revert();
  }, []);

  const skillsData = [
    { name: 'HTML5', icon: '🌐', category: 'Frontend' },
    { name: 'CSS3', icon: '🎨', category: 'Frontend' },
    { name: 'JavaScript', icon: '⚡', category: 'Frontend' },
    { name: 'React', icon: '⚛️', category: 'Frontend' },
    { name: 'Node.js', icon: '🟢', category: 'Backend' },
    { name: 'Express.js', icon: '🚂', category: 'Backend' },
    { name: 'MongoDB', icon: '🍃', category: 'Database' },
    { name: 'PostgreSQL', icon: '🐘', category: 'Database' },
    { name: 'Git', icon: '📚', category: 'Tools' },
    { name: 'Docker', icon: '🐳', category: 'Tools' },
    { name: 'Python', icon: '🐍', category: 'Backend' },
    { name: 'Java', icon: '☕', category: 'Backend' },
    { name: 'TypeScript', icon: '📘', category: 'Frontend' },
    { name: 'Redux', icon: '🔄', category: 'Frontend' },
    { name: 'REST APIs', icon: '🔌', category: 'Backend' },
    { name: 'AWS', icon: '☁️', category: 'Cloud' },
  ];

  return (
    <section id="skills" className="skills" ref={skillsRef}>
      <div className="container">
        <div className="section-title">
          <h2>Skills & Technologies</h2>
        </div>

        <div className="skills-grid">
          {skillsData.map((skill, index) => (
            <div key={index} className="skill-card card">
              <div className="skill-icon">{skill.icon}</div>
              <h4>{skill.name}</h4>
              <span className="skill-category">{skill.category}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;