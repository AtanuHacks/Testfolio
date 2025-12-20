import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/projects.css';

gsap.registerPlugin(ScrollTrigger);

function Projects() {
  const projectsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.project-card', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.projects-grid',
          start: 'top 70%',
        }
      });
    }, projectsRef);

    return () => ctx.revert();
  }, []);

  const projectsData = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce application with payment integration, user authentication, and admin dashboard.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      github: "https://github.com/yourusername/project1",
      live: "https://project1-demo.com",
      image: "🛒"
    },
    {
      title: "Task Management App",
      description: "Collaborative task management tool with real-time updates, team collaboration features, and analytics.",
      technologies: ["React", "Express", "Socket.io", "PostgreSQL"],
      github: "https://github.com/yourusername/project2",
      live: "https://project2-demo.com",
      image: "✅"
    },
    {
      title: "Weather Dashboard",
      description: "Real-time weather application with location-based forecasts, interactive maps, and weather alerts.",
      technologies: ["React", "OpenWeather API", "Chart.js"],
      github: "https://github.com/yourusername/project3",
      live: "https://project3-demo.com",
      image: "🌤️"
    },
    {
      title: "Social Media Analytics",
      description: "Analytics platform for social media metrics with data visualization and reporting features.",
      technologies: ["Python", "Django", "React", "D3.js"],
      github: "https://github.com/yourusername/project4",
      live: "https://project4-demo.com",
      image: "📊"
    },
    {
      title: "Blog Platform",
      description: "Modern blogging platform with markdown support, SEO optimization, and comment system.",
      technologies: ["Next.js", "MongoDB", "Tailwind CSS"],
      github: "https://github.com/yourusername/project5",
      live: "https://project5-demo.com",
      image: "📝"
    },
    {
      title: "Portfolio Generator",
      description: "Tool to generate customizable portfolio websites with templates and export functionality.",
      technologies: ["React", "Node.js", "Express"],
      github: "https://github.com/yourusername/project6",
      live: "https://project6-demo.com",
      image: "💼"
    }
  ];

  return (
    <section id="projects" className="projects" ref={projectsRef}>
      <div className="container">
        <div className="section-title">
          <h2>Featured Projects</h2>
        </div>

        <div className="projects-grid">
          {projectsData.map((project, index) => (
            <div key={index} className="project-card card">
              <div className="project-image">
                <span className="project-emoji">{project.image}</span>
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-technologies">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                    GitHub
                  </a>
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;