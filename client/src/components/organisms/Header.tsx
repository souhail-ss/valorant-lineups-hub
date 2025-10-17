import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <header style={{
      padding: '30px 50px',
      boxShadow: '0 4px 30px rgba(255, 255, 255, 0.049)',
      borderRadius: '0 0 20px 20px',
      backdropFilter: 'blur(10px)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(15, 25, 35, 0.8)',
    }}>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>

      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div 
          onClick={() => navigate('/')}
          style={{
            fontSize: '28px',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #ff4655 0%, #ff8a80 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            cursor: 'pointer',
          }}>
          ⚡ LINEUPS.GG
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
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

          {isAuthenticated && user ? (
            <div style={{ position: 'relative' }}>
              <div
                onClick={() => setShowDropdown(!showDropdown)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: 'pointer',
                  padding: '8px 16px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '50px',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.borderColor = '#53e8ff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                }}
              >
                <div style={{
                  width: '10px',
                  height: '10px',
                  background: '#66ff66',
                  borderRadius: '50%',
                  boxShadow: '0 0 10px #66ff66',
                  animation: 'pulse 2s ease-in-out infinite',
                }} />
                
                <div style={{
                  width: '32px',
                  height: '32px',
                  background: 'linear-gradient(135deg, #ff4655 0%, #53e8ff 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#fff',
                }}>
                  {user.username.charAt(0).toUpperCase()}
                </div>

                <span style={{
                  color: '#ece8e1',
                  fontSize: '14px',
                  fontWeight: 500,
                }}>
                  {user.username}
                </span>

                <span style={{
                  color: '#a8a29e',
                  fontSize: '12px',
                  transform: showDropdown ? 'rotate(180deg)' : 'rotate(0)',
                  transition: 'transform 0.3s',
                }}>
                  ▼
                </span>
              </div>

              {showDropdown && (
                <div style={{
                  position: 'absolute',
                  top: '50px',
                  right: 0,
                  background: 'rgba(15, 25, 35, 0.95)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '8px',
                  minWidth: '200px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                  backdropFilter: 'blur(10px)',
                }}>
                  <div style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    marginBottom: '8px',
                  }}>
                    <div style={{
                      color: '#ece8e1',
                      fontSize: '14px',
                      fontWeight: 600,
                      marginBottom: '4px',
                    }}>
                      {user.username}
                    </div>
                    <div style={{
                      color: '#a8a29e',
                      fontSize: '12px',
                    }}>
                      {user.email}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      navigate('/profile');
                    }}
                    style={{
                      width: '100%',
                      padding: '10px 16px',
                      background: 'transparent',
                      border: 'none',
                      color: '#ece8e1',
                      fontSize: '14px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      borderRadius: '6px',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    👤 Profile
                  </button>

                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      navigate('/settings');
                    }}
                    style={{
                      width: '100%',
                      padding: '10px 16px',
                      background: 'transparent',
                      border: 'none',
                      color: '#ece8e1',
                      fontSize: '14px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      borderRadius: '6px',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    ⚙️ Settings
                  </button>

                  <div style={{
                    height: '1px',
                    background: 'rgba(255,255,255,0.1)',
                    margin: '8px 0',
                  }} />

                  <button
                    onClick={handleLogout}
                    style={{
                      width: '100%',
                      padding: '10px 16px',
                      background: 'transparent',
                      border: 'none',
                      color: '#ff4655',
                      fontSize: '14px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      borderRadius: '6px',
                      transition: 'all 0.2s',
                      fontWeight: 500,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255,70,85,0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => navigate('/signin')}
                style={{
                  padding: '10px 24px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#ece8e1',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 500,
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.borderColor = '#53e8ff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                }}
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/signup')}
                style={{
                  padding: '10px 24px',
                  background: 'linear-gradient(135deg, #ff4655 0%, #ff8a80 100%)',
                  border: 'none',
                  color: '#fff',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 600,
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 10px 20px rgba(255,70,85,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};