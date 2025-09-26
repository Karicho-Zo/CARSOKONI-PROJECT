import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1 className="contact-title">Contact Us</h1>
        <p className="contact-subtitle">
          Get in touch with our team
        </p>
      </div>

      <div className="contact-grid">
        <div className="contact-card">
          <h2 className="contact-card-title">Send us a message</h2>
          <form className="contact-form">
            <div className="contact-form-group">
              <label className="contact-label">Name</label>
              <input
                type="text"
                className="contact-input"
              />
            </div>
            <div className="contact-form-group">
              <label className="contact-label">Email</label>
              <input
                type="email"
                className="contact-input"
              />
            </div>
            <div className="contact-form-group">
              <label className="contact-label">Message</label>
              <textarea
                rows="4"
                className="contact-textarea"
              ></textarea>
            </div>
            <button type="submit" className="contact-submit-btn">
              Send Message
            </button>
          </form>
        </div>

        <div className="contact-card">
          <h2 className="contact-card-title">Contact Information</h2>
          <div className="contact-info-section">
            <div className="contact-info-item">
              <h3>Address</h3>
              <p>
                123 Car Street<br />
                Nairobi, Kenya
              </p>
            </div>
            <div className="contact-info-item">
              <h3>Phone</h3>
              <p>
                +254 123 456 789
              </p>
            </div>
            <div className="contact-info-item">
              <h3>Email</h3>
              <p>
                info@carsokoni.com
              </p>
            </div>
            <div className="contact-info-item">
              <h3>Business Hours</h3>
              <p>
                Mon - Fri: 9:00 AM - 6:00 PM<br />
                Sat: 9:00 AM - 4:00 PM<br />
                Sun: Closed
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact