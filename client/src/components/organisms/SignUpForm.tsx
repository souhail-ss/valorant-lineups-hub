import React, { useState } from 'react';
import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';
import { authService } from '../../services/auth.service';
import { AuthResponse } from '../../types/auth.types';

interface SignUpFormProps {
  onSuccess: (response: AuthResponse) => void;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    setErrors({});

    try {
      const response = await authService.signUp(formData);
      onSuccess(response);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Sign up failed';
      setErrors({ general: Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: '400px' }}>
      <Input
        label="Username"
        type="text"
        placeholder="Enter your username"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        error={errors.username}
        required
      />
      
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
        placeholder="Enter your password (min 6 characters)"
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
        {isLoading ? 'Creating Account...' : 'Sign Up'}
      </Button>
    </div>
  );
};