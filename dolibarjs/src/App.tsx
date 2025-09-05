import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import ConfigForm from './components/ConfigForm';
import type { DolibarrConfig } from './services/dolibarrApi';

// Composant principal de l'application
const AppContent: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        fontSize: '18px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '5px solid rgba(255,255,255,0.3)',
            borderTop: '5px solid white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }} />
          Chargement...
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <Dashboard /> : <LoginForm />;
};

const App: React.FC = () => {
  const [dolibarrConfig, setDolibarrConfig] = useState<DolibarrConfig | null>(() => {
    // Charger la configuration depuis le localStorage
    const savedConfig = localStorage.getItem('dolibarr_config');
    return savedConfig ? JSON.parse(savedConfig) : null;
  });

  const handleConfigSubmit = (config: DolibarrConfig) => {
    setDolibarrConfig(config);
    localStorage.setItem('dolibarr_config', JSON.stringify(config));
  };

  // Si aucune configuration n'est définie, afficher le formulaire de configuration
  if (!dolibarrConfig) {
    return <ConfigForm onConfigSubmit={handleConfigSubmit} />;
  }

  return (
    <AuthProvider dolibarrConfig={dolibarrConfig}>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
