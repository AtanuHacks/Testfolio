import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { submitContactForm } from '../utils/api';
import '../styles/contact.css';

gsap.registerPlugin(ScrollTrigger);

function Contact() {
  const contactRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-form', {
        opacity: 0,
        x: -50,
        duration: 1,
        scrollTrigger: {
          trigger: '.contact-form',
          start: 'top 70%',
        }
      });

      gsap.from('.contact-info', {
        opacity: 0,
        x: 50,
        duration: 1,
        scrollTrigger: {
          trigger: '.contact-info',
          start: 'top 70%',
        }
      });
    }, contactRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await submitContactForm(formData);
      setStatus({ type: 'success', message: response.message });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: error.message || 'Failed to send message. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="contact" ref={contactRef}>
      <div className="container">
        <div className="section-title">
          <h2>Get In Touch</h2>
        </div>

        <div className="contact-wrapper">
          <div className="contact-form card">
            <h3>Send Me a Message</h3>
            
            {status.message && (
              <div className={`alert alert-${status.type}`}>
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          <div className="contact-info">
            <div className="info-card card">
              <div className="info-icon">📧</div>
              <h4>Email</h4>
              <p>your.email@example.com</p>
            </div>

            <div className="info-card card">
              <div className="info-icon">📱</div>
              <h4>Phone</h4>
              <p>+91 1234567890</p>
            </div>

            <div className="info-card card">
              <div className="info-icon">📍</div>
              <h4>Location</h4>
              <p>Kolkata, West Bengal, India</p>
            </div>

            <div className="social-links">
              <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="social-link">
                GitHub
              </a>
              <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="social-link">
                LinkedIn
              </a>
              <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className="social-link">
                Twitter
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;