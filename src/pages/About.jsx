import './About.css'

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1 className="about-title">About Carsokoni</h1>
        <p className="about-subtitle">
          Your trusted marketplace for buying and selling cars in Kenya
        </p>
      </div>

      <div className="about-card">
        <h2 className="about-section-title">Our Mission</h2>
        <p className="about-mission-text">
          To provide a seamless, transparent, and secure platform for car buyers and sellers
          across Kenya, making the automotive marketplace more accessible and trustworthy.
        </p>
      </div>

      <div className="about-card">
        <h2 className="about-section-title">Why Choose Us?</h2>
        <div className="about-grid">
          <div>
            <h3 className="about-feature-title">Verified Sellers</h3>
            <p className="about-feature-text">
              All our sellers are thoroughly vetted for your peace of mind.
            </p>
          </div>
          <div>
            <h3 className="about-feature-title">Quality Assurance</h3>
            <p className="about-feature-text">
              Every car listing goes through our quality check process.
            </p>
          </div>
          <div>
            <h3 className="about-feature-title">Secure Transactions</h3>
            <p className="about-feature-text">
              Safe and secure payment processing for all transactions.
            </p>
          </div>
          <div>
            <h3 className="about-feature-title">Nationwide Coverage</h3>
            <p className="about-feature-text">
              We serve customers across all major cities in Kenya.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About