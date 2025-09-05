import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`;

const LoginCard = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 400px;
  transform: translateY(0);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 10px;
  font-size: 28px;
  font-weight: 700;
`;

const Subtitle = styled.p`
  text-align: center;
  color: #666;
  margin-bottom: 30px;
  font-size: 16px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled.div`
  position: relative;
`;

const Label = styled.label`
  display: block;
  color: #555;
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 14px;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  border: 2px solid #e1e5e9;
  border-radius: 10px;
  font-size: 16px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: #aaa;
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  margin-top: 10px;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  background: #fee;
  color: #c53030;
  padding: 12px 16px;
  border-radius: 8px;
  border-left: 4px solid #c53030;
  font-size: 14px;
  margin-top: 10px;
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid #ffffff;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 1s ease-in-out infinite;
  margin-right: 10px;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const DolibarrLogo = styled.div`
  text-align: center;
  margin-bottom: 30px;
  font-size: 48px;
  color: #667eea;
`;

const LoginForm: React.FC = () => {
  const [credentials, setCredentials] = useState({
    login: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, error, clearError } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Effacer l'erreur quand l'utilisateur commence à taper
    if (error) {
      clearError();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!credentials.login || !credentials.password) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await login(credentials);
    } catch (error) {
      // L'erreur est déjà gérée par le contexte
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <DolibarrLogo>🚀</DolibarrLogo>
        <Title>DolibarrJS</Title>
        <Subtitle>Connectez-vous à votre instance Dolibarr</Subtitle>
        
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label htmlFor="login">Nom d'utilisateur</Label>
            <Input
              type="text"
              id="login"
              name="login"
              value={credentials.login}
              onChange={handleInputChange}
              placeholder="Entrez votre nom d'utilisateur"
              required
              disabled={isSubmitting}
            />
          </InputGroup>
          
          <InputGroup>
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              placeholder="Entrez votre mot de passe"
              required
              disabled={isSubmitting}
            />
          </InputGroup>
          
          <Button type="submit" disabled={isSubmitting || !credentials.login || !credentials.password}>
            {isSubmitting && <LoadingSpinner />}
            {isSubmitting ? 'Connexion...' : 'Se connecter'}
          </Button>
          
          {error && (
            <ErrorMessage>
              {error}
            </ErrorMessage>
          )}
        </Form>
      </LoginCard>
    </LoginContainer>
  );
};

export default LoginForm;