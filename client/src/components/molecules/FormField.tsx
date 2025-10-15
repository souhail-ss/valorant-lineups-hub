import React from 'react';
import { Input } from '../atoms/Input';

interface FormFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
}

export const FormField: React.FC<FormFieldProps> = (props) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <Input {...props} />
    </div>
  );
};