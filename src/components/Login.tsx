import React, { useState } from 'react';
import styled from 'styled-components';

const LoginContainer = styled.div`
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
`;

const Title = styled.h1`
  color: #333;
  text-align: center;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Input = styled.input`
  padding: 1rem;
  border: 2px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #4CAF50;
    outline: none;
  }
`;

const StartButton = styled.button`
  padding: 1rem 2rem;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: background 0.3s ease;

  &:hover {
    background: #45a049;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: #d32f2f;
  margin: 0;
  font-size: 0.9rem;
`;

interface LoginProps {
  onStart: (userInfo: { name: string; email: string; contact: string }) => void;
}

const Login: React.FC<LoginProps> = ({ onStart }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    contact: ''
  });

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      contact: ''
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.contact.trim()) {
      newErrors.contact = 'Contact number is required';
    } else if (!/^\d{10}$/.test(formData.contact.replace(/\D/g, ''))) {
      newErrors.contact = 'Please enter a valid 10-digit contact number';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onStart(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <LoginContainer>
      <Title>Welcome to the Quiz!</Title>
      <Form onSubmit={handleSubmit}>
        <div>
          <Input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
        </div>

        <div>
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
        </div>

        <div>
          <Input
            type="tel"
            name="contact"
            placeholder="Enter your contact number"
            value={formData.contact}
            onChange={handleChange}
          />
          {errors.contact && <ErrorMessage>{errors.contact}</ErrorMessage>}
        </div>

        <StartButton type="submit">
          Start Quiz
        </StartButton>
      </Form>
    </LoginContainer>
  );
};

export default Login; 