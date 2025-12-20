import { Link, useLocation } from 'react-router-dom';
import '../styles/footer.css';

function Footer() {
  const location = useLocation();

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="text-gradient">Portfolio</h3>
            <p>Building digital experiences that make a difference.</p>
            <div className="social-links">
              <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                GitHub
              </a>
              <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                LinkedIn
              </a>
              <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                Twitter
              </a>
              <a href="mailto:your.email@example.com" aria-label="Email">
                Email
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <div className="footer-links">
              {location.pathname === '/' ? (
                <>
                  <a onClick={() => scrollToSection('hero')}>Home</a>
                  <a onClick={() => scrollToSection('about')}>About</a>
                  <a onClick={() => scrollToSection('education')}>Education</a>
                  <a onClick={() => scrollToSection('skills')}>Skills</a>
                </>
              ) : (
                <Link to="/">Home</Link>
              )}
            </div>
          </div>

          <div className="footer-section">
            <h4>Explore</h4>
            <div className="footer-links">
              {location.pathname === '/' ? (
                <>
                  <a onClick={() => scrollToSection('projects')}>Projects</a>
                  <a onClick={() => scrollToSection('contact')}>Contact</a>
                </>
              ) : (
                <Link to="/">Back to Portfolio</Link>
              )}
              <Link to="/messages">Messages</Link>
            </div>
          </div>

          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="footer-contact">
              <p>📧 your.email@example.com</p>
              <p>📱 +91 1234567890</p>
              <p>📍 Kolkata, West Bengal, India</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Your Name. All rights reserved.</p>
          <p>Built with React, Express.js & MongoDB</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;