import React, { useState, useEffect } from 'react';
import './App.css';

// --- BOTANICAL & LIFESTYLE TIMELINE DATA ---
const farmGalleryAssets = [
  { id: 1, url: 'IMG-20260605-WA0034.jpg', title: 'Developing Cherries', desc: 'Clusters of healthy, dense Robusta cherries absorbing nutrients under our protective shade canopy.' },
  { id: 2, url: 'IMG-20260605-WA0024.jpg', title: 'Expert Field Care', desc: 'Meticulous agro-ecological maintenance given to every single tree along the protected basin.' },
  { id: 3, url: 'IMG-20260605-WA0036.jpg', title: 'Coffee Blossoms', desc: 'Delicate, jasmine-scented white coffee blossoms clustering along the nodes, signaling a fresh crop cycle.' },
  { id: 4, url: 'IMG-20260605-WA0040.jpg', title: 'Vibrant Growth', desc: 'Eco-friendly and biodiversity-friendly practices bringing absolute life to our 10+ acre community plots.' }
];

// --- EXTRACTED GALLERY SUB-COMPONENT ---
function CoffeeGallery() {
  const [activeImg, setActiveImg] = useState(null);

  return (
    <div style={{ padding: '50px 20px', backgroundColor: '#fcfaf7', textAlign: 'center', borderRadius: '12px', marginTop: '3rem', border: '1px solid #f0e6df' }}>
      <span style={{ color: '#8c6d6a', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '2px', fontWeight: 'bold' }}>Visual Documentation</span>
      <h2 style={{ fontSize: '2.2rem', color: '#4A2E2B', marginTop: '5px', marginBottom: '10px' }}>Captured Along the Trails</h2>
      <p style={{ color: '#6E5A58', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px auto' }}>A pristine look into our integrated agricultural landscape and ecological preservation steps around Lake Nabugabo.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        {farmGalleryAssets.map(img => (
          <div key={img.id} onClick={() => setActiveImg(img)} style={{ backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden', border: '1px solid #eee', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' }} className="gallery-hover-card">
            <img src={img.url} alt={img.title} style={{ width: '100%', height: '280px', objectFit: 'cover' }} />
            <div style={{ padding: '20px', textAlign: 'left' }}>
              <h4 style={{ color: '#4A2E2B', margin: '0 0 8px 0', fontSize: '1.1rem' }}>{img.title}</h4>
              <p style={{ color: '#666', margin: 0, fontSize: '0.88rem', lineHeight: '1.5' }}>{img.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {activeImg && (
        <div onClick={() => setActiveImg(null)} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(26, 15, 14, 0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000 }}>
          <div style={{ position: 'relative', backgroundColor: '#fff', padding: '15px', borderRadius: '12px', maxWidth: '550px', width: '90%' }} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setActiveImg(null)} style={{ position: 'absolute', top: '-15px', right: '-15px', background: '#4A2E2B', color: '#fff', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>✕</button>
            <img src={activeImg.url} alt={activeImg.title} style={{ width: '100%', height: 'auto', borderRadius: '6px', maxHeight: '65vh', objectFit: 'contain' }} />
            <h3 style={{ color: '#4A2E2B', marginTop: '15px', marginBottom: '5px' }}>{activeImg.title}</h3>
            <p style={{ color: '#555', margin: 0, fontSize: '0.95rem' }}>{activeImg.desc}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// --- MAIN APPLICATION CONTEXT ---
function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [shopTab, setShopTab] = useState('coffee'); // 'coffee' or 'trips'
  const [selectedProductImg, setSelectedProductImg] = useState("IMG-20260607-WA0016.jpg");
  const [basket, setBasket] = useState([]);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Form Fields Structure
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', deliveryAddress: '', dateOfArrival: '', extraNotes: '',
    cardNumber: '', cardExpiry: '', cardCvc: ''
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  useEffect(() => {
    if (currentPage !== 'success') return;
    const fade = setTimeout(() => setIsRedirecting(true), 4000);
    const reset = setTimeout(() => {
      setCurrentPage('home');
      setBasket([]);
      setIsRedirecting(false);
      setFormData({ name: '', email: '', phone: '', deliveryAddress: '', dateOfArrival: '', extraNotes: '', cardNumber: '', cardExpiry: '', cardCvc: '' });
    }, 4500);
    return () => { clearTimeout(fade); clearTimeout(reset); };
  }, [currentPage]);

  // Global E-Commerce Action Handlers
  const addToBasket = (item) => {
    setBasket(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + (item.qty || 1) } : i);
      }
      return [...prev, { ...item, qty: item.qty || 1 }];
    });
  };

  const updateQty = (id, change) => {
    setBasket(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.qty + change;
        return newQty > 0 ? { ...item, qty: newQty } : item;
      }
      return item;
    }).filter(item => item.qty > 0));
  };

  const removeFromBasket = (id) => {
    setBasket(prev => prev.filter(item => item.id !== id));
  };

  const getBasketTotal = () => {
    return basket.reduce((acc, item) => acc + (item.price * item.qty), 0);
  };

  const getBasketCount = () => {
    return basket.reduce((acc, item) => acc + item.qty, 0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'cardNumber') {
      const nums = value.replace(/\D/g, '');
      const chunks = nums.match(/.{1,4}/g)?.join(' ') || nums;
      setFormData(prev => ({ ...prev, [name]: chunks.slice(0, 19) }));
      return;
    }
    if (name === 'cardExpiry') {
      const nums = value.replace(/\D/g, '');
      setFormData(prev => ({ ...prev, [name]: nums.length >= 2 ? `${nums.slice(0,2)}/${nums.slice(2,4)}`.slice(0,5) : nums }));
      return;
    }
    if (name === 'cardCvc') {
      setFormData(prev => ({ ...prev, [name]: value.replace(/\D/g, '').slice(0, 4) }));
      return;
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const checkoutSubmission = (e) => {
    e.preventDefault();
    if (basket.length === 0) return alert("Your basket is empty.");
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setCurrentPage('success');
    }, 2500);
  };

  const containsTrips = basket.some(item => item.type === 'tour');

  return (
    <div className="App" style={{ fontFamily: '"Inter", sans-serif', color: '#333', backgroundColor: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* PROFESSIONAL COMMERCE HEADER & NAVIGATION */}
      {currentPage !== 'success' && (
        <nav className="navbar" style={{ backgroundColor: '#4A2E2B', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 40px', position: 'sticky', top: 0, zIndex: 1000, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          <div onClick={() => setCurrentPage('home')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <img src="IMG-20260505-WA0006.jpg" alt="Nabugabo Logo" style={{ height: '42px', borderRadius: '4px' }} />
          </div>
          <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <button className={currentPage === 'home' ? 'active-nav-link' : 'nav-link'} onClick={() => setCurrentPage('home')}>Home</button>
            <button className={currentPage === 'shop' ? 'active-nav-link' : 'nav-link'} onClick={() => setCurrentPage('shop')}>Online Market</button>
            <button className={currentPage === 'process' ? 'active-nav-link' : 'nav-link'} onClick={() => setCurrentPage('process')}>Our Process</button>
            <button className={currentPage === 'nature' ? 'active-nav-link' : 'nav-link'} onClick={() => setCurrentPage('nature')}>Ecology</button>
            <button className={currentPage === 'farmers' ? 'active-nav-link' : 'nav-link'} onClick={() => setCurrentPage('farmers')}>Community</button>
            <button className={currentPage === 'contact' ? 'active-nav-link' : 'nav-link'} onClick={() => setCurrentPage('contact')}>Contact Desk</button>
            
            {/* Live Basket Widget */}
            <button 
              onClick={() => setCurrentPage('basket')} 
              style={{ background: '#fcfaf7', color: '#4A2E2B', border: 'none', padding: '8px 16px', borderRadius: '20px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', position: 'relative' }}
            >
              💼 Basket 
              <span style={{ backgroundColor: '#2e4a31', color: '#fff', borderRadius: '50%', padding: '2px 8px', fontSize: '0.8rem' }}>
                {getBasketCount()}
              </span>
            </button>
          </div>
        </nav>
      )}

      {/* RENDER SPACE */}
      <main className="content-container" style={{ maxWidth: '1400px', width: '100%', margin: '0 auto', padding: '40px 20px', flex: 1, boxSizing: 'border-box' }}>
        
        {/* 1. HOME VIEW */}
        {currentPage === 'home' && (
          <div className="page home-page" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <header style={{ background: 'linear-gradient(135deg, #4A2E2B 0%, #2A1513 100%)', color: '#fff', padding: '60px 40px', borderRadius: '12px', textAlign: 'center', marginBottom: '40px' }}>
              <span style={{ background: '#fcfaf7', color: '#4A2E2B', padding: '6px 16px', borderRadius: '20px', display: 'inline-block', marginBottom: '20px', fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Masaka District, Central Uganda</span>
              <h1 style={{ fontSize: '3rem', margin: '0 0 15px 0', lineHeight: '1.2' }}>Direct Farm-to-Cup Eco-Tourism</h1>
              <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto 30px auto', color: '#dfd3c3', lineHeight: '1.6' }}>
                Transforming traditional coffee smallholders from commodity suppliers into proud service delivery hosts. Explore premium whole bean products and conservation trail tracks directly owned by our farming families.
              </p>
              <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                <button onClick={() => { setCurrentPage('shop'); setShopTab('coffee'); }} style={{ background: '#fcfaf7', color: '#4A2E2B', border: 'none', padding: '14px 28px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}>Browse Online Store</button>
                <button onClick={() => { setCurrentPage('shop'); setShopTab('trips'); }} style={{ background: 'transparent', color: '#fff', border: '2px solid #fff', padding: '12px 26px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}>Book Trail Experiences</button>
              </div>
            </header>

            {/* Three Integrated Pillars Row */}
            <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', margin: '40px 0' }}>
              <div style={{ background: '#fff', border: '1px solid #eef2f5', borderTop: '4px solid #4A2E2B', padding: '25px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                <h3 style={{ margin: '0 0 12px 0', color: '#4A2E2B', display: 'flex', alignItems: 'center', gap: '10px' }}>🌾 Premium Coffee Production</h3>
                <p style={{ margin: 0, fontSize: '0.95rem', color: '#555', lineHeight: '1.6' }}>Shade-grown under a diverse botanical canopy protecting local wetlands, bypass regular middle-tier commodity brokers completely via our direct retail model.</p>
              </div>
              <div style={{ background: '#fff', border: '1px solid #eef2f5', borderTop: '4px solid #2e4a31', padding: '25px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                <h3 style={{ margin: '0 0 12px 0', color: '#2e4a31', display: 'flex', alignItems: 'center', gap: '10px' }}>🛶 Nature & Wetland Trails</h3>
                <p style={{ margin: 0, fontSize: '0.95rem', color: '#555', lineHeight: '1.6' }}>Immersive conservation safaris including pristine sunrise birdwatching, wetland biome walks, and peaceful traditional canoe expeditions alongside local stewards.</p>
              </div>
              <div style={{ background: '#fff', border: '1px solid #eef2f5', borderTop: '4px solid #b37d4e', padding: '25px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                <h3 style={{ margin: '0 0 12px 0', color: '#b37d4e', display: 'flex', alignItems: 'center', gap: '10px' }}>☕ Technical Academy Modules</h3>
                <p style={{ margin: 0, fontSize: '0.95rem', color: '#555', lineHeight: '1.6' }}>On-site workshops empowering visiting domestic and international trainees with hands-on knowledge in home brewing, roasting structures, and latte designs.</p>
              </div>
            </section>

            <CoffeeGallery />
          </div>
        )}

        {/* 2. THE MERGED ONLINE MARKET VIEW (COFFEE & TOURS TOGETHER WITH LEFT BASKET) */}
        {currentPage === 'shop' && (
          <div className="page product-showcase">
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <span style={{ color: '#2e4a31', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>Artisanal Value Addition</span>
              <h2 style={{ fontSize: '2.5rem', color: '#4A2E2B', margin: '5px 0 10px 0' }}>The Nabugabo Marketplace</h2>
              <p style={{ color: '#666', maxWidth: '700px', margin: '0 auto 25px auto', lineHeight: '1.6' }}>
                Toggle buttons below to purchase our premium slow-roasted beans or reserve direct eco-tour experiences managed entirely by community smallholders.
              </p>

              {/* TAB SWITCHER TOGGLES */}
              <div style={{ display: 'inline-flex', background: '#f5ebe0', padding: '6px', borderRadius: '30px', border: '1px solid #e0d5cb' }}>
                <button 
                  onClick={() => setShopTab('coffee')}
                  style={{ padding: '10px 24px', border: 'none', borderRadius: '20px', fontWeight: 'bold', fontSize: '0.95rem', cursor: 'pointer', backgroundColor: shopTab === 'coffee' ? '#4A2E2B' : 'transparent', color: shopTab === 'coffee' ? '#fff' : '#4A2E2B', transition: 'all 0.2s' }}
                >
                  🌾 Shop Roasted Coffee
                </button>
                <button 
                  onClick={() => setShopTab('trips')}
                  style={{ padding: '10px 24px', border: 'none', borderRadius: '20px', fontWeight: 'bold', fontSize: '0.95rem', cursor: 'pointer', backgroundColor: shopTab === 'trips' ? '#2e4a31' : 'transparent', color: shopTab === 'trips' ? '#fff' : '#2e4a31', transition: 'all 0.2s' }}
                >
                  🛶 Book Eco-Trips & Trails
                </button>
              </div>
            </div>

            {/* Split Screen Grid Container */}
            <div style={{ display: 'grid', gridTemplateColumns: basket.length > 0 ? '340px 1fr' : '1fr', gap: '40px', alignItems: 'flex-start', marginTop: '20px' }}>
              
              {/* LEFT SIDE BASKET INFRASTRUCTURE */}
              {basket.length > 0 && (
                <div style={{ background: '#fcfaf7', border: '1px solid #e0d5cb', borderRadius: '12px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', position: 'sticky', top: '100px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', borderBottom: '2px solid #e0d5cb', paddingBottom: '10px' }}>
                    <h3 style={{ margin: 0, color: '#4A2E2B', fontSize: '1.2rem' }}>🛒 Current Basket</h3>
                    <span style={{ background: '#2e4a31', color: '#fff', padding: '2px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold' }}>{getBasketCount()} Items</span>
                  </div>

                  {/* Micro list view */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '280px', overflowY: 'auto', marginBottom: '15px', paddingRight: '5px' }}>
                    {basket.map(item => (
                      <div key={item.id} style={{ display: 'flex', gap: '10px', background: '#fff', padding: '10px', borderRadius: '6px', border: '1px solid #eee', alignItems: 'center' }}>
                        <img src={item.image} alt={item.name} style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '4px' }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <h4 style={{ margin: 0, fontSize: '0.88rem', color: '#4A2E2B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</h4>
                          <p style={{ margin: '2px 0', fontSize: '0.85rem', color: '#b37d4e', fontWeight: 'bold' }}>UGX {item.price.toLocaleString()}</p>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
                            <div style={{ border: '1px solid #ccc', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', backgroundColor: '#fcfaf7' }}>
                              <button onClick={() => updateQty(item.id, -1)} style={{ padding: '1px 6px', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>-</button>
                              <span style={{ padding: '0 4px', fontSize: '0.8rem', fontWeight: 'bold' }}>{item.qty}</span>
                              <button onClick={() => updateQty(item.id, 1)} style={{ padding: '1px 6px', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>+</button>
                            </div>
                            <button onClick={() => removeFromBasket(item.id)} style={{ background: 'none', border: 'none', color: '#cc0000', fontSize: '0.75rem', cursor: 'pointer' }}>Remove</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ borderTop: '1px dashed #e0d5cb', paddingTop: '12px', marginBottom: '15px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold', color: '#4A2E2B' }}>
                      <span>Subtotal:</span>
                      <span style={{ fontSize: '1.1rem', color: '#b37d4e' }}>UGX {getBasketTotal().toLocaleString()}</span>
                    </div>
                  </div>

                  {/* DIRECT SECURE CHECKOUT ROUTER BUTTON */}
                  <button 
                    onClick={() => setCurrentPage('basket')}
                    style={{ width: '100%', background: '#2e4a31', color: '#fff', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', fontSize: '0.95rem', cursor: 'pointer', boxShadow: '0 2px 6px rgba(46,74,49,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  >
                    Proceed to Checkout Desk ➔
                  </button>
                </div>
              )}

              {/* DYNAMIC RIGHT VIEWPORTS BY SUB-TAB CHOICE */}
              <div style={{ width: '100%' }}>
                {shopTab === 'coffee' ? (
                  /* SUB-VIEW 1: PACKAGED ROASTED BEAN DETAIL CONTROLS */
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
                    <div>
                      <div style={{ border: '1px solid #eee', borderRadius: '12px', overflow: 'hidden', height: '420px', backgroundColor: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={selectedProductImg} alt="Nabugabo Packaging" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                      </div>
                      <div style={{ display: 'flex', gap: '10px', marginTop: '15px', justifyContent: 'center' }}>
                        {["IMG-20260607-WA0016.jpg", "IMG-20260607-WA0018.jpg", "IMG-20260607-WA0019.jpg", "IMG-20260607-WA0020~2.jpg"].map((t, idx) => (
                          <img key={idx} src={t} alt="Thumbnail" style={{ width: '65px', height: '65px', borderRadius: '6px', objectFit: 'cover', cursor: 'pointer', border: selectedProductImg === t ? '2px solid #4A2E2B' : '1px solid #eee' }} onClick={() => setSelectedProductImg(t)} />
                        ))}
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <span style={{ backgroundColor: '#e2f0d9', color: '#385723', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold', alignSelf: 'flex-start' }}>Protected Origin Single-Lot</span>
                      <h3 style={{ fontSize: '2rem', color: '#4A2E2B', margin: '15px 0 8px 0' }}>Nabugabo Premium Roasted Bag</h3>
                      <p style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#b37d4e', margin: '0 0 20px 0' }}>UGX 28,000 <span style={{ fontSize: '0.95rem', color: '#666', fontWeight: 'normal' }}>(Net Wt. 250g Whole Bean)</span></p>
                      <p style={{ color: '#555', lineHeight: '1.6', margin: '0 0 25px 0' }}>
                        Slow-roasted in small, artisanal batches directly in the region. This heritage Robusta offers deep chocolate density, completely eliminating unwanted industrial bitterness. Highly suited for home brewing setups and complex espresso profiling.
                      </p>

                      <div style={{ background: '#fffcf9', border: '1px solid #f2ece6', borderRadius: '8px', padding: '20px', marginBottom: '25px' }}>
                        <h5 style={{ margin: '0 0 12px 0', color: '#4A2E2B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Product Specifications</h5>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.9rem', color: '#555' }}>
                          <div><strong>Micro-Region:</strong> Lake Nabugabo</div>
                          <div><strong>Varietal Type:</strong> 100% Robusta</div>
                          <div><strong>Processing:</strong> Water-Sorted Honey</div>
                          <div><strong>Ecology:</strong> Shade Canopy Built</div>
                        </div>
                      </div>

                      <button 
                        onClick={() => addToBasket({ id: 'coffee-retail-250g', name: 'Nabugabo Premium Coffee (250g Bag)', price: 28000, type: 'coffee', image: 'IMG-20260607-WA0016.jpg' })}
                        style={{ backgroundColor: '#4A2E2B', color: '#fff', border: 'none', padding: '15px', borderRadius: '6px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}
                      >
                        Add Bag to Basket
                      </button>
                    </div>
                  </div>
                ) : (
                  /* SUB-VIEW 2: EXPERIENCE TOUR CARDS REGISTER */
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
                    {/* Tour Card 1 */}
                    <div style={{ background: '#fff', border: '1px solid #eef2f5', borderRadius: '8px', padding: '25px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                          <h4 style={{ margin: 0, color: '#4A2E2B', fontSize: '1.25rem' }}>Guided Coffee Farm Tour</h4>
                          <span style={{ background: '#4A2E2B', color: '#fff', padding: '4px 10px', fontSize: '0.8rem', borderRadius: '20px', fontWeight: 'bold' }}>UGX 60,000</span>
                        </div>
                        <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '20px' }}>A highly focused 90–120 minute guided circuit across active harvesting plots with selective density and fire-pot roasting instructions.</p>
                      </div>
                      <button 
                        onClick={() => addToBasket({ id: 'tour-farm-guided', name: 'Guided Coffee Farm Tour Experience', price: 60000, type: 'tour', image: 'IMG-20260607-WA0005.jpg' })}
                        style={{ width: '100%', background: '#4A2E2B', color: '#fff', border: 'none', padding: '12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                      >
                        Book Trip Ticket
                      </button>
                    </div>

                    {/* Tour Card 2 */}
                    <div style={{ background: '#fff', border: '1px solid #eef2f5', borderRadius: '8px', padding: '25px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                          <h4 style={{ margin: 0, color: '#2e4a31', fontSize: '1.25rem' }}>Sunrise Birding & Canoe Ride</h4>
                          <span style={{ background: '#2e4a31', color: '#fff', padding: '4px 10px', fontSize: '0.8rem', borderRadius: '20px', fontWeight: 'bold' }}>UGX 90,000</span>
                        </div>
                        <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '20px' }}>Sunrise navigation across wetlands to isolate endemic avian life, accompanied directly by a trained shoreline safety controller.</p>
                      </div>
                      <button 
                        onClick={() => addToBasket({ id: 'tour-sunrise-canoe', name: 'Sunrise Birding & Canoe Ride Experience', price: 90000, type: 'tour', image: 'IMG-20260607-WA0004.jpg' })}
                        style={{ width: '100%', background: '#2e4a31', color: '#fff', border: 'none', padding: '12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                      >
                        Book Trip Ticket
                      </button>
                    </div>

                    {/* Tour Card 3 */}
                    <div style={{ background: '#fff', border: '1px solid #eef2f5', borderRadius: '8px', padding: '25px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                          <h4 style={{ margin: 0, color: '#b37d4e', fontSize: '1.25rem' }}>On-Site Sensory Cupping</h4>
                          <span style={{ background: '#b37d4e', color: '#fff', padding: '4px 10px', fontSize: '0.8rem', borderRadius: '20px', fontWeight: 'bold' }}>UGX 40,000</span>
                        </div>
                        <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '20px' }}>Sensory development class covering defect identification, water parameters, and roasting adjustments inside the academy laboratory.</p>
                      </div>
                      <button 
                        onClick={() => addToBasket({ id: 'tour-cupping-addon', name: 'Sensory Cupping Add-on Module', price: 40000, type: 'tour', image: 'IMG-20260607-WA0012.jpg' })}
                        style={{ width: '100%', background: '#b37d4e', color: '#fff', border: 'none', padding: '12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                      >
                        Book Trip Ticket
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* 3. THE GLOBAL FULL BASKET & SECURE GATEWAY CHECKOUT PANEL */}
        {currentPage === 'basket' && (
          <div className="page ecom-basket-view" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2>Your Selection Basket</h2>
            <p style={{ color: '#666', marginBottom: '30px' }}>Review your products and experiential tour selections below before initializing processing nodes.</p>

            {basket.length === 0 ? (
              <div style={{ padding: '50px', textAlign: 'center', backgroundColor: '#fafafa', borderRadius: '8px', border: '1px dashed #ccc' }}>
                <p style={{ fontSize: '1.1rem', color: '#777', margin: '0 0 15px 0' }}>Your basket is completely empty.</p>
                <button onClick={() => setCurrentPage('shop')} style={{ background: '#4A2E2B', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Return to Market</button>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px', alignItems: 'flex-start' }}>
                
                {/* Left Block: Basket Matrix */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {basket.map(item => (
                    <div key={item.id} style={{ display: 'flex', gap: '15px', padding: '15px', border: '1px solid #eee', borderRadius: '8px', alignItems: 'center', backgroundColor: '#fff' }}>
                      <img src={item.image} alt={item.name} style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '6px' }} />
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', color: '#4A2E2B' }}>{item.name}</h4>
                        <p style={{ margin: '0 0 8px 0', fontSize: '0.9rem', color: '#b37d4e', fontWeight: 'bold' }}>UGX {item.price.toLocaleString()}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ border: '1px solid #ccc', borderRadius: '4px', display: 'inline-flex', alignItems: 'center' }}>
                            <button onClick={() => updateQty(item.id, -1)} style={{ padding: '3px 8px', background: 'none', border: 'none', cursor: 'pointer' }}>-</button>
                            <span style={{ padding: '0 5px', fontSize: '0.9rem', fontWeight: 'bold' }}>{item.qty}</span>
                            <button onClick={() => updateQty(item.id, 1)} style={{ padding: '3px 8px', background: 'none', border: 'none', cursor: 'pointer' }}>+</button>
                          </div>
                          <button onClick={() => removeFromBasket(item.id)} style={{ background: 'none', border: 'none', color: '#cc0000', fontSize: '0.85rem', cursor: 'pointer' }}>Remove</button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div style={{ borderTop: '2px dashed #eee', paddingTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* CONTINUE SHOPPING BACKTRACK BUTTON */}
                    <button 
                      type="button"
                      onClick={() => setCurrentPage('shop')}
                      style={{ background: 'transparent', border: '2px solid #4A2E2B', color: '#4A2E2B', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                      ⬅ Continue Shopping
                    </button>
                    <h3 style={{ color: '#4A2E2B', margin: 0 }}>Subtotal: UGX {getBasketTotal().toLocaleString()}</h3>
                  </div>
                </div>

                {/* Right Block: Gateway Parameters Form */}
                <form onSubmit={checkoutSubmission} style={{ background: '#fcfaf7', border: '1px solid #f2ece6', padding: '25px', borderRadius: '8px' }}>
                  <h3 style={{ margin: '0 0 20px 0', color: '#4A2E2B', fontSize: '1.3rem', borderBottom: '1px solid #e0d5cb', paddingBottom: '10px' }}>Secure Checkout Portal</h3>
                  
                  <div style={{ marginBottom: '12px' }}>
                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 'bold', marginBottom: '4px' }}>Customer Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="Jane Doe" disabled={isProcessingPayment} style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }} />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 'bold', marginBottom: '4px' }}>Email Address</label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="jane@example.com" disabled={isProcessingPayment} style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 'bold', marginBottom: '4px' }}>Mobile Number</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required placeholder="+256..." disabled={isProcessingPayment} style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }} />
                    </div>
                  </div>

                  {containsTrips && (
                    <div style={{ marginBottom: '12px', background: '#eef2f5', padding: '12px', borderRadius: '6px', borderLeft: '4px solid #2e4a31' }}>
                      <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 'bold', marginBottom: '4px', color: '#2e4a31' }}>Expected Arrival Date (For Trips)</label>
                      <input type="date" name="dateOfArrival" value={formData.dateOfArrival} onChange={handleInputChange} required={containsTrips} disabled={isProcessingPayment} style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }} />
                    </div>
                  )}

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 'bold', marginBottom: '4px' }}>Delivery Address / Logistics Notes</label>
                    <textarea name="extraNotes" value={formData.extraNotes} onChange={handleInputChange} rows="2" placeholder="Specify home shipping directions for coffee bags, or dietary choices for tours..." disabled={isProcessingPayment} style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px', fontFamily: 'inherit' }} />
                  </div>

                  <div style={{ background: '#fff', border: '1px dashed #cbd5e1', padding: '15px', borderRadius: '6px', marginBottom: '20px' }}>
                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#64748b', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Card Payment Input Terminal</span>
                    <div style={{ marginBottom: '10px' }}>
                      <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} required placeholder="4111 2222 3333 4444" disabled={isProcessingPayment} style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <input type="text" name="cardExpiry" value={formData.cardExpiry} onChange={handleInputChange} required placeholder="MM/YY" disabled={isProcessingPayment} style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }} />
                      <input type="password" name="cardCvc" value={formData.cardCvc} onChange={handleInputChange} required placeholder="CVC" disabled={isProcessingPayment} style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }} />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isProcessingPayment} 
                    style={{ width: '100%', backgroundColor: '#4A2E2B', color: '#fff', border: 'none', padding: '15px', borderRadius: '6px', fontWeight: 'bold', fontSize: '1.05rem', cursor: isProcessingPayment ? 'not-allowed' : 'pointer', opacity: isProcessingPayment ? 0.7 : 1 }}
                  >
                    {isProcessingPayment ? 'Processing Secure Node...' : `Authorize Payment - UGX ${getBasketTotal().toLocaleString()}`}
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

        {/* 4. PROCESS VIEW */}
        {currentPage === 'process' && (
          <div className="page-process" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
              <span style={{ color: '#b37d4e', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>Quality Controls</span>
              <h2 style={{ fontSize: '2.5rem', color: '#4A2E2B', margin: '5px 0 10px 0' }}>Our Processing Parameters</h2>
              <p style={{ color: '#666', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
                From systematic flotation sorting down to careful moisture monitoring, discover how we process our Robusta cherries directly along the Lake Nabugabo basin.
              </p>
            </div>

            {/* TIMELINE STEPS CONTAINER */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '60px', maxWidth: '900px', margin: '0 auto' }}>
              
              {/* STEP 1 */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', alignItems: 'center', background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #f0e6df' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                    <span style={{ background: '#4A2E2B', color: '#fff', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>1</span>
                    <h3 style={{ margin: 0, color: '#4A2E2B', fontSize: '1.4rem' }}>Water Sorting & Flotation</h3>
                  </div>
                  <p style={{ color: '#555', lineHeight: '1.6', fontSize: '0.95rem' }}>
                    Immediately after hand-picking, the red coffee cherries are submerged in clean water basins. This critical step allows us to separate high-density, perfectly ripe cherries from under-developed floaters, ensuring only the highest quality fruit proceeds to processing.
                  </p>
                </div>
                <div style={{ borderRadius: '8px', overflow: 'hidden', height: '250px', border: '1px solid #eee' }}>
                  <img src="IMG-20260527-WA0008.jpg" alt="Water Sorting Basins" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>

              {/* STEP 2 */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', alignItems: 'center', background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #f0e6df' }}>
                <div className="process-order-mobile" style={{ borderRadius: '8px', overflow: 'hidden', height: '250px', border: '1px solid #eee' }}>
                  <img src="IMG-20260527-WA0007.jpg" alt="Drying Honey Parchment Coffee" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                    <span style={{ background: '#2e4a31', color: '#fff', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>2</span>
                    <h3 style={{ margin: 0, color: '#2e4a31', fontSize: '1.4rem' }}>Eco-Drying & Parchment Monitoring</h3>
                  </div>
                  <p style={{ color: '#555', lineHeight: '1.6', fontSize: '0.95rem' }}>
                    The sorted coffee beans are carefully spread out in uniform layers to dry. Our farmers systematically turn the parchment coffee multiple times a day to maintain optimal airflow, slowly bringing the moisture levels down to a stable point to lock in flavors.
                  </p>
                </div>
              </div>

              {/* STEP 3 */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', alignItems: 'center', background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #f0e6df' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                    <span style={{ background: '#b37d4e', color: '#fff', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>3</span>
                    <h3 style={{ margin: 0, color: '#b37d4e', fontSize: '1.4rem' }}>Artisanal Small-Batch Roasting</h3>
                  </div>
                  <p style={{ color: '#555', lineHeight: '1.6', fontSize: '0.95rem' }}>
                    Once dry, the green coffee is milled and transferred to our regional roasting units. We roast in slow, precise small-batches to caramelize natural sugars, highlighting the smooth chocolate density of our unique Lake Nabugabo heritage Robusta.
                  </p>
                </div>
                <div style={{ borderRadius: '8px', overflow: 'hidden', height: '250px', border: '1px solid #eee' }}>
                  <img src="IMG-20260607-WA0016.jpg" alt="Finished Nabugabo Coffee Products" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 5. ECOLOGY VIEW */}
        {currentPage === 'nature' && (
          <div className="page-ecology" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <span style={{ color: '#2e4a31', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>Environmental Stewardship</span>
            <h2>Ecology & Wetland Preservation</h2>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              Lake Nabugabo is a vital Ramsar site. Our growers preserve a natural multi-tier shade canopy that shields the fragile soil and sustains native avian paths.
            </p>
          </div>
        )}

        {/* 6. COMMUNITY VIEW */}
        {currentPage === 'farmers' && (
          <div className="page-community" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <span style={{ color: '#4A2E2B', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>Smallholder Network</span>
            <h2>Farming Families & Smallholders</h2>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              By transitioning from bulk commercial raw goods to direct-to-consumer sales and custom guided tours, local households capture maximum added value right at the farm.
            </p>
          </div>
        )}

        {/* 7. CONTACT VIEW */}
        {currentPage === 'contact' && (
          <div className="page-contact" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2>Contact Desk</h2>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              Have custom logistical inquiries, group booking alignments, or wholesale profile requests? Drop a message directly to our community desk handlers.
            </p>
          </div>
        )}

        {/* 8. SUCCESS SCREEN */}
        {currentPage === 'success' && (
          <div style={{ textAlign: 'center', padding: '80px 20px', maxWidth: '600px', margin: '0 auto', opacity: isRedirecting ? 0 : 1, transition: 'opacity 0.5s ease-in-out' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#e2f0d9', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 25px auto' }}>
              <span style={{ fontSize: '2.5rem', color: '#385723' }}>✓</span>
            </div>
            <h2 style={{ color: '#4A2E2B', fontSize: '2.2rem', marginBottom: '10px' }}>Transaction Authorized</h2>
            <p style={{ color: '#2e4a31', fontWeight: 'bold', marginBottom: '20px' }}>Order Confirmation Nodes Initialized Successfully.</p>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              Thank you for supporting smallholder eco-tourism around Lake Nabugabo. A receipt alongside logistics tracking metrics has been routed to <strong>{formData.email}</strong>.
            </p>
            <div style={{ marginTop: '40px', fontSize: '0.9rem', color: '#999' }}>
              Returning to Home Trail Matrix automatically...
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      {currentPage !== 'success' && (
        <footer style={{ backgroundColor: '#1a0f0e', color: '#a0918f', padding: '30px 40px', textAlign: 'center', borderTop: '1px solid #2a1513', fontSize: '0.9rem' }}>
          <p style={{ margin: '0 0 10px 0' }}>© 2026 Lake Nabugabo Smallholders Direct. Masaka District, Central Uganda.</p>
          <p style={{ fontSize: '0.8rem', color: '#6e5a58', margin: 0 }}>Eco-Tourism Registry • Shade Canopy Value Chains • Premium Crop Development</p>
        </footer>
      )}
    </div>
  );
}

export default App;
