import axios from 'axios';

export interface DolibarrConfig {
  baseUrl: string;
  apiKey?: string;
}

export interface LoginCredentials {
  login: string;
  password: string;
}

export interface DolibarrUser {
  id: number;
  login: string;
  firstname: string;
  lastname: string;
  email: string;
  admin: boolean;
}

export interface LoginResponse {
  success: {
    token: string;
  };
}

class DolibarrApiService {
  private api: any;
  private token: string | null = null;

  constructor(config: DolibarrConfig) {
    
    this.api = axios.create({
      baseURL: `${config.baseUrl}/api/index.php`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    // Intercepteur pour ajouter le token à chaque requête
    this.api.interceptors.request.use((config: any) => {
      if (this.token) {
        config.headers['DOLAPIKEY'] = this.token;
      }
      return config;
    });

    // Intercepteur pour gérer les erreurs d'authentification
    this.api.interceptors.response.use(
      (response: any) => response,
      (error: any) => {
        if (error.response?.status === 401) {
          this.logout();
        }
        return Promise.reject(error);
      }
    );
  }

  // Connexion à Dolibarr
  async login(credentials: LoginCredentials): Promise<string> {
    try {
      const response: any = await this.api.post('/login', {
        login: credentials.login,
        password: credentials.password,
      });

      if (response.data.success?.token) {
        this.token = response.data.success.token;
        localStorage.setItem('dolibarr_token', this.token as string);
        return this.token as string;
      } else {
        throw new Error('Token non reçu dans la réponse');
      }
    } catch (error: any) {
      console.error('Erreur de connexion:', error);
      throw new Error(
        error.response?.data?.error?.message || 
        'Erreur de connexion à Dolibarr'
      );
    }
  }

  // Déconnexion
  logout(): void {
    this.token = null;
    localStorage.removeItem('dolibarr_token');
  }

  // Récupérer le token depuis le localStorage
  loadStoredToken(): boolean {
    const storedToken = localStorage.getItem('dolibarr_token');
    if (storedToken) {
      this.token = storedToken;
      return true;
    }
    return false;
  }

  // Vérifier si l'utilisateur est connecté
  isAuthenticated(): boolean {
    return this.token !== null;
  }

  // Obtenir les informations de l'utilisateur connecté
  async getCurrentUser(): Promise<DolibarrUser> {
    try {
      const response: any = await this.api.get('/users/info');
      return response.data;
    } catch (error: any) {
      console.error('Erreur lors de la récupération des informations utilisateur:', error);
      throw new Error(
        error.response?.data?.error?.message || 
        'Erreur lors de la récupération des informations utilisateur'
      );
    }
  }

  // Test de la connexion API
  async testConnection(): Promise<boolean> {
    try {
      await this.api.get('/status');
      return true;
    } catch (error) {
      console.error('Test de connexion échoué:', error);
      return false;
    }
  }

  // Méthode générique pour les appels API
  async apiCall<T>(endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET', data?: any): Promise<T> {
    try {
      const response: any = await this.api.request({
        url: endpoint,
        method,
        data,
      });
      return response.data;
    } catch (error: any) {
      console.error(`Erreur API ${method} ${endpoint}:`, error);
      throw new Error(
        error.response?.data?.error?.message || 
        `Erreur lors de l'appel API ${endpoint}`
      );
    }
  }
}

export default DolibarrApiService;