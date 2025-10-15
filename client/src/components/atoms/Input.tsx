import React from 'react';

interface InputProps {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  error?: string;
  required?: boolean;
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  label,
  error,
  required = false,
}) => {
  return (
    <div style={{ width: '100%' }}>
      {label && (
        <label
          style={{
            display: 'block',
            marginBottom: '8px',
            color: '#ece8e1',
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          {label} {required && <span style={{ color: '#ff4655' }}>*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        style={{
          width: '100%',
          padding: '14px 16px',
          background: 'rgba(255,255,255,0.05)',
          border: error ? '1px solid #ff4655' : '1px solid rgba(255,255,255,0.1)',
          borderRadius: '8px',
          color: '#ece8e1',
          fontSize: '16px',
          outline: 'none',
          transition: 'all 0.3s',
        }}
        onFocus={(e) => {
          if (!error) {
            e.currentTarget.style.borderColor = '#53e8ff';
            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(83,232,255,0.1)';
          }
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      />
      {error && (
        <span
          style={{
            display: 'block',
            marginTop: '6px',
            color: '#ff4655',
            fontSize: '12px',
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
};