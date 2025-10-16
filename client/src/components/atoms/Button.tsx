import React, { useState } from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  fullWidth = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '14px 32px',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.3s',
        border: 'none',
        width: fullWidth ? '100%' : 'auto',
        opacity: disabled ? 0.6 : 1,
        transform: isHovered && !disabled ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: isHovered && !disabled ? '0 10px 20px rgba(255,70,85,0.3)' : 'none',
        background: 'linear-gradient(135deg, #ff4655 0%, #ff8a80 100%)',
        color: '#fff',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </button>
  );
};