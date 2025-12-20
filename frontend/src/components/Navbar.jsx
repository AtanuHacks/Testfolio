import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/navbar.css';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <Link to="/" className="logo">
          <span className="text-gradient">Portfolio</span>
        </Link>

        <div className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          {location.pathname === '/' ? (
            <>
              <a onClick={() => scrollToSection('hero')} className="nav-link">Home</a>
              <a onClick={() => scrollToSection('about')} className="nav-link">About</a>
              <a onClick={() => scrollToSection('education')} className="nav-link">Education</a>
              <a onClick={() => scrollToSection('skills')} className="nav-link">Skills</a>
              <a onClick={() => scrollToSection('projects')} className="nav-link">Projects</a>
              <a onClick={() => scrollToSection('contact')} className="nav-link">Contact</a>
            </>
          ) : (
            <Link to="/" className="nav-link">Back to Home</Link>
          )}
          <Link to="/messages" className="nav-link">Messages</Link>
        </div>

        <div 
          className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;