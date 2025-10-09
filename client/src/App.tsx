import React, { useState } from 'react';

// Types
interface Lineup {
  id: string;
  agent: string;
  map: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  views: number;
  imageUrl?: string;
}

// Mock Data
const mockLineups: Lineup[] = [
  {
    id: '1',
    agent: 'Sova',
    map: 'Ascent',
    title: 'A-Site Recon Dart',
    description: 'Perfect recon dart that reveals entire A-site including heaven and rafters',
    difficulty: 'Easy',
    views: 1200
  },
  {
    id: '2',
    agent: 'Viper',
    map: 'Bind',
    title: 'B-Site Snake Bite',
    description: 'Post-plant lineup covering default plant spot from hookah',
    difficulty: 'Medium',
    views: 3500
  },
  {
    id: '3',
    agent: 'Brimstone',
    map: 'Haven',
    title: 'C-Site Molly',
    description: 'Molly lineup from garage that lands on default plant',
    difficulty: 'Easy',
    views: 890
  },
  {
    id: '4',
    agent: 'KAY/O',
    map: 'Icebox',
    title: 'B-Site Flash',
    description: 'Perfect pop-flash to enter B-site yellow container',
    difficulty: 'Hard',
    views: 2100
  },
  {
    id: '5',
    agent: 'Killjoy',
    map: 'Split',
    title: 'A-Site Molly Setup',
    description: 'Post-plant molly from heaven covering default and truck',
    difficulty: 'Medium',
    views: 1800
  },
  {
    id: '6',
    agent: 'Fade',
    map: 'Ascent',
    title: 'Mid Seize',
    description: 'Seize lineup from spawn that lands on catwalk/mid',
    difficulty: 'Easy',
    views: 950
  }
];

// Header Component
const Header: React.FC = () => {
  return (
    <header style={{
      padding: '30px 0',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      backdropFilter: 'blur(10px)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(15, 25, 35, 0.8)'
    }}>
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{
          fontSize: '28px',
          fontWeight: 700,
          background: 'linear-gradient(135deg, #ff4655 0%, #ff8a80 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textTransform: 'uppercase',
          letterSpacing: '2px'
        }}>
          ⚡ LINEUPS.GG
        </div>
        <ul style={{
          display: 'flex',
          gap: '40px',
          listStyle: 'none',
          margin: 0,
          padding: 0
        }}>
          {['Home', 'Browse', 'Agents', 'Maps', 'Submit'].map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                style={{
                  color: '#ece8e1',
                  textDecoration: 'none',
                  fontWeight: 500,
                  position: 'relative',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#ff4655';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#ece8e1';
                }}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

// Hero Component
const Hero: React.FC = () => {
  return (
    <section style={{ padding: '80px 0', textAlign: 'center' }}>
      <h1 style={{
        fontSize: '64px',
        fontWeight: 800,
        marginBottom: '20px',
        background: 'linear-gradient(135deg, #ece8e1 0%, #ff4655 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        Master Every Lineup
      </h1>
      <p style={{
        fontSize: '20px',
        color: '#a8a29e',
        marginBottom: '40px'
      }}>
        The ultimate collection of Valorant utility lineups for every agent and map
      </p>
    </section>
  );
};

// Filter Bar Component
interface FilterBarProps {
  maps: string[];
  selectedMap: string;
  onMapSelect: (map: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ maps, selectedMap, onMapSelect }) => {
  return (
    <div style={{
      display: 'flex',
      gap: '20px',
      justifyContent: 'center',
      margin: '50px 0',
      flexWrap: 'wrap'
    }}>
      {maps.map((map) => (
        <button
          key={map}
          onClick={() => onMapSelect(map)}
          style={{
            padding: '12px 30px',
            background: selectedMap === map ? '#ff4655' : 'rgba(255,255,255,0.05)',
            border: selectedMap === map ? '1px solid #ff4655' : '1px solid rgba(255,255,255,0.1)',
            color: '#ece8e1',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.3s',
            fontSize: '16px',
            fontWeight: 500
          }}
          onMouseEnter={(e) => {
            if (selectedMap !== map) {
              e.currentTarget.style.background = 'rgba(255,70,85,0.2)';
              e.currentTarget.style.borderColor = '#ff4655';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }
          }}
          onMouseLeave={(e) => {
            if (selectedMap !== map) {
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
            }
          }}
        >
          {map}
        </button>
      ))}
    </div>
  );
};

// Lineup Card Component
interface LineupCardProps {
  lineup: Lineup;
}

const LineupCard: React.FC<LineupCardProps> = ({ lineup }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const difficultyColors = {
    Easy: '#66ff66',
    Medium: '#ffaa00',
    Hard: '#ff4655'
  };

  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: isHovered ? '1px solid #ff4655' : '1px solid rgba(255,255,255,0.1)',
        borderRadius: '12px',
        overflow: 'hidden',
        transition: 'all 0.3s',
        cursor: 'pointer',
        position: 'relative',
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: isHovered ? '0 20px 40px rgba(255,70,85,0.2)' : 'none'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top gradient line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '4px',
        background: 'linear-gradient(90deg, #ff4655, #53e8ff)',
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.3s'
      }} />
      
      {/* Card Image */}
      <div style={{
        width: '100%',
        height: '200px',
        background: 'linear-gradient(135deg, #1a2632 0%, #2a3642 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <span style={{
          color: 'rgba(255,255,255,0.2)',
          fontSize: '14px',
          fontWeight: 700,
          letterSpacing: '2px'
        }}>
          LINEUP PREVIEW
        </span>
      </div>
      
      {/* Card Content */}
      <div style={{ padding: '20px' }}>
        {/* Badges */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '15px'
        }}>
          <span style={{
            display: 'inline-block',
            padding: '6px 12px',
            background: 'rgba(255,70,85,0.2)',
            border: '1px solid #ff4655',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            {lineup.agent}
          </span>
          <span style={{
            padding: '6px 12px',
            background: 'rgba(83,232,255,0.2)',
            border: '1px solid #53e8ff',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: 600,
            textTransform: 'uppercase'
          }}>
            {lineup.map}
          </span>
        </div>
        
        {/* Title & Description */}
        <h3 style={{
          fontSize: '18px',
          fontWeight: 700,
          marginBottom: '8px',
          color: '#ece8e1'
        }}>
          {lineup.title}
        </h3>
        <p style={{
          fontSize: '14px',
          color: '#a8a29e',
          lineHeight: 1.5
        }}>
          {lineup.description}
        </p>
        
        {/* Footer */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '15px',
          paddingTop: '15px',
          borderTop: '1px solid rgba(255,255,255,0.1)'
        }}>
          <span style={{
            fontSize: '12px',
            color: difficultyColors[lineup.difficulty]
          }}>
            ● {lineup.difficulty}
          </span>
          <span style={{
            fontSize: '12px',
            color: '#a8a29e'
          }}>
            {lineup.views > 999 ? `${(lineup.views / 1000).toFixed(1)}k` : lineup.views} views
          </span>
        </div>
      </div>
    </div>
  );
};

// Stats Component
const Stats: React.FC = () => {
  const stats = [
    { number: '847', label: 'Total Lineups' },
    { number: '23', label: 'Agents Covered' },
    { number: '9', label: 'Active Maps' }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '30px',
      margin: '80px 0'
    }}>
      {stats.map((stat) => {
        const [isHovered, setIsHovered] = useState(false);
        return (
          <div
            key={stat.label}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: isHovered ? '1px solid #ff4655' : '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              padding: '30px',
              textAlign: 'center',
              transition: 'all 0.3s',
              transform: isHovered ? 'translateY(-5px)' : 'translateY(0)'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div style={{
              fontSize: '48px',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #ff4655 0%, #53e8ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '10px'
            }}>
              {stat.number}
            </div>
            <div style={{
              fontSize: '16px',
              color: '#a8a29e',
              textTransform: 'uppercase',
              letterSpacing: '2px'
            }}>
              {stat.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Footer Component
const Footer: React.FC = () => {
  return (
    <footer style={{
      textAlign: 'center',
      padding: '40px 0',
      marginTop: '100px',
      borderTop: '1px solid rgba(255,255,255,0.1)',
      color: '#a8a29e'
    }}>
      <p>LINEUPS.GG © 2025 • Built for the Valorant Community</p>
    </footer>
  );
};

// Main App Component
const App: React.FC = () => {
  const maps = ['All Maps', 'Ascent', 'Bind', 'Haven', 'Icebox', 'Split'];
  const [selectedMap, setSelectedMap] = useState('All Maps');

  const filteredLineups = selectedMap === 'All Maps' 
    ? mockLineups 
    : mockLineups.filter(lineup => lineup.map === selectedMap);

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      {/* Animated Background Accents */}
      <div style={{
        position: 'fixed',
        top: '-100px',
        right: '-100px',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(255,70,85,0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        animation: 'float 8s ease-in-out infinite',
        zIndex: 0
      }} />
      <div style={{
        position: 'fixed',
        bottom: '-150px',
        left: '-150px',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(83,232,255,0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        animation: 'float 8s ease-in-out infinite 2s',
        zIndex: 0
      }} />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, 30px); }
        }
      `}</style>

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 20px',
        position: 'relative',
        zIndex: 1
      }}>
        <Header />
        <Hero />
        <FilterBar maps={maps} selectedMap={selectedMap} onMapSelect={setSelectedMap} />
        <Stats />
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '30px',
          margin: '50px 0'
        }}>
          {filteredLineups.map((lineup) => (
            <LineupCard key={lineup.id} lineup={lineup} />
          ))}
        </div>
        
        <Footer />
      </div>
    </div>
  );
};

export default App;