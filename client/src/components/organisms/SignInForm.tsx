import React, { useState } from 'react';
import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';
import { authService } from '../../services/auth.service';
import { AuthResponse } from '../../types/auth.types';

interface SignInFormProps {
  onSuccess: (response: AuthResponse) => void;
}

export const SignInForm: React.FC<SignInFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    setErrors({});

    try {
      const response = await authService.signIn(formData);
      onSuccess(response);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Sign in failed';
      setErrors({ general: Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: '400px' }}>
      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        error={errors.email}
        required
      />
      
      <Input
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        error={errors.password}
        required
      />

      {errors.general && (
        <div style={{
          padding: '12px',
          background: 'rgba(255,70,85,0.1)',
          border: '1px solid #ff4655',
          borderRadius: '8px',
          color: '#ff4655',
          fontSize: '14px',
          marginBottom: '20px',
        }}>
          {errors.general}
        </div>
      )}

      <Button onClick={handleSubmit} fullWidth disabled={isLoading}>
        {isLoading ? 'Signing In...' : 'Sign In'}
      </Button>

      <div style={{ textAlign: 'center', marginTop: '16px' }}>
        <a href="#forgot" style={{ color: '#53e8ff', fontSize: '14px', textDecoration: 'none' }}>
          Forgot password?
        </a>
      </div>
    </div>
  );
};