#  IFIAG Student Portal

Application mobile de gestion du portail etudiant pour **IFIAG** (Institut de Formation Inter-entreprises pour l'Administration et la Gestion), developpee avec React Native et Expo.

## Fonctionnalites

- **Authentification** — Connexion et inscription securisees via JWT
- **Profil Etudiant** — Consultation des informations personnelles et academiques
- **Navigation par onglets** — Interface fluide avec Accueil et Profil
- **Persistance de session** — Token stocke localement via AsyncStorage
- **Support multi-plateforme** — Android, iOS et Web

##  Stack Technique

| Technologie | Version | Role |
|---|---|---|
| React Native | 0.79 | Framework mobile |
| Expo | SDK 53 | Toolchain et build |
| Expo Router | 5.x | Navigation file-based |
| React Hook Form | 7.x | Gestion des formulaires |
| Axios | 1.x | Client HTTP |
| React Native Paper | 5.x | Composants UI Material |
| AsyncStorage | 2.x | Stockage local |

##  Structure du Projet

```
app/
├── _layout.tsx           # Layout racine (Stack Navigator)
├── login.tsx             # Ecran de connexion
├── register.tsx          # Ecran d'inscription
├── +not-found.tsx        # Page 404
└── (tabs)/
    ├── _layout.tsx       # Layout des onglets
    ├── index.tsx         # Accueil avec verification d'auth
    └── profile.tsx       # Profil etudiant
services/
└── api.ts                # Instance Axios avec intercepteur JWT
components/               # Composants reutilisables
constants/                # Theme et couleurs
hooks/                    # Hooks personnalises
```

##  Installation

### Prerequis

- Node.js >= 18
- npm ou yarn
- [Expo Go](https://expo.dev/go) sur votre appareil mobile

### Demarrage

```bash
# Cloner le depot
git clone https://github.com/YOUR_USERNAME/ifiag-student-portal.git
cd ifiag-student-portal

# Installer les dependances
npm install

# Lancer le serveur de developpement
npx expo start
```

Scanner le QR code affiche avec l'application Expo Go sur votre telephone.

##  Configuration

Creer un fichier `.env` a la racine du projet :

```env
API_URL=https://ifiag.pidefood.com/api
```

##  Apercu

| Connexion | Inscription | Profil |
|---|---|---|
| Formulaire avec validation | Inscription complete | Informations academiques |

##  API

L'application communique avec l'API REST IFIAG :

| Endpoint | Methode | Description |
|---|---|---|
| `/auth/login` | POST | Connexion |
| `/auth/register` | POST | Inscription |
| `/auth/profile` | GET | Profil etudiant |

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
