import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SignUpForm } from '../components/organisms/SignUpForm';
import { AuthResponse } from '../types/auth.types';
import { useAuth } from '../contexts/AuthContext';

const DesignSide: React.FC = () => {
  return (
    <div style={{
      flex: 1,
      background: 'linear-gradient(135deg, rgba(255,70,85,0.1) 0%, rgba(83,232,255,0.1) 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(255,70,85,0.2) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        animation: 'float 8s ease-in-out infinite',
        top: '10%',
        right: '10%',
      }} />
      <div style={{
        position: 'absolute',
        width: '250px',
        height: '250px',
        background: 'radial-gradient(circle, rgba(83,232,255,0.2) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        animation: 'float 8s ease-in-out infinite 2s',
        bottom: '20%',
        left: '15%',
      }} />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, 20px); }
        }
      `}</style>

      <div style={{
        fontSize: '120px',
        marginBottom: '30px',
        filter: 'drop-shadow(0 10px 20px rgba(255,70,85,0.3))',
      }}>
        ⚡
      </div>
      
      <h2 style={{
        fontSize: '36px',
        fontWeight: 800,
        marginBottom: '20px',
        background: 'linear-gradient(135deg, #ece8e1 0%, #ff4655 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textAlign: 'center',
      }}>
        Join LINEUPS.GG
      </h2>
      
      <p style={{
        fontSize: '18px',
        color: '#a8a29e',
        textAlign: 'center',
        maxWidth: '400px',
        lineHeight: 1.6,
      }}>
        Create your account and start mastering every Valorant lineup today.
      </p>

      <div style={{
        marginTop: '40px',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
      }}>
        {['🎯', '🔥', '⭐'].map((emoji, i) => (
          <div key={i} style={{
            width: '60px',
            height: '60px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px',
          }}>
            {emoji}
          </div>
        ))}
      </div>
    </div>
  );
};

export const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSuccess = (response: AuthResponse) => {
    login(response.user, response.access_token);
    navigate('/');
  };
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      background: 'linear-gradient(135deg, #0f1923 0%, #1a2632 100%)',
    }}>
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px',
      }}>
        <div style={{
          width: '100%',
          maxWidth: '500px',
        }}>
          <div style={{ marginBottom: '40px' }}>
            <h1 style={{
              fontSize: '42px',
              fontWeight: 800,
              marginBottom: '12px',
              background: 'linear-gradient(135deg, #ece8e1 0%, #ff4655 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Create Account
            </h1>
            <p style={{ color: '#a8a29e', fontSize: '16px' }}>
              Start your journey to master Valorant lineups
            </p>
          </div>

          <SignUpForm onSuccess={handleSuccess} />

          <div style={{
            marginTop: '24px',
            textAlign: 'center',
            color: '#a8a29e',
            fontSize: '14px',
          }}>
            Already have an account?{' '}
            <a href="/signin" style={{ color: '#53e8ff', textDecoration: 'none', fontWeight: 600 }}>
              Sign In
            </a>
          </div>
        </div>
      </div>

      <DesignSide />
    </div>
  );
};