# 🎬 MovieBooker - Backend

MovieBooker est une API NestJS permettant à des utilisateurs de :
- s’inscrire et se connecter via un système d’authentification JWT,
- rechercher des films via l’API TMDb,
- réserver des séances de cinéma avec vérification de conflit horaire.

---

## 📦 Fonctionnalités

### 🔐 Authentification (JWT)
- `POST /auth/register` – Inscription d’un nouvel utilisateur
- `POST /auth/login` – Connexion et récupération du token
- `GET /auth/me` – Récupération des infos du profil (protégé par JWT)

### 🎬 Films (via l'API TMDb)
- `GET /movies` – Liste paginée des films en salle (paramètres `page`, `search`)
> 🔒 Protégé par JWT

### 🎟 Réservations
- `POST /reservations` – Créer une réservation (2h minimum entre 2 films)
- `GET /reservations` – Récupérer les réservations de l’utilisateur
- `DELETE /reservations/:id` – Annuler une réservation
> 🔒 Toutes les routes de réservation sont protégées

---

## ⚙️ Technologies

- **NestJS** (framework principal)
- **JWT** (authentification)
- **Axios** (appel API TMDb)
- **Swagger** (documentation automatique)
- **ConfigModule** (gestion `.env`)

---

## 🚀 Installation

### 1. Cloner le projet

```bash
git clone https://github.com/Mxlaser/MovieBooker.git
cd MovieBooker/back