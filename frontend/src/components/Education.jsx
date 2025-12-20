import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/education.css';

gsap.registerPlugin(ScrollTrigger);

function Education() {
  const educationRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.education-item', {
        opacity: 0,
        x: -50,
        duration: 0.8,
        stagger: 0.3,
        scrollTrigger: {
          trigger: '.education-timeline',
          start: 'top 70%',
        }
      });
    }, educationRef);

    return () => ctx.revert();
  }, []);

  const educationData = [
    {
      degree: "Bachelor of Technology in Computer Science and Engineering",
      institution: "Asansol Engineering College",
      year: "2024 - 2028",
      description: "Focused on software engineering, data structures, algorithms, and web development.",
      grade: "CGPA: 8.7/10"
    },
    {
      degree: "Higher Secondary Certificate",
      institution: "D.A.V. Public School, Rupnarayanpur",
      year: "2023 - 2024",
      description: "PCM with Computer Science.",
      grade: "Percentage: 93.4%"
    },
    {
      degree: "Secondary School Certificate",
      institution: "D.A.V. Public School, Rupnarayanpur",
      year: "2021 - 2022",
      description: "Completed secondary education with distinction.",
      grade: "Percentage: 95.4%"
    }
  ];

  return (
    <section id="education" className="education" ref={educationRef}>
      <div className="container">
        <div className="section-title">
          <h2>Education</h2>
        </div>

        <div className="education-timeline">
          {educationData.map((edu, index) => (
            <div key={index} className="education-item">
              <div className="education-dot"></div>
              <div className="education-content card">
                <span className="education-year">{edu.year}</span>
                <h3>{edu.degree}</h3>
                <h4>{edu.institution}</h4>
                <p>{edu.description}</p>
                <span className="education-grade">{edu.grade}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Education;