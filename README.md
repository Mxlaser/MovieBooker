# 🎬 MovieBooker – API NestJS

**MovieBooker** est une API REST développée avec **NestJS**, permettant à des utilisateurs de :
- s’inscrire / se connecter via JWT,
- rechercher des films grâce à l’API **TMDb**,
- et **réserver des séances de cinéma** avec gestion automatique des créneaux horaires.

---

## 🚀 Fonctionnalités

- 🔐 Authentification sécurisée (JWT)
- 🧾 Création & connexion de comptes utilisateurs
- 🎬 Recherche de films via l’API TMDb (`search`, `now_playing`)
- 📅 Système de réservation avec :
  - Créneau fixe de 2h par film
  - Blocage des réservations qui se chevauchent
  - Possibilité d’annuler une réservation

---

## ⚙️ Technologies utilisées

- **NestJS** – Backend REST
- **Swagger** – Documentation interactive
- **TMDb API** – Source des films
- **JWT** – Authentification
- **In-memory storage** – Pas de base de données (dev uniquement)

---

## 📦 Installation

### Prérequis
- Node.js ≥ 18
- TMDb API key (https://www.themoviedb.org/settings/api)

### Étapes

```bash
# 1. Clone du projet
git clone https://github.com/Mxlaser/moviebooker.git

# 2. Installation des dépendances
cd moviebooker
npm install

# 3. Ajoutez un fichier `.env`
echo "JWT_SECRET=maclesecretejwt
TMDB_API_KEY=VOTRE_CLÉ
TMDB_BASE_URL=https://api.themoviedb.org/3" > .env

# 4. Lancer le serveur
npm run start:dev
```

---

## 📚 Documentation API

Swagger est disponible à l'adresse :

👉 **http://localhost:3000/api**

Utilisez le bouton "Authorize" pour tester les routes protégées (`/reservations`, `/auth/me`, etc.)

---

## 🔑 Endpoints principaux

### 🧑‍💼 Authentification

- `POST /auth/register` → inscription
- `POST /auth/login` → retourne un token JWT
- `GET /auth/me` → infos utilisateur (token requis)

### 🎬 Films

- `GET /movies` → films en salle ou recherche
  - paramètres : `search`, `page`

### 🗓️ Réservations (JWT requis)

- `POST /reservations` → créer une réservation
- `GET /reservations` → liste personnelle
- `DELETE /reservations/:id` → annuler une réservation

---

## 🛠️ Exemple de .env

```env
JWT_SECRET=maclesecretejwt
TMDB_API_KEY=votre_cle_tmdb
TMDB_BASE_URL=https://api.themoviedb.org/3
```
