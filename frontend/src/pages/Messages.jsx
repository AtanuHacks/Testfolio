import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { fetchMessages } from '../utils/api';
import '../styles/messages.css';

function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const data = await fetchMessages();
      setMessages(data);
      setError(null);
    } catch (err) {
      setError('Failed to load messages. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <>
      <Navbar />
      <section className="messages-section">
        <div className="container">
          <div className="section-title">
            <h2>Contact Messages</h2>
            <p>All messages received through the contact form</p>
          </div>

          {loading && <div className="spinner"></div>}

          {error && (
            <div className="error-message">
              <p>{error}</p>
              <button className="btn btn-primary" onClick={loadMessages}>
                Retry
              </button>
            </div>
          )}

          {!loading && !error && messages.length === 0 && (
            <div className="no-messages">
              <p>No messages yet.</p>
            </div>
          )}

          {!loading && !error && messages.length > 0 && (
            <div className="messages-grid">
              {messages.map((msg) => (
                <div key={msg._id} className="message-card card">
                  <div className="message-header">
                    <div className="message-sender">
                      <h4>{msg.name}</h4>
                      <p className="message-email">{msg.email}</p>
                    </div>
                    <span className="message-date">
                      {formatDate(msg.createdAt)}
                    </span>
                  </div>
                  <div className="message-content">
                    <h5>{msg.subject}</h5>
                    <p>{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Messages;