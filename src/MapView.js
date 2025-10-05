// src/MapView.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './globals.css';

function MapView() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedState, setSelectedState] = useState(null);
  const [showStateDetails, setShowStateDetails] = useState(false);
  const [animationState, setAnimationState] = useState('logo');
  const [showSummary, setShowSummary] = useState(false);


  const indianStates = [
  { id: 'jammu', name: 'Jammu & Kashmir', capital: 'Srinagar', top: '18%', left: '32%', video: '/videos/Jammu And Kashmir.mp4', population: { 2010: 12548926, 2015: 13900000, 2020: 14300000, 2025: 14700000 }, gdp: { 2010: 100000, 2015: 120000, 2020: 140000, 2025: 160000 } },
  { id: 'ladakh', name: 'Ladakh', capital: 'Leh', top: '17%', left: '37%', video: '/videos/Ladakh.mp4', population: { 2010: 300000, 2015: 350000, 2020: 400000, 2025: 450000 }, gdp: { 2010: 5000, 2015: 6000, 2020: 7000, 2025: 8000 } },
  { id: 'himachal', name: 'Himachal Pradesh', capital: 'Shimla', top: '24%', left: '38%', video: '/videos/Himachal Pradesh.mp4', population: { 2010: 6864602, 2015: 7100000, 2020: 7350000, 2025: 7600000 }, gdp: { 2010: 30000, 2015: 35000, 2020: 40000, 2025: 45000 } },
  { id: 'punjab', name: 'Punjab', capital: 'Chandigarh', top: '26.5%', left: '34.5%', video: '/videos/Punjab.mp4', population: { 2010: 27704236, 2015: 28000000, 2020: 28300000, 2025: 28600000 }, gdp: { 2010: 200000, 2015: 220000, 2020: 240000, 2025: 260000 } },
  { id: 'uttarakhand', name: 'Uttarakhand', capital: 'Dehradun', top: '28.5%', left: '41%', video: '/videos/Uttarakhand.mp4', population: { 2010: 10116752, 2015: 10500000, 2020: 11000000, 2025: 11500000 }, gdp: { 2010: 15000, 2015: 18000, 2020: 21000, 2025: 24000 } },
  { id: 'haryana', name: 'Haryana', capital: 'Chandigarh', top: '28.5%', left: '36%', video: '/videos/Haryana.mp4', population: { 2010: 25353081, 2015: 26000000, 2020: 26500000, 2025: 27000000 }, gdp: { 2010: 300000, 2015: 350000, 2020: 400000, 2025: 450000 } },
  { id: 'delhi', name: 'Delhi', capital: 'New Delhi', top: '32%', left: '38.5%', video: '/videos/Delhi.mp4', population: { 2010: 16753235, 2015: 18000000, 2020: 19000000, 2025: 20000000 }, gdp: { 2010: 400000, 2015: 450000, 2020: 500000, 2025: 550000 } },
  { id: 'rajasthan', name: 'Rajasthan', capital: 'Jaipur', top: '39%', left: '31%', video: '/videos/Rajasthan.mp4', population: { 2010: 68548437, 2015: 70000000, 2020: 71500000, 2025: 73000000 }, gdp: { 2010: 150000, 2015: 170000, 2020: 190000, 2025: 210000 } },
  { id: 'uttarpradesh', name: 'Uttar Pradesh', capital: 'Lucknow', top: '40%', left: '47.5%', video: '/videos/Uttar Pradesh.mp4', population: { 2010: 199812341, 2015: 210000000, 2020: 220000000, 2025: 230000000 }, gdp: { 2010: 300000, 2015: 350000, 2020: 400000, 2025: 450000 } },
  { id: 'bihar', name: 'Bihar', capital: 'Patna', top: '42%', left: '60%', video: '/videos/Bihar.mp4', population: { 2010: 104099452, 2015: 110000000, 2020: 115000000, 2025: 120000000 }, gdp: { 2010: 50000, 2015: 60000, 2020: 70000, 2025: 80000 } },
  { id: 'sikkim', name: 'Sikkim', capital: 'Gangtok', top: '37%', left: '70%', video: '/videos/Sikkim.mp4', population: { 2010: 610577, 2015: 650000, 2020: 700000, 2025: 750000 }, gdp: { 2010: 5000, 2015: 6000, 2020: 7000, 2025: 8000 } },
  { id: 'assam', name: 'Assam', capital: 'Dispur', top: '40%', left: '79%', video: '/videos/Assam.mp4', population: { 2010: 31169272, 2015: 32000000, 2020: 33000000, 2025: 34000000 }, gdp: { 2010: 100000, 2015: 120000, 2020: 140000, 2025: 160000 } },
  { id: 'arunachal', name: 'Arunachal Pradesh', capital: 'Itanagar', top: '37%', left: '85%', video: '/videos/Arunachal Pradesh.mp4', population: { 2010: 1382611, 2015: 1500000, 2020: 1600000, 2025: 1700000 }, gdp: { 2010: 10000, 2015: 12000, 2020: 14000, 2025: 16000 } },
  { id: 'nagaland', name: 'Nagaland', capital: 'Kohima', top: '42%', left: '86%', video: '/videos/Nagaland.mp4', population: { 2010: 1980602, 2015: 2100000, 2020: 2200000, 2025: 2300000 }, gdp: { 2010: 8000, 2015: 10000, 2020: 12000, 2025: 14000 } },
  { id: 'manipur', name: 'Manipur', capital: 'Imphal', top: '45%', left: '85%', video: '/videos/Manipur.mp4', population: { 2010: 2679889, 2015: 2800000, 2020: 2900000, 2025: 3000000 }, gdp: { 2010: 7000, 2015: 9000, 2020: 11000, 2025: 13000 } },
  { id: 'mizoram', name: 'Mizoram', capital: 'Aizawl', top: '48%', left: '82%', video: '/videos/Mizoram.mp4', population: { 2010: 1097206, 2015: 1150000, 2020: 1200000, 2025: 1250000 }, gdp: { 2010: 5000, 2015: 6000, 2020: 7000, 2025: 8000 } },
  { id: 'tripura', name: 'Tripura', capital: 'Agartala', top: '48%', left: '78%', video: '/videos/Tripura.mp4', population: { 2010: 3671038, 2015: 3800000, 2020: 3900000, 2025: 4000000 }, gdp: { 2010: 15000, 2015: 18000, 2020: 21000, 2025: 24000 } },
  { id: 'meghalaya', name: 'Meghalaya', capital: 'Shillong', top: '43%', left: '79%', video: '/videos/Meghalaya.mp4', population: { 2010: 2966889, 2015: 3100000, 2020: 3200000, 2025: 3300000 }, gdp: { 2010: 20000, 2015: 24000, 2020: 28000, 2025: 32000 } },
  { id: 'gujarat', name: 'Gujarat', capital: 'Gandhinagar', top: '50%', left: '24.5%', video:'/videos/Gujarat.mp4', population: { 2010: 60439692, 2015: 65000000, 2020: 69500000, 2025: 74000000 }, gdp: { 2010: 500000, 2015: 650000, 2020: 800000, 2025: 950000 } },
{ id: 'madhya-pradesh', name: 'Madhya Pradesh', capital: 'Bhopal', top: '46%', left: '44%', video:'/videos/Madhya Pradesh.mp4', population: { 2010: 72626809, 2015: 78000000, 2020: 83500000, 2025: 89000000 }, gdp: { 2010: 150000, 2015: 200000, 2020: 250000, 2025: 300000 } },
{ id: 'westbengal', name: 'West Bengal', capital: 'Kolkata', top: '52%', left: '69%', video:'/videos/West Bengal.mp4', population: { 2010: 91276115, 2015: 95000000, 2020: 98500000, 2025: 102000000 }, gdp: { 2010: 350000, 2015: 450000, 2020: 550000, 2025: 650000 } },
{ id: 'jharkhand', name: 'Jharkhand', capital: 'Ranchi', top: '49%', left: '58%', video:'/videos/Jharkhand.mp4', population: { 2010: 32988134, 2015: 36000000, 2020: 39000000, 2025: 42000000 }, gdp: { 2010: 80000, 2015: 100000, 2020: 120000, 2025: 140000 } },
{ id: 'chhattisgarh', name: 'Chhattisgarh', capital: 'Raipur', top: '56%', left: '49%', video:'/videos/Chhattisgarh.mp4', population: { 2010: 25545198, 2015: 28000000, 2020: 30500000, 2025: 33000000 }, gdp: { 2010: 60000, 2015: 80000, 2020: 100000, 2025: 120000 } },
{ id: 'odisha', name: 'Odisha', capital: 'Bhubaneswar', top: '59%', left: '60%', video:'/videos/Odisha.mp4', population: { 2010: 41974218, 2015: 45000000, 2020: 48000000, 2025: 51000000 }, gdp: { 2010: 100000, 2015: 130000, 2020: 160000, 2025: 190000 } },
{ id: 'maharashtra', name: 'Maharashtra', capital: 'Mumbai', top: '62%', left: '26%', video:'/videos/Maharashtra.mp4', population: { 2010: 112374333, 2015: 118000000, 2020: 123500000, 2025: 129000000 }, gdp: { 2010: 800000, 2015: 1000000, 2020: 1200000, 2025: 1400000 } },
{ id: 'telangana', name: 'Telangana', capital: 'Hyderabad', top: '65%', left: '39%', video:'/videos/Telangana.mp4', population: { 2010: 35003674, 2015: 37000000, 2020: 39000000, 2025: 41000000 }, gdp: { 2010: 200000, 2015: 280000, 2020: 360000, 2025: 440000 } },
{ id: 'goa', name: 'Goa', capital: 'Panaji', top: '69%', left: '28%', video:'/videos/Goa.mp4', population: { 2010: 1458545, 2015: 1550000, 2020: 1650000, 2025: 1750000 }, gdp: { 2010: 25000, 2015: 32000, 2020: 39000, 2025: 46000 } },
{ id: 'karnataka', name: 'Karnataka', capital: 'Bengaluru', top: '77%', left: '36%', video:'/videos/Karnataka.mp4', population: { 2010: 61130704, 2015: 65000000, 2020: 69000000, 2025: 73000000 }, gdp: { 2010: 400000, 2015: 550000, 2020: 700000, 2025: 850000 } },
{ id: 'andhra', name: 'Andhra Pradesh', capital: 'Amaravati', top: '67%', left: '47%', video:'/videos/Andhra Pradesh.mp4', population: { 2010: 49386799, 2015: 52000000, 2020: 54500000, 2025: 57000000 }, gdp: { 2010: 180000, 2015: 230000, 2020: 280000, 2025: 330000 } },
{ id: 'tamilnadu', name: 'Tamil Nadu', capital: 'Chennai', top: '78%', left: '45%', video:'/videos/Tamil Nadu.mp4', population: { 2010: 72147030, 2015: 75000000, 2020: 78000000, 2025: 81000000 }, gdp: { 2010: 450000, 2015: 580000, 2020: 710000, 2025: 840000 } },
{ id: 'kerala', name: 'Kerala', capital: 'Thiruvananthapuram', top: '88%', left: '37%', video:'/videos/Kerala.mp4', population: { 2010: 33406061, 2015: 34500000, 2020: 35500000, 2025: 36500000 }, gdp: { 2010: 200000, 2015: 250000, 2020: 300000, 2025: 350000 } },
{ id: 'puducherry', name: 'Puducherry', capital: 'Puducherry', top: '80%', left: '44%', video:'/videos/Puducherry.mp4', population: { 2010: 1247953, 2015: 1350000, 2020: 1450000, 2025: 1550000 }, gdp: { 2010: 15000, 2015: 20000, 2020: 25000, 2025: 30000 } },
{ id: 'lakshadweep', name: 'Lakshadweep', capital: 'Kavaratti', top: '84%', left: '25%', video:'/videos/Lakshadweep.mp4', population: { 2010: 64473, 2015: 70000, 2020: 75000, 2025: 80000 }, gdp: { 2010: 500, 2015: 700, 2020: 900, 2025: 1100 } },
{ id: 'andaman', name: 'Andaman and Nicobar Islands', capital: 'Port Blair', top: '80%', left: '82%', video:'/videos/Andaman And Nicobar.mp4', population: { 2010: 380581, 2015: 400000, 2020: 420000, 2025: 440000 }, gdp: { 2010: 3000, 2015: 4000, 2020: 5000, 2025: 6000 } },
];


  useEffect(() => {
    const logoTimer = setTimeout(() => setAnimationState('title'), 0);
    const titleTimer = setTimeout(() => setAnimationState('map'), 250);
    return () => {
      clearTimeout(logoTimer);
      clearTimeout(titleTimer);
    };
  }, []);

  const handleStateClick = (state) => {
    setSelectedState(state);
    setShowStateDetails(true);
  };

  const closeStateDetails = () => {
    setShowStateDetails(false);
    setSelectedState(null);
    setShowSummary(false);
  };

  const handleGoBackToHome = () => {
    setShowStateDetails(false);
    setSelectedState(null);
    setAnimationState('title'); // Go back to home page (title animation)
  };

  const titleVariants = {
    center: { y: 0, scale: 1.1, opacity: 1 },
    top: { y: -150, scale: 0.8, opacity: 1 },
  };

  return (
    <div className="app dark-theme">
      <AnimatePresence>
        {animationState !== 'logo' && (
          <motion.nav
            className="navbar"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="nav-container">
              <div className="logo">
                <div className="logo-small">
                  <img src="/logo.png" alt="NASA" className="logo-img-small" />
                </div>
                <span>NASA Urban Visualizer</span>
              </div>

              <div
                className={`hamburger ${isMenuOpen ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span /><span /><span />
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <main>
        <section id="home" className="hero-section">
          <div className="hero-content-wrapper">
            <AnimatePresence>
              {(animationState === 'title' || animationState === 'map') && (
                <motion.div
                  className="title-block"
                  variants={titleVariants}
                  initial="center"
                  animate={animationState === 'map' ? 'top' : 'center'}
                  transition={{ duration: 1, ease: 'easeInOut' }}
                >
                  <h1 className="map-title">
                    <span className="title-glow">URBAN EXPANSION</span>
                    <br />
                    <span className="highlight">TIME LAPSE VISUALIZER</span>
                  </h1>
                  <p className="map-subtitle">
                    Mapping India's Urban Evolution • 1985 to Present
                  </p>
                  <div className="interaction-prompt">
                    <span className="pulse-dot"></span>
                    <span className="prompt-text">Select glowing nodes to explore city development timelines</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="map-wrapper">
              <AnimatePresence>
                {animationState === 'map' && (
                  <motion.div
                    className="map-outline"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  >
                    <img
                      src="/IndiaMap.png"
                      alt="Map of India"
                      className="india-map-img"
                    />
                    {indianStates.map((state, index) => (
                      <motion.div
                        key={state.id}
                        className="state-marker"
                        style={{ top: state.top, left: state.left }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 1 + index * 0.05 }}
                        whileHover={{ scale: 1.3, zIndex: 20 }}
                        onClick={() => handleStateClick(state)}
                      >
                        <div className="dot" />
                        <div className="state-name">{state.name}</div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <div className="container">
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              About the Project
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              This interactive visualization platform uses NASA's Landsat satellite imagery to illustrate India's urban growth over four decades.
            </motion.p>
          </div>
        </section>

        <section id="data" className="section dark-section">
          <div className="container">
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              The Power of NASA's Data
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              We use decades of satellite observations to analyze Earth's surface and understand the pace of urbanization.
            </motion.p>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="container">
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              Get In Touch
            </motion.h2>
            <motion.form
              className="contact-form"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <textarea placeholder="Your Message" rows="5" required />
              <button type="submit" className="cta-button">Send Message</button>
            </motion.form>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {showStateDetails && selectedState && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeStateDetails}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-button" onClick={closeStateDetails}>
                ×
              </button>

              <h2>{selectedState.name}</h2>
              <p><strong>Capital:</strong> {selectedState.capital}</p>

              <div className="state-content">
                {!showSummary && selectedState.video ? (
                  <video
                    src={selectedState.video}
                    autoPlay
                    muted
                    controls
                    className="state-video"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onEnded={() => setShowSummary(true)}
                  />
                ) : (
                  <div className="state-summary full-modal">
                    <h3>State Summary (2011 - 2025)</h3>
                    <div className="summary-item">
                      <strong>GDP Growth:</strong>
                      <ul>
                        <li>2011: {selectedState.gdp[2010]} USD</li>
                        <li>2015: {selectedState.gdp[2015]} USD</li>
                        <li>2020: {selectedState.gdp[2020]} USD</li>
                        <li>2025: {selectedState.gdp[2025]} USD</li>
                      </ul>
                    </div>
                    <div className="summary-item">
                      <strong>Population:</strong>
                      <ul>
                        <li>2011: {selectedState.population[2011]}</li>
                        <li>2015: {selectedState.population[2015]}</li>
                        <li>2020: {selectedState.population[2020]}</li>
                        <li>2025: {selectedState.population[2025]}</li>
                      </ul>
                    </div>
                    <button
                      className="cta-button"
                      onClick={() => window.location.href = '/'}
                    >
                      Learn More
                    </button>
                  </div>
                )}
              </div>

              <button
                className="action-button"
                onClick={handleGoBackToHome}
              >
                ← Back to Home
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>



      <footer className="footer">
        <div className="container">
          <p>&copy; 2024-{new Date().getFullYear()} NASA Urban Development Visualizer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default MapView;
