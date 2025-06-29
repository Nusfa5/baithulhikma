import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const FeedbackCenter = () => {
  const [toEmail, setToEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSend = (e) => {
    e.preventDefault();

    if (!toEmail.trim() || !message.trim()) {
      setStatus('❗ Please fill in both email and message.');
      return;
    }

    const templateParams = {
      to_email: toEmail,
      message: message,
    };

    emailjs.send(
      'service_dyktjzw',    
      'template_44vsjig',    
      templateParams,
      'vd4PvjnQ0P2b5y-Vg'     
    ).then(() => {
      setStatus('✅ Feedback sent to ' + toEmail);
      setMessage('');
      setToEmail('');
    }).catch((error) => {
      console.error('EmailJS Error:', error);
      setStatus('❌ Failed to send feedback.');
    });
  };

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-info text-white">
        Send Feedback / Announcement
      </div>
      <div className="card-body">
        <form onSubmit={handleSend}>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Recipient's Email"
            value={toEmail}
            onChange={(e) => setToEmail(e.target.value)}
            required
          />
          <textarea
            className="form-control mb-3"
            rows="4"
            placeholder="Write a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-info">
            Send Message
          </button>
        </form>
        {status && <div className="alert alert-info mt-3">{status}</div>}
      </div>
    </div>
  );
};

export default FeedbackCenter;
