### Dolibarr Test (React + Vite)

Application React de démonstration pour se connecter à une instance Dolibarr via son API REST avec `DOLAPIKEY`.

#### Prérequis Dolibarr
- Activer le module « Services Web (API REST) » dans Dolibarr
- Générer une clé API pour un utilisateur (onglet « Clé API »)
- Noter l’URL publique de l’instance, ex: `https://mon-dolibarr.tld`

#### Démarrage
```bash
npm install
npm run dev
```

Ouvrez l’URL dev, puis renseignez:
- URL de base: l’URL de votre instance (le chemin `/api/index.php` est ajouté automatiquement)
- Clé API: la valeur `DOLAPIKEY`

#### Notes de sécurité
- Ne stockez pas de clé API en dur dans le code. Ici, elle est saisie par l’utilisateur et conservée en `localStorage` pour la démo.
- Pour la production, préférez un backend intermédiaire qui signe les requêtes.

#### Endpoints utilisés
- `GET /about` pour tester la connectivité
- `GET /users/info` (si autorisé) pour afficher un résumé utilisateur
