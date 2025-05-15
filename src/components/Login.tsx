import React, { useState } from 'react';
import styled from 'styled-components';

const LoginContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  
  @media (max-width: 768px) {
    margin: 1rem auto;
    padding: 1.5rem;
    width: 90%;
  }

  @media (max-height: 600px) {
    margin: 0.5rem auto;
    padding: 1rem;
  }
`;

const Title = styled.h1`
  color: #2C3E50;
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: #2C3E50;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
  }
  
  @media (max-width: 768px) {
    padding: 0.6rem;
  }
`;

const Button = styled.button`
  padding: 1rem;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  
  &:hover {
    background: #45a049;
    transform: translateY(-2px);
  }
  
  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
    transform: none;
  }
  
  @media (max-width: 768px) {
    padding: 0.8rem;
    font-size: 1rem;
  }
`;

const ErrorMessage = styled.span`
  color: #dc3545;
  font-size: 0.875rem;
`;

interface LoginProps {
  onStart: (userInfo: { name: string; email: string; contact: string }) => void;
}

interface FormErrors {
  name?: string;
  email?: string;
  contact?: string;
  submit?: string;
}

const Login: React.FC<LoginProps> = ({ onStart }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    // Contact validation
    const contactRegex = /^\d{10}$/;
    if (!formData.contact) {
      newErrors.contact = 'Contact number is required';
    } else if (!contactRegex.test(formData.contact)) {
      newErrors.contact = 'Please enter a valid 10-digit number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (validateForm()) {
      try {
        // Format the data before submission
        const formattedData = {
          name: formData.name.trim(),
          email: formData.email.toLowerCase().trim(),
          contact: formData.contact.trim()
        };
        
        await onStart(formattedData);
      } catch (error) {
        console.error('Error submitting form:', error);
        setErrors({ ...errors, submit: 'An error occurred. Please try again.' });
      }
    }
    
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  return (
    <LoginContainer>
      <Title>Start Quiz</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            hasError={!!errors.name}
            placeholder="Enter your name"
            disabled={isSubmitting}
          />
          {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            hasError={!!errors.email}
            placeholder="Enter your email"
            disabled={isSubmitting}
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="contact">Contact Number</Label>
          <Input
            id="contact"
            name="contact"
            type="tel"
            value={formData.contact}
            onChange={handleChange}
            hasError={!!errors.contact}
            placeholder="Enter 10-digit number"
            disabled={isSubmitting}
          />
          {errors.contact && <ErrorMessage>{errors.contact}</ErrorMessage>}
        </FormGroup>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Starting Quiz...' : 'Start Quiz'}
        </Button>
      </Form>
    </LoginContainer>
  );
};

export default Login; 