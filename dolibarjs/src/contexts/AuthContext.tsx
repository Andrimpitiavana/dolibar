import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import DolibarrApiService from '../services/dolibarrApi';
import type { DolibarrConfig, LoginCredentials, DolibarrUser } from '../services/dolibarrApi';

interface AuthContextType {
  user: DolibarrUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  apiService: DolibarrApiService | null;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
  dolibarrConfig: DolibarrConfig;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children, dolibarrConfig }) => {
  const [user, setUser] = useState<DolibarrUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiService] = useState(() => new DolibarrApiService(dolibarrConfig));
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  // Vérifier si un token est stocké au chargement
  useEffect(() => {
    const initAuth = async () => {
      try {
        if (apiService.loadStoredToken()) {
          // Tenter de récupérer les informations utilisateur
          const userData = await apiService.getCurrentUser();
          setUser(userData);
        }
      } catch (error) {
        console.error('Erreur lors de l\'initialisation de l\'authentification:', error);
        apiService.logout();
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, [apiService]);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      await apiService.login(credentials);
      const userData = await apiService.getCurrentUser();
      setUser(userData);
    } catch (error: any) {
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    apiService.logout();
    setUser(null);
    setError(null);
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: apiService.isAuthenticated(),
    login,
    logout,
    apiService,
    error,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
};