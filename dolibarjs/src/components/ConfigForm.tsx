import React, { useState } from 'react';
import styled from 'styled-components';

const ConfigContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`;

const ConfigCard = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 500px;
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

const HelpText = styled.p`
  font-size: 12px;
  color: #888;
  margin-top: 5px;
  margin-bottom: 0;
`;

const ExampleBox = styled.div`
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 15px;
  margin-top: 20px;
`;

const ExampleTitle = styled.h4`
  color: #495057;
  margin: 0 0 10px 0;
  font-size: 14px;
`;

const ExampleText = styled.code`
  color: #6f42c1;
  font-size: 14px;
  background: #fff;
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid #e9ecef;
`;

interface ConfigFormProps {
  onConfigSubmit: (config: { baseUrl: string }) => void;
}

const ConfigForm: React.FC<ConfigFormProps> = ({ onConfigSubmit }) => {
  const [baseUrl, setBaseUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (baseUrl.trim()) {
      // Nettoyer l'URL (supprimer les slashes de fin)
      const cleanUrl = baseUrl.trim().replace(/\/+$/, '');
      onConfigSubmit({ baseUrl: cleanUrl });
    }
  };

  return (
    <ConfigContainer>
      <ConfigCard>
        <Title>Configuration DolibarrJS</Title>
        <Subtitle>Configurez la connexion à votre instance Dolibarr</Subtitle>
        
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label htmlFor="baseUrl">URL de votre instance Dolibarr *</Label>
            <Input
              type="url"
              id="baseUrl"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              placeholder="https://mon-dolibarr.com"
              required
            />
            <HelpText>
              L'URL de base de votre installation Dolibarr (sans /api/index.php)
            </HelpText>
          </InputGroup>
          
          <Button type="submit" disabled={!baseUrl.trim()}>
            Configurer et continuer
          </Button>
        </Form>

        <ExampleBox>
          <ExampleTitle>Exemples d'URLs valides :</ExampleTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <ExampleText>https://mon-dolibarr.com</ExampleText>
            <ExampleText>http://localhost/dolibarr</ExampleText>
            <ExampleText>https://dolibarr.monentreprise.fr</ExampleText>
          </div>
        </ExampleBox>
      </ConfigCard>
    </ConfigContainer>
  );
};

export default ConfigForm;