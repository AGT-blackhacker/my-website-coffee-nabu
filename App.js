import React, { useState } from 'react';
import './App.css';

// Direct Asset Imports matching your project environment
import logoImg from './IMG-20260523-WA0006.jpg.jpg';
import processImg1 from './IMG-20260527-WA0008.jpg';
import processImg2 from './IMG-20260527-WA0007.jpg';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', visitors: '1', package: '', date: '', notes: '',
    paymentMethod: 'Pay on Arrival (Cash/Mobile Money)', dietaryRequirements: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault(); 
    setIsProcessingPayment(true);

    // Simulated secure routing delay
    setTimeout(() => {
      setIsProcessingPayment(false);
      setIsRedirecting(false);
      setCurrentPage('success');

      setTimeout(() => { setIsRedirecting(true); }, 5200);
      setTimeout(() => {
        setCurrentPage('home');
        setIsRedirecting(false);
        setFormData({ 
          name: '', email: '', phone: '', visitors: '1', package: '', date: '', notes: '',
          paymentMethod: 'Pay on Arrival (Cash/Mobile Money)', dietaryRequirements: ''
        });
      }, 6000); 
    }, 2500);
  };

  return (
    <div className="App">
      {/* Navigation Bar */}
      {currentPage !== 'success' && (
        <nav className="navbar">
          <div className="nav-logo" onClick={() => setCurrentPage('home')}>
            <img src={logoImg} alt="Nabugabo Organic Coffee Logo" className="brand-logo-img" style={{ height: '45px', borderRadius: '4px' }} />
          </div>
          <div className="nav-links">
            <button className={currentPage === 'home' ? 'active' : ''} onClick={() => setCurrentPage('home')}>Home</button>
            <button className={currentPage === 'tours' ? 'active' : ''} onClick={() => setCurrentPage('tours')}>Coffee Tours</button>
            <button className={currentPage === 'process' ? 'active' : ''} onClick={() => setCurrentPage('process')}>Our Process</button>
            <button className={currentPage === 'nature' ? 'active' : ''} onClick={() => setCurrentPage('nature')}>Nature</button>
            <button className={currentPage === 'farmers' ? 'active' : ''} onClick={() => setCurrentPage('farmers')}>Farmers</button>
            <button className={currentPage === 'contact' ? 'active' : ''} onClick={() => setCurrentPage('contact')}>Contact</button>
            <button className={currentPage === 'booking' ? 'active' : 'booking-cta-nav'} onClick={() => setCurrentPage('booking')} style={{ marginLeft: '10px', background: 'var(--color-secondary-brown)', color: '#fff', borderRadius: '4px' }}>Book Now</button>
          </div>
        </nav>
      )}

      {/* Main Viewports */}
      <main className="content-container">
        
        {/* 1. HOME VIEW */}
        {currentPage === 'home' && (
          <div className="page home-page">
            <header className="site-header">
              <span className="header-badge">Origin: Lake Nabugabo, Uganda</span>
              <h1>Cultivating Community Through Farm-To-Cup Tourism</h1>
              <p>Step directly onto the soil where world-class sustainable Robusta and Arabica coffee varieties are shade-grown, hand-harvested, and roasted by heritage community cooperatives.</p>
              <div className="hero-button-group">
                <button className="link-button primary-hero-btn" onClick={() => setCurrentPage('booking')}>Book A Visit Now</button>
                <button className="back-button secondary-hero-btn" onClick={() => setCurrentPage('process')} style={{ marginLeft: '10px', color: '#fff', borderColor: '#fff' }}>Explore Our Process</button>
              </div>
            </header>

            <section className="farm-specs-strip" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', textAlign: 'center', margin: '2rem 0', padding: '1.5rem', background: 'var(--color-primary-green)', color: '#fff', borderRadius: '8px' }}>
              <div className="spec-item"><h3>1,200m</h3><p style={{ color: '#fff', margin: 0 }}>High Elevation</p></div>
              <div className="spec-item"><h3>100%</h3><p style={{ color: '#fff', margin: 0 }}>Certified Organic</p></div>
              <div className="spec-item"><h3>Ramsar</h3><p style={{ color: '#fff', margin: 0 }}>Protected Basin</p></div>
              <div className="spec-item"><h3>Direct</h3><p style={{ color: '#fff', margin: 0 }}>Trade Structure</p></div>
            </section>
            
            <section className="about-section split-info-block">
              <div className="info-text-content">
                <span className="section-label" style={{ color: 'var(--color-accent-tan)', fontWeight: 'bold' }}>Our Vision</span>
                <h2>The Nabugabo Coffee Trails Initiative</h2>
                <p>
                  We are transforming traditional coffee farming from a raw supply-chain dependency into a sustainable, sovereign eco-tourism experience. By hosting global visitors directly on our smallholder plots, our farming families retain a massive piece of the roasting value chain.
                </p>
                <p>
                  This unique model bridges environmental conservation with community hospitality, generating direct funds used to construct clean water infrastructure and maintain local biodiversity corridors.
                </p>
                <button className="link-button" onClick={() => setCurrentPage('farmers')}>Meet The Farming Families</button>
              </div>
            </section>
          </div>
        )}

        {/* 2. TOURS VIEW */}
        {currentPage === 'tours' && (
          <div className="page card-view business-tours-view">
            <span className="section-label">Curated Excursions</span>
            <h2>Immersive Origin Experiences</h2>
            <p className="subtitle-lead">Choose to walk side-by-side with heritage farmers through misty forest canopies. Discover exactly how premium volcanic soil dictates the delicate acidity profiles inside your morning ritual cup.</p>
            
            <div className="tour-packages-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
              <div className="tour-pkg-card" style={{ background: '#fff', padding: '2rem', borderRadius: '8px', border: '1px solid #ddd', position: 'relative' }}>
                <div className="pkg-accent-banner" style={{ position: 'absolute', top: '10px', right: '10px', background: 'var(--color-accent-tan)', color: '#fff', padding: '2px 8px', fontSize: '0.8rem', borderRadius: '4px' }}>Popular</div>
                <h3>The Full Harvest Day-Tour</h3>
                <p>Follow a micro-lot cherry from raw branch cultivation directly down to the open-fire clay roasting pans.</p>
                <ul className="custom-checkmark-list">
                  <li>Guided canopy forest trek</li>
                  <li>Hand-picking & sorting masterclass</li>
                  <li>Traditional clay-pot fire roasting</li>
                  <li>Artisanal sensory cupping session</li>
                </ul>
                <button className="link-button full-width" style={{ width: '100%' }} onClick={() => setCurrentPage('booking')}>Reserve Spot</button>
              </div>

              <div className="tour-pkg-card alternative" style={{ background: '#fff', padding: '2rem', borderRadius: '8px', border: '1px solid #ddd' }}>
                <h3>Overnight Eco-Stay</h3>
                <p>Wake up alongside the sounds of pristine, rare avian populations inside our community-run solar forest cottages.</p>
                <ul className="custom-checkmark-list">
                  <li>Everything included in the Day-Tour</li>
                  <li>Organic heritage farm-to-table meals</li>
                  <li>Evening community campfire stories</li>
                  <li>Dawn wetland bird-watching cruise</li>
                </ul>
                <button className="link-button full-width" style={{ width: '100%' }} onClick={() => setCurrentPage('booking')}>Reserve Spot</button>
              </div>
            </div>
          </div>
        )}

        {/* 3. PROCESS VIEW */}
        {currentPage === 'process' && (
          <div className="page card-view processing-gallery">
            <span className="section-label">Quality Control Blueprint</span>
            <h2>Raw to Refined: Uncompromising Standards</h2>
            <p className="subtitle-lead">Exceptional coffee profiles are built block-by-block on the farm. We eliminate commercial shortcuts, focusing strictly on high-density sorting and slow, biological solar-honey drying schedules.</p>
            
            <div className="process-showcase-grid">
              <div className="process-card enhanced-card">
                <div className="process-img-container">
                  <img src={processImg1} alt="Freshly harvested red coffee cherries" className="process-display-photo" />
                </div>
                <div className="process-card-body">
                  <span className="step-count">Step 01</span>
                  <h3>Floating & Density Extraction</h3>
                  <p>
                    Immediately upon harvesting, ripe cherries submerge into deep spring-fed water channels. Lighter, hollow, or pest-damaged cherries rise organically to the surface and are safely skimmed away. Only dense, mineral-rich cherries settle safely at the base to guarantee a consistent profile.
                  </p>
                </div>
              </div>

              <div className="process-card enhanced-card">
                <div className="process-img-container">
                  <img src={processImg2} alt="Drying washed honey parchment coffee" className="process-display-photo" />
                </div>
                <div className="process-card-body">
                  <span className="step-count">Step 02</span>
                  <h3>Elevated Solar Honey Drying</h3>
                  <p>
                    Following meticulous de-pulping, coffee parchment undergoes slow drying sequences inside aerated solar structures. Hand-raked hourly across specialized mesh screens, continuous airflow stops sour over-fermentation, coaxing natural complex fruit sugars deep into the core structure.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. NATURE VIEW */}
        {currentPage === 'nature' && (
          <div className="page card-view nature-ecological-block">
            <span className="section-label">Environmental Stewardship</span>
            <h2>A Protected Ramsar Ecosystem Sanctuary</h2>
            <p className="subtitle-lead">Our coffee plots sit contextually intertwined with the globally protected Lake Nabugabo wetlands region—an international biodiversity hot spot safe from destructive industrial runoff.</p>
            
            <div className="nature-highlights-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
              <div className="nature-highlight-card" style={{ background: 'var(--color-bg-cream)', padding: '1.5rem', borderRadius: '6px' }}>
                <h4 style={{ color: 'var(--color-primary-green)' }}>Avian Habitat Preservation</h4>
                <p>Our strictly shade-grown coffee canopy forms a functional migratory canopy bridge for rare, endemic bird life, making it a pristine global eco-tourism destination.</p>
              </div>
              <div className="nature-highlight-card" style={{ background: 'var(--color-bg-cream)', padding: '1.5rem', borderRadius: '6px' }}>
                <h4 style={{ color: 'var(--color-primary-green)' }}>Traditional Canoe Trails</h4>
                <p>Gently coast down silent wetland borders on non-invasive wooden vessels steered by trained community conservation guides.</p>
              </div>
            </div>
          </div>
        )}

        {/* 5. FARMERS VIEW */}
        {currentPage === 'farmers' && (
          <div className="page card-view farmers-showcase">
            <span className="section-label">The Human Element</span>
            <h2>The Hearts Behind the Harvest</h2>
            <p className="subtitle-lead">When value loops back straight into the community, beautiful changes take root. Our growers are active conservation landholders and expert agricultural artisans.</p>
            
            <div className="farmer-grid modern-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
              <div className="farmer-profile card-accent" style={{ background: 'var(--color-bg-cream)', padding: '1.5rem', borderRadius: '6px', borderLeft: '4px solid var(--color-accent-tan)' }}>
                <h3>Rooted In True Purpose</h3>
                <p>Every smallholder family participating along the trail manages their plots using polyculture farming logic. Coffee crops are intercropped with high-shade banana varieties and legacy indigenous trees to completely negate the need for synthetic inputs.</p>
              </div>
              <div className="farmer-profile card-accent" style={{ background: 'var(--color-bg-cream)', padding: '1.5rem', borderRadius: '6px', borderLeft: '4px solid var(--color-accent-tan)' }}>
                <h3>Direct Trade Sovereignty</h3>
                <p>By shifting away from commodity auction blocks and welcoming you into their homes, our collective guarantees that the lion's share of financial gains is funneled into rural development, community health clinics, and educational safety nets.</p>
              </div>
            </div>
          </div>
        )}

        {/* 6. CONTACT VIEW */}
        {currentPage === 'contact' && (
          <div className="page card-view contact-us-hub">
            <span className="section-label">Plan Your Pilgrimage</span>
            <h2>Connect with the Coffee Trails Collective</h2>
            <p className="subtitle-lead">Ready to trace your morning brew down to its pristine origin roots? Reach our regional booking desk directly using the secure channels below.</p>

            <div className="contact-details-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', margin: '2rem 0' }}>
              <div className="contact-info-card" style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '6px' }}>
                <h5>Geographic Location</h5>
                <p>Lake Nabugabo Ecological Region,<br />Masaka District, Uganda</p>
              </div>
              <div className="contact-info-card" style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '6px' }}>
                <h5>Direct Electronic Desk</h5>
                <p>bookings@nabugabocoffeetrails.org</p>
              </div>
              <div className="contact-info-card" style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '6px' }}>
                <h5>Hotline Operations</h5>
                <p style={{ display: 'flex', flexDirection: 'column', gap: '4px', margin: 0, fontWeight: 'bold' }}>
                  <span>0772 993 099</span>
                  <span>0782 034 351</span>
                  <span>0772 594 640</span>
                  <span>0772 570 427</span>
                </p>
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <button className="link-button large-cta" onClick={() => setCurrentPage('booking')}>Open Secure Booking Engine</button>
            </div>
          </div>
        )}

        {/* 7. BOOKING & LOGISTICS VIEW */}
        {currentPage === 'booking' && (
          <div className="page booking-full-page premium-form-layout">
            <div className="booking-header" style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h2>Experience Registration Desk</h2>
              <p>Complete your trail selection parameters to generate your digital entry itinerary visa.</p>
            </div>

            <form className="booking-form" onSubmit={handleBookingSubmit}>
              <h3 className="form-section-title">1. Traveler Specifications</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Legal Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Elena Rostova" required disabled={isProcessingPayment} />
                </div>
                <div className="form-group">
                  <label>Secure Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="elena@origincoffee.com" required disabled={isProcessingPayment} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Mobile Contact Phone</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+256..." required disabled={isProcessingPayment} />
                </div>
                <div className="form-group">
                  <label>Total Expedition Members</label>
                  <input type="number" name="visitors" min="1" max="50" value={formData.visitors} onChange={handleInputChange} required disabled={isProcessingPayment} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Select Tour Track Package</label>
                  <select name="package" value={formData.package} onChange={handleInputChange} required disabled={isProcessingPayment}>
                    <option value="">Choose Track Package...</option>
                    <option value="Coffee Farm Tour">Full Harvest Day-Tour</option>
                    <option value="Our Coffee Process Deep Dive">Processing Deep Dive</option>
                    <option value="Nature & Wetland Tour">Nature & Wetland Tour</option>
                    <option value="Overnight Eco-Stay">Overnight Eco-Stay Combo</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Target Visit Arrival Date</label>
                  <input type="date" name="date" value={formData.date} onChange={handleInputChange} required disabled={isProcessingPayment} />
                </div>
              </div>

              <h3 className="form-section-title" style={{ marginTop: '2rem' }}>2. Coordination Logistics</h3>
              <div className="secure-payment-vault-box" style={{ background: '#f0ece3', padding: '1.5rem', borderRadius: '6px', marginBottom: '1.5rem' }}>
                <div className="form-group">
                  <label>Settlement Option</label>
                  <select name="paymentMethod" value={formData.paymentMethod} onChange={handleInputChange} required disabled={isProcessingPayment}>
                    <option value="Pay on Arrival (Cash/Mobile Money)">Pay on Arrival (Cash or Local Mobile Money)</option>
                    <option value="Invoice via Email">Request Invoice Link via Email</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Dietary Preferences / Special Group Requests</label>
                  <input type="text" name="dietaryRequirements" value={formData.dietaryRequirements} onChange={handleInputChange} placeholder="e.g. Vegetarian, Airport pickup assistance needed" disabled={isProcessingPayment} />
                </div>
              </div>

              <div className="booking-buttons" style={{ display: 'flex', gap: '1rem' }}>
                <button type="submit" className="submit-button" disabled={isProcessingPayment}>
                  {isProcessingPayment ? 'Processing Booking Registration...' : 'Finalize Reservation'}
                </button>
                <button type="button" className="back-button" onClick={() => setCurrentPage('home')} disabled={isProcessingPayment}>Cancel</button>
              </div>
            </form>
          </div>
        )}

        {/* 8. SUCCESS REDIRECT VIEW */}
        {currentPage === 'success' && (
          <div className={`page success-page-wrapper ${isRedirecting ? 'exit-shrink' : ''}`}>
            <div className="success-card elevated" style={{ background: '#fff', padding: '3rem', textAlign: 'center', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
              <div className="success-icon" style={{ fontSize: '3rem', color: 'var(--color-primary-green)' }}>✓</div>
              <h2>Expedition Confirmed!</h2>
              <h3>Thank you, {formData.name || 'Valued Guest'}.</h3>
              <p>Your digital check-in vouchers have been routed to: <strong>{formData.email}</strong></p>
              
              <div className="loader-container" style={{ background: '#eee', height: '6px', borderRadius: '3px', overflow: 'hidden', marginTop: '2rem' }}>
                <div className="loader-progress-bar" style={{ background: 'var(--color-accent-tan)', height: '100%', width: '100%' }}></div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Persistent Brand Footer */}
      {currentPage !== 'success' && (
        <footer className="site-footer" style={{ marginTop: 'auto' }}>
          <p>&copy; {new Date().getFullYear()} Nabugabo Coffee Trails Initiative. Built for Community Sovereignty.</p>
        </footer>
      )}
    </div>
  );
}

export default App;