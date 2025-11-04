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

    // Basic validation
    if (!formData.username) {
      setErrors({ username: 'Username is required' });
      setIsLoading(false);
      return;
    }

    if (!formData.email) {
      setErrors({ email: 'Email is required' });
      setIsLoading(false);
      return;
    }

    if (!formData.password || formData.password.length < 6) {
      setErrors({ password: 'Password must be at least 6 characters' });
      setIsLoading(false);
      return;
    }

    try {
      console.log('Attempting signup with:', {
        username: formData.username,
        email: formData.email,
        password: '***hidden***'
      });

      const response = await authService.signUp(formData);
      
      console.log('Signup successful:', response);
      onSuccess(response);
    } catch (error: any) {
      console.error('Signup error:', error);
      
      // Handle different error types
      if (error.response) {
        // Server responded with error
        console.error('Server error:', error.response.data);
        const errorMessage = error.response.data.message;
        
        if (Array.isArray(errorMessage)) {
          setErrors({ general: errorMessage.join(', ') });
        } else {
          setErrors({ general: errorMessage || 'Sign up failed' });
        }
      } else if (error.request) {
        // Request made but no response
        console.error('No response from server:', error.request);
        setErrors({ general: 'Cannot connect to server. Make sure backend is running on http://localhost:3000' });
      } else {
        // Something else happened
        console.error('Error:', error.message);
        setErrors({ general: error.message || 'Sign up failed' });
      }
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
          whiteSpace: 'pre-wrap',
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