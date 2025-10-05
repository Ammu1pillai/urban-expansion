import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Map, TrendingUp, Users, DollarSign, Building2, Zap, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setLogoLoaded(true), 500);
  }, []);

  const categories = [
    {
      title: 'Population Growth',
      icon: <Users className="w-12 h-12" />,
      description: 'Explore demographic changes across Indian states from 2010-2024',
      gradient: 'from-blue-500 to-cyan-500',
      stats: '28 States',
      color: 'blue',
      features: {
        title: 'India Population Dynamics 2010-2024',
        description: 'India has experienced remarkable population growth, transforming from 1.23 billion in 2010 to over 1.44 billion in 2024. This growth showcases changing demographic patterns across states with significant urbanization trends.',
        keyPoints: [
          'Uttar Pradesh remains most populous state (240+ million)',
          'Southern states show stabilized growth rates',
          'Urban population increased from 31% to 38%',
          'Youth demographic (15-24 years) peaked at 234 million'
        ],
        data: {
          labels: ['2010', '2012', '2014', '2016', '2018', '2020', '2022', '2024'],
          values: [1230, 1270, 1310, 1340, 1370, 1400, 1420, 1445],
          unit: 'million'
        }
      }
    },
    {
      title: 'GDP Expansion',
      icon: <DollarSign className="w-12 h-12" />,
      description: 'Witness economic growth and development patterns over 14 years',
      gradient: 'from-purple-500 to-pink-500',
      stats: '₹ Growth',
      color: 'purple',
      features: {
        title: 'Indian Economic Growth Trajectory',
        description: 'India GDP has shown phenomenal growth from $1.68 trillion in 2010 to over $4.11 trillion in 2024, making it the 5th largest economy globally. The services sector leads with 55% contribution.',
        keyPoints: [
          'Per capita income grew from $1,358 to $2,841',
          'Services sector contributes 55% to GDP',
          'Manufacturing sector expanded by 187%',
          'Digital economy reached $1 trillion milestone'
        ],
        data: {
          labels: ['2010', '2012', '2014', '2016', '2018', '2020', '2022', '2024'],
          values: [1.68, 1.82, 2.04, 2.29, 2.72, 2.67, 3.74, 4.11],
          unit: 'trillion USD'
        }
      }
    },
    {
      title: 'Urban Development',
      icon: <Building2 className="w-12 h-12" />,
      description: 'Track urbanization and infrastructure expansion across regions',
      gradient: 'from-orange-500 to-red-500',
      stats: 'Metro Cities',
      color: 'orange',
      features: {
        title: 'Urban Transformation & Smart Cities',
        description: 'Urban India has witnessed unprecedented growth with 100+ smart cities development. Metro rail networks expanded from 5 cities to 15 cities, transforming urban mobility and infrastructure.',
        keyPoints: [
          'Smart Cities Mission: 100 cities developed',
          'Metro rail expanded to 15 major cities',
          'Affordable housing: 12+ million units built',
          'Urban green cover increased by 28%'
        ],
        data: {
          labels: ['2010', '2012', '2014', '2016', '2018', '2020', '2022', '2024'],
          values: [31, 32, 33, 34, 35, 36, 37, 38],
          unit: '% urban population'
        }
      }
    },
    {
      title: 'Infrastructure',
      icon: <Zap className="w-12 h-12" />,
      description: 'Monitor connectivity and infrastructure development timeline',
      gradient: 'from-green-500 to-teal-500',
      stats: 'Networks',
      color: 'green',
      features: {
        title: 'National Infrastructure Revolution',
        description: 'India infrastructure landscape transformed with massive investments in highways, railways, airports and digital connectivity. National Highway network expanded by 65% while rural road connectivity reached 99%.',
        keyPoints: [
          'National highways: 1.45 lakh km network',
          'BharatNet: 600,000+ villages connected',
          'Renewable energy: 180 GW capacity achieved',
          'Airports doubled from 74 to 148'
        ],
        data: {
          labels: ['2010', '2012', '2014', '2016', '2018', '2020', '2022', '2024'],
          values: [78, 91, 105, 132, 158, 185, 210, 245],
          unit: 'thousand km highways'
        }
      }
    }
  ];

  const scrollCards = (direction) => {
    const container = cardsRef.current;
    if (container) {
      const cardWidth = container.offsetWidth;
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      
      const newIndex = direction === 'left' 
        ? Math.max(0, activeCard - 1)
        : Math.min(categories.length - 1, activeCard + 1);
      setActiveCard(newIndex);
    }
  };

  const getColorClasses = (color) => {
    const colorMap = {
      blue: 'from-blue-500 to-blue-300',
      purple: 'from-purple-500 to-purple-300',
      orange: 'from-orange-500 to-orange-300',
      green: 'from-green-500 to-green-300'
    };
    return colorMap[color] || 'from-blue-500 to-blue-300';
  };

  const renderGraph = (data, color) => {
    const maxValue = Math.max(...data.values);
    const minValue = Math.min(...data.values);
    const colorClasses = getColorClasses(color);
    
    return (
      <div className="bg-gray-900/80 rounded-xl p-6 border border-white/20 backdrop-blur-sm">
        <div className="flex items-end justify-between h-48 mb-4 gap-2">
          {data.values.map((value, index) => {
            const height = ((value - minValue) / (maxValue - minValue)) * 80 + 20;
            return (
              <div key={index} className="flex flex-col items-center flex-1">
                <div 
                  className={`w-full max-w-12 rounded-t-lg bg-gradient-to-t ${colorClasses} transition-all duration-500 hover:scale-105 cursor-pointer shadow-lg`}
                  style={{ height: `${height}%`, minHeight: '20px' }}
                  title={`${data.labels[index]}: ${value} ${data.unit}`}
                ></div>
                <div className="text-xs text-gray-400 mt-2 text-center">
                  {data.labels[index]}
                </div>
                <div className="text-xs text-gray-300 font-semibold mt-1">
                  {value}
                </div>
              </div>
            );
          })}
        </div>
        <div className="text-center text-sm text-gray-300 mt-4">
          Growth Timeline: 2010-2024 (Values in {data.unit})
        </div>
      </div>
    );
  };

  const CategoryModal = ({ category, onClose }) => {
    if (!category) return null;

    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-2 border-white/20">
          {/* Header */}
          <div className={`p-6 bg-gradient-to-r ${category.gradient} rounded-t-2xl`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-white">
                  {category.icon}
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">{category.features.title}</h2>
                  <p className="text-white/80 mt-2">{category.description}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:bg-white/20 p-2 rounded-full transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Description */}
            <div className="mb-8">
              <p className="text-lg text-gray-300 leading-relaxed">
                {category.features.description}
              </p>
            </div>

            {/* Key Features */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Key Achievements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {category.features.keyPoints.map((point, index) => (
                  <div key={index} className="flex items-center gap-3 text-gray-300 bg-white/5 p-3 rounded-lg border border-white/10">
                    <div className={`w-3 h-3 rounded-full bg-${category.color}-500 flex-shrink-0`}></div>
                    <span className="text-sm">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Graph */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Growth Timeline (2010-2024)</h3>
              {renderGraph(category.features.data, category.color)}
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="text-2xl font-bold text-white">{category.stats}</div>
                <div className="text-sm text-gray-400">Scale</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="text-2xl font-bold text-white">14</div>
                <div className="text-sm text-gray-400">Years</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="text-2xl font-bold text-white">28</div>
                <div className="text-sm text-gray-400">States</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="text-2xl font-bold text-white">100+</div>
                <div className="text-sm text-gray-400">Cities</div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center">
              <button 
                onClick={() => window.location.href = '/map'}
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full font-bold hover:scale-105 transition-transform shadow-lg"
              >
                Explore on Map
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderGridLines = () => {
    const lines = [];
    
    for (let i = 0; i <= 50; i++) {
      lines.push(
        <line 
          key={'h' + i}
          x1="0" 
          y1={i * 2 + '%'} 
          x2="100%" 
          y2={i * 2 + '%'} 
          stroke={i % 10 === 0 ? '#06b6d4' : '#4a5568'} 
          strokeWidth={i % 10 === 0 ? '0.6' : '0.25'} 
          opacity={i % 10 === 0 ? '0.4' : '0.15'} 
        />
      );
    }
    
    for (let i = 0; i <= 50; i++) {
      lines.push(
        <line 
          key={'v' + i}
          x1={i * 2 + '%'} 
          y1="0" 
          x2={i * 2 + '%'} 
          y2="100%" 
          stroke={i % 10 === 0 ? '#a855f7' : '#4a5568'} 
          strokeWidth={i % 10 === 0 ? '0.6' : '0.25'} 
          opacity={i % 10 === 0 ? '0.4' : '0.15'} 
        />
      );
    }
    
    return lines;
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Starfield Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 150 }).map((_, i) => {
          const size = Math.random() > 0.7 ? 'w-1 h-1' : 'w-0.5 h-0.5';
          const brightness = Math.random() > 0.5 ? 'bg-white' : 'bg-gray-300';
          return (
            <div
              key={'star' + i}
              className={'absolute rounded-full ' + size + ' ' + brightness}
              style={{
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animation: 'twinkle ' + (2 + Math.random() * 3) + 's ease-in-out infinite',
                animationDelay: Math.random() * 3 + 's',
                opacity: 0.3 + Math.random() * 0.7
              }}
            ></div>
          );
        })}
      </div>

      {/* Graph Grid and Shooting Stars */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="shootingGradient1">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="1" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="shootingGradient2">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0" />
            <stop offset="50%" stopColor="#a855f7" stopOpacity="1" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="shootingGradient3">
            <stop offset="0%" stopColor="#ec4899" stopOpacity="0" />
            <stop offset="50%" stopColor="#ec4899" stopOpacity="1" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {renderGridLines()}
        
        <line x1="0" y1="20%" x2="100%" y2="20%" stroke="url(#shootingGradient1)" strokeWidth="2.5" strokeLinecap="round" opacity="0.7">
          <animate attributeName="x1" values="-20%;100%" dur="4s" repeatCount="indefinite" />
          <animate attributeName="x2" values="0%;120%" dur="4s" repeatCount="indefinite" />
        </line>
        
        <line x1="0" y1="35%" x2="100%" y2="35%" stroke="url(#shootingGradient2)" strokeWidth="2.5" strokeLinecap="round" opacity="0.6">
          <animate attributeName="x1" values="-20%;100%" dur="5s" repeatCount="indefinite" begin="0.8s" />
          <animate attributeName="x2" values="0%;120%" dur="5s" repeatCount="indefinite" begin="0.8s" />
        </line>
        
        <line x1="0" y1="50%" x2="100%" y2="50%" stroke="url(#shootingGradient3)" strokeWidth="2.5" strokeLinecap="round" opacity="0.6">
          <animate attributeName="x1" values="-20%;100%" dur="4.5s" repeatCount="indefinite" begin="1.5s" />
          <animate attributeName="x2" values="0%;120%" dur="4.5s" repeatCount="indefinite" begin="1.5s" />
        </line>
        
        <line x1="0" y1="65%" x2="100%" y2="65%" stroke="url(#shootingGradient1)" strokeWidth="2.5" strokeLinecap="round" opacity="0.7">
          <animate attributeName="x1" values="-20%;100%" dur="5.5s" repeatCount="indefinite" begin="2.2s" />
          <animate attributeName="x2" values="0%;120%" dur="5.5s" repeatCount="indefinite" begin="2.2s" />
        </line>
        
        <line x1="0" y1="80%" x2="100%" y2="80%" stroke="url(#shootingGradient2)" strokeWidth="2.5" strokeLinecap="round" opacity="0.6">
          <animate attributeName="x1" values="-20%;100%" dur="4.8s" repeatCount="indefinite" begin="3s" />
          <animate attributeName="x2" values="0%;120%" dur="4.8s" repeatCount="indefinite" begin="3s" />
        </line>
        
        <line x1="-10%" y1="10%" x2="35%" y2="28%" stroke="url(#shootingGradient1)" strokeWidth="2" strokeLinecap="round" opacity="0.5">
          <animate attributeName="x1" values="-10%;110%" dur="6s" repeatCount="indefinite" begin="0.5s" />
          <animate attributeName="x2" values="35%;155%" dur="6s" repeatCount="indefinite" begin="0.5s" />
        </line>
        
        <line x1="-10%" y1="42%" x2="35%" y2="60%" stroke="url(#shootingGradient3)" strokeWidth="2" strokeLinecap="round" opacity="0.5">
          <animate attributeName="x1" values="-10%;110%" dur="5.5s" repeatCount="indefinite" begin="1.2s" />
          <animate attributeName="x2" values="35%;155%" dur="5.5s" repeatCount="indefinite" begin="1.2s" />
        </line>
        
        <line x1="-10%" y1="72%" x2="35%" y2="90%" stroke="url(#shootingGradient2)" strokeWidth="2" strokeLinecap="round" opacity="0.5">
          <animate attributeName="x1" values="-10%;110%" dur="6.2s" repeatCount="indefinite" begin="2s" />
          <animate attributeName="x2" values="35%;155%" dur="6.2s" repeatCount="indefinite" begin="2s" />
        </line>
      </svg>

      {/* Subtle glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl top-20 -left-20 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl bottom-20 -right-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute w-64 h-64 bg-pink-500/10 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Fine Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none z-0"></div>

      <div className="relative z-10">
        {/* Header */}
        <header className="pt-8 px-8">
          <nav className="flex justify-between items-center max-w-7xl mx-auto">
            <div className="flex items-center gap-8">
              <div className="text-sm font-medium text-gray-400 tracking-wider flex items-center gap-2">
              </div>
            </div>
            <div className="flex gap-6 text-sm text-gray-300">
              <a href="#about" className="hover:text-cyan-400 transition-colors relative group">
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#data" className="hover:text-cyan-400 transition-colors relative group">
                Data
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#contact" className="hover:text-cyan-400 transition-colors relative group">
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
              </a>
            </div>
          </nav>
        </header>

        {/* Hero Section with Logo */}
        <section className="max-w-7xl mx-auto px-8 pt-20 pb-16">
          <div className="text-center">
            {/* 3D Logo Reveal with Liquid Effect */}
            <div className="relative mb-16">
              {/* Liquid Blob Background */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Animated Liquid Blobs */}
                  <div className="absolute -inset-10">
                    <div className="absolute w-64 h-64 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full animate-liquid-move-1 blur-xl"></div>
                    <div className="absolute w-56 h-56 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full animate-liquid-move-2 blur-xl top-10 left-10"></div>
                    <div className="absolute w-72 h-72 bg-gradient-to-r from-pink-500/20 to-cyan-500/20 rounded-full animate-liquid-move-3 blur-xl -top-5 -right-5"></div>
                  </div>
                </div>
              </div>

              {/* 3D Logo Container */}
              <div className="relative z-20">
                {/* Logo with 3D Fly-in */}
                <div className="relative mb-8 transform-gpu">
                  <div className="animate-logo-3d-flyin">
                    <img 
                      src="/logo.png" 
                      alt="Urban Expansion Time Lapse" 
                      className="h-32 mx-auto object-contain drop-shadow-2xl transform-gpu"
                      style={{
                        filter: 'drop-shadow(0 0 30px rgba(6, 182, 212, 0.5)) drop-shadow(0 0 60px rgba(168, 85, 247, 0.3))'
                      }}
                    />
                  </div>
                  
                  {/* 3D Reflection Effect */}
                  <div className="absolute inset-0 animate-logo-reflection opacity-40">
                    <img 
                      src="/logo.png" 
                      alt=""
                      className="h-32 mx-auto object-contain transform scale-y-[-1] blur-[2px]"
                      style={{
                        maskImage: 'linear-gradient(to bottom, transparent 0%, black 50%)'
                      }}
                    />
                  </div>
                  
                  {/* Particle Burst */}
                  <div className="absolute inset-0 animate-particle-burst">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                        style={{
                          left: '50%',
                          top: '50%',
                          transform: `rotate(${i * 30}deg) translateY(-40px)`,
                        }}
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Text Reveal with Liquid Typography */}
                <div className="relative">
                  {/* Main Title with Liquid Fill */}
                  <h1 className="text-6xl md:text-7xl font-bold mb-4 relative">
                    <span className="animate-text-liquid-reveal bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 inline-block">
                      Urban Expansion
                    </span>
                    <div className="absolute inset-0 animate-text-glow opacity-0">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 inline-block filter blur-md">
                        Urban Expansion
                      </span>
                    </div>
                  </h1>
                  
                  {/* Subtitle with Wave Animation */}
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-8 relative">
                    <span className="animate-text-wave inline-block">
                      Time Lapse
                    </span>
                    <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-underline-expand"></div>
                  </h2>
                </div>

                {/* Floating Orbital Elements */}
                <div className="absolute -top-10 -left-10 w-20 h-20 border-2 border-cyan-400/30 rounded-full animate-orbital-1"></div>
                <div className="absolute -top-5 -right-5 w-16 h-16 border-2 border-purple-400/30 rounded-full animate-orbital-2"></div>
                <div className="absolute -bottom-8 left-1/4 w-12 h-12 border-2 border-pink-400/30 rounded-full animate-orbital-3"></div>
              </div>
            </div>

            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12 relative z-10">
              Visualizing India&apos;s transformation through dynamic animations spanning 2010-2024. 
              Explore demographic shifts, economic growth, and urban development across all states.
            </p>

            {/* CTA Button */}
            <div className="mb-20 relative">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="absolute w-32 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent -left-40">
                  <div className="w-full h-full animate-pulse"></div>
                </div>
                <div className="absolute w-32 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent -right-40">
                  <div className="w-full h-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                </div>
              </div>
              
              <button 
                onClick={() => window.location.href = '/map'}
                className="group relative inline-flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full text-xl font-bold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(6,182,212,0.8)] border-2 border-cyan-400/50"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">View India Map</span>
                <div className="absolute inset-0 border-2 border-white/30 rounded-full animate-ping"></div>
                <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-cyan-300"></div>
                <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-purple-300"></div>
                <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-purple-300"></div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-pink-300"></div>
              </button>
            </div>
          </div>
        </section>
        
        {/* Category Cards */}
        <section className="max-w-7xl mx-auto px-8 py-16">
          <div className="relative">
            <h3 className="text-3xl font-bold text-center mb-8">
              Explore India&apos;s Growth
            </h3>

            <button 
              onClick={() => scrollCards('left')}
              disabled={activeCard === 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-purple-600/80 hover:bg-purple-500 disabled:opacity-30 disabled:cursor-not-allowed p-3 rounded-full transition-all hover:scale-110 border border-purple-400/30"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={() => scrollCards('right')}
              disabled={activeCard === categories.length - 1}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-purple-600/80 hover:bg-purple-500 disabled:opacity-30 disabled:cursor-not-allowed p-3 rounded-full transition-all hover:scale-110 border border-purple-400/30"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div 
              ref={cardsRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="min-w-full md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)] snap-center"
                >
                  <div 
                    onClick={() => setSelectedCategory(category)}
                    className={'relative h-80 bg-gradient-to-br ' + category.gradient + ' rounded-2xl p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] group overflow-hidden border-2 border-white/20'}
                  >
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-white/60"></div>
                    <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-white/60"></div>
                    <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-white/60"></div>
                    <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-white/60"></div>
                    
                    <div className="absolute top-4 left-12 w-16 h-0.5 bg-white/50"></div>
                    <div className="absolute bottom-4 right-12 w-16 h-0.5 bg-white/50"></div>
                    
                    <div className="relative z-10 mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-transform">
                      {category.icon}
                    </div>
                    
                    <div className="relative z-10">
                      <h4 className="text-2xl font-bold mb-4">{category.title}</h4>
                      <p className="text-white/80 mb-6">{category.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm border border-white/30">
                          {category.stats}
                        </span>
                        <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                          Click to explore →
                        </span>
                      </div>
                    </div>

                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-2 mt-8">
              {categories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveCard(index);
                    cardsRef.current?.scrollTo({ left: index * cardsRef.current.offsetWidth, behavior: 'smooth' });
                  }}
                  className={'h-2 rounded-full transition-all ' + (activeCard === index ? 'w-8 bg-cyan-400' : 'w-2 bg-white/30')}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Footer Stats */}
        <section className="max-w-7xl mx-auto px-8 py-16 border-t border-gray-800 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-cyan-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity border border-cyan-400/20"></div>
              <div className="relative p-4">
                <div className="text-4xl font-bold text-cyan-400 mb-2">28</div>
                <div className="text-sm text-gray-500">States Covered</div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-purple-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity border border-purple-400/20"></div>
              <div className="relative p-4">
                <div className="text-4xl font-bold text-purple-400 mb-2">14</div>
                <div className="text-sm text-gray-500">Years of Data</div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-pink-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity border border-pink-400/20"></div>
              <div className="relative p-4">
                <div className="text-4xl font-bold text-pink-400 mb-2">100+</div>
                <div className="text-sm text-gray-500">Cities Analyzed</div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-green-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity border border-green-400/20"></div>
              <div className="relative p-4">
                <div className="text-4xl font-bold text-green-400 mb-2">2010-24</div>
                <div className="text-sm text-gray-500">Timeline</div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Category Modal */}
      <CategoryModal 
        category={selectedCategory} 
        onClose={() => setSelectedCategory(null)} 
      />

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        /* 3D Logo Fly-in Animation */
        @keyframes logo-3d-flyin {
          0% {
            opacity: 0;
            transform: translateY(100px) rotateX(90deg) scale(0.5);
            filter: blur(20px);
          }
          50% {
            opacity: 1;
            transform: translateY(-20px) rotateX(0deg) scale(1.1);
            filter: blur(5px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotateX(0deg) scale(1);
            filter: blur(0);
          }
        }
        .animate-logo-3d-flyin {
          animation: logo-3d-flyin 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        /* Logo Reflection */
        @keyframes logo-reflection {
          0% { opacity: 0; transform: scaleY(-1) translateY(20px); }
          100% { opacity: 0.4; transform: scaleY(-1) translateY(0); }
        }
        .animate-logo-reflection {
          animation: logo-reflection 1s ease-out 0.5s forwards;
        }
        /* Particle Burst */
        @keyframes particle-burst {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(1.5);
          }
        }
        .animate-particle-burst div {
          animation: particle-burst 1s ease-out 0.8s forwards;
        }
        /* Liquid Text Reveal */
        @keyframes text-liquid-reveal {
          0% {
            clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
            opacity: 0;
          }
          50% {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            opacity: 1;
          }
          100% {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            opacity: 1;
          }
        }
        .animate-text-liquid-reveal {
          animation: text-liquid-reveal 1.2s ease-out 0.8s forwards;
          opacity: 0;
        }
        /* Text Glow */
        @keyframes text-glow {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.7; }
        }
        .animate-text-glow {
          animation: text-glow 2s ease-in-out 1.5s infinite;
        }
        /* Wave Text Animation */
        @keyframes text-wave {
          0%, 100% { transform: translateY(0); }
          25% { transform: translateY(-5px); }
          75% { transform: translateY(5px); }
        }
        .animate-text-wave {
          animation: text-wave 3s ease-in-out infinite;
        }
        /* Underline Expand */
        @keyframes underline-expand {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        .animate-underline-expand {
          animation: underline-expand 1s ease-out 1.2s forwards;
          transform-origin: left;
        }
        /* Liquid Blob Movements */
        @keyframes liquid-move-1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(20px, -15px) rotate(180deg); }
        }
        @keyframes liquid-move-2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-15px, 10px) rotate(-90deg); }
        }
        @keyframes liquid-move-3 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(10px, 20px) rotate(120deg); }
        }
        .animate-liquid-move-1 {
          animation: liquid-move-1 8s ease-in-out infinite;
        }
        .animate-liquid-move-2 {
          animation: liquid-move-2 6s ease-in-out infinite reverse;
        }
        .animate-liquid-move-3 {
          animation: liquid-move-3 10s ease-in-out infinite;
        }
        /* Orbital Animations */
        @keyframes orbital-1 {
          0% { transform: rotate(0deg) translateX(40px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(40px) rotate(-360deg); }
        }
        @keyframes orbital-2 {
          0% { transform: rotate(0deg) translateX(30px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(30px) rotate(-360deg); }
        }
        @keyframes orbital-3 {
          0% { transform: rotate(0deg) translateX(25px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(25px) rotate(-360deg); }
        }
        .animate-orbital-1 {
          animation: orbital-1 15s linear infinite;
        }
        .animate-orbital-2 {
          animation: orbital-2 12s linear infinite reverse;
        }
        .animate-orbital-3 {
          animation: orbital-3 18s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;