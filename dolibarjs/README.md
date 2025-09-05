# DolibarrJS - Application React pour Dolibarr

Une application React moderne qui utilise l'API REST de Dolibarr pour se connecter et interagir avec votre instance Dolibarr.

## 🚀 Fonctionnalités

- **Interface moderne** : UI/UX moderne avec styled-components
- **Authentification sécurisée** : Connexion via l'API REST de Dolibarr
- **Gestion d'état** : Context API React pour la gestion de l'authentification
- **TypeScript** : Code entièrement typé pour une meilleure robustesse
- **Responsive** : Interface adaptée à tous les écrans

## 📋 Prérequis

- Node.js (version 16 ou supérieure)
- npm ou yarn
- Instance Dolibarr avec l'API REST activée

## 🔧 Configuration de Dolibarr

Avant d'utiliser DolibarrJS, assurez-vous que votre instance Dolibarr est correctement configurée :

### 1. Activer l'API REST

Dans votre interface d'administration Dolibarr :
1. Allez dans `Configuration` → `Modules/Applications`
2. Recherchez et activez le module `API/Webservices REST`
3. Configurez les permissions API pour vos utilisateurs

### 2. Configurer les CORS (si nécessaire)

Si votre application React et Dolibarr sont sur des domaines différents, vous devrez configurer les CORS dans Dolibarr :

1. Modifiez le fichier `htdocs/api/index.php`
2. Ajoutez les headers CORS appropriés
3. Ou configurez votre serveur web (Apache/Nginx) pour gérer les CORS

## 🛠️ Installation et démarrage

### 1. Cloner et installer

```bash
# Si vous n'avez pas encore le projet
git clone <url-du-repo>
cd dolibarjs

# Installer les dépendances
npm install
```

### 2. Démarrer l'application

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

### 3. Configuration initiale

Au premier lancement, vous devrez :
1. Saisir l'URL de votre instance Dolibarr (ex: `https://mon-dolibarr.com`)
2. Vous connecter avec vos identifiants Dolibarr

## 📁 Structure du projet

```
dolibarjs/
├── src/
│   ├── components/          # Composants React
│   │   ├── LoginForm.tsx    # Formulaire de connexion
│   │   ├── Dashboard.tsx    # Tableau de bord principal
│   │   └── ConfigForm.tsx   # Configuration de l'instance
│   ├── contexts/            # Contexts React
│   │   └── AuthContext.tsx  # Gestion de l'authentification
│   ├── services/            # Services API
│   │   └── dolibarrApi.ts   # Client API Dolibarr
│   ├── App.tsx              # Composant principal
│   └── main.tsx             # Point d'entrée
├── package.json
└── README.md
```

## 🔐 Authentification

L'application utilise le système d'authentification par token de l'API Dolibarr :

1. **Connexion** : Envoi des identifiants à `/api/index.php/login`
2. **Token** : Réception et stockage du token d'authentification
3. **Requêtes** : Ajout automatique du token dans l'en-tête `DOLAPIKEY`
4. **Déconnexion** : Suppression du token stocké

## 🎨 Interface utilisateur

### Écran de configuration
- Configuration de l'URL de l'instance Dolibarr
- Validation de l'URL saisie
- Sauvegarde locale de la configuration

### Écran de connexion
- Formulaire de connexion moderne
- Gestion des erreurs d'authentification
- Animation de chargement

### Tableau de bord
- Informations utilisateur
- Statistiques de connexion
- Actions rapides (extensibles)

## 🔧 API Dolibarr

Le service `DolibarrApiService` fournit :

### Méthodes d'authentification
- `login(credentials)` : Connexion utilisateur
- `logout()` : Déconnexion
- `isAuthenticated()` : Vérification du statut
- `getCurrentUser()` : Informations utilisateur

### Méthodes utilitaires
- `testConnection()` : Test de la connexion API
- `apiCall<T>(endpoint, method, data)` : Appel API générique

## 🚀 Développement

### Scripts disponibles

```bash
npm run dev          # Démarrage en mode développement
npm run build        # Build de production
npm run preview      # Aperçu du build
npm run lint         # Linting du code
```

### Ajout de nouvelles fonctionnalités

Pour ajouter de nouvelles fonctionnalités :

1. **Nouveaux endpoints API** : Étendre `DolibarrApiService`
2. **Nouveaux composants** : Créer dans `/src/components/`
3. **Nouvelle logique métier** : Utiliser des hooks personnalisés
4. **Nouveaux contextes** : Créer dans `/src/contexts/`

## 🔒 Sécurité

- Les tokens sont stockés dans le localStorage
- Déconnexion automatique en cas d'erreur 401
- Validation des entrées utilisateur
- Headers CORS appropriés

## 🐛 Dépannage

### Problèmes de CORS
```
Access to fetch at 'https://mon-dolibarr.com/api/index.php/login' 
from origin 'http://localhost:5173' has been blocked by CORS policy
```

**Solution** : Configurez les CORS dans votre instance Dolibarr ou utilisez un proxy de développement.

### Erreur d'authentification
```
Erreur de connexion à Dolibarr
```

**Vérifications** :
- L'API REST est activée dans Dolibarr
- Les identifiants sont corrects
- L'utilisateur a les permissions API

### Token invalide
```
Erreur 401: Unauthorized
```

**Solution** : Reconnectez-vous pour obtenir un nouveau token.

## 📝 Contribution

1. Fork du projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit des changements (`git commit -am 'Ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Créer une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🤝 Support

Pour toute question ou problème :
- Créer une issue sur GitHub
- Consulter la documentation Dolibarr API
- Vérifier la configuration de votre instance Dolibarr

---

**Développé avec ❤️ pour la communauté Dolibarr**