# Kasa 🏠

Application web de consultation de biens immobiliers, permettant de parcourir différentes propriétés et de les ajouter en favoris après connexion.

---

## Pré-requis

Avant de commencer, assure-toi d'avoir installé sur ta machine :

- [Node.js](https://nodejs.org/) **version 20 ou supérieure**
- [npm](https://www.npmjs.com/) (inclus avec Node.js)

Pour vérifier ta version de Node.js :

```bash
node -v
```

---

## Installation

1. **Clone le dépôt**

```bash
git clone https://github.com/MatLecDev/Kasa.git
cd kasa
```

2. **Installe les dépendances du frontend**

```bash
cd frontend
npm install
```

3. **Installe les dépendances du backend**

```bash
cd ../backend
npm install
```

> 📦 La base de données SQLite est déjà incluse dans le projet, aucune configuration supplémentaire n'est nécessaire.

---

## Lancement du projet

Le projet se compose de deux parties distinctes à lancer séparément : le **backend** (API) et le **frontend** (interface).

### Lancer le backend

```bash
cd backend
npm start
```

L'API sera disponible par défaut sur : `http://localhost:3000`

### Lancer le frontend

Dans un nouveau terminal :

```bash
cd frontend
npm run dev
```

L'application sera disponible sur : `http://localhost:3001`

### Compte admin

Le compte admin par défaut est le suivant : 
- email : admin@example.com
- password : Secret123

---

## Description du projet

**Kasa** est une application web de consultation de biens immobiliers développée dans le cadre d'une formation.

### Fonctionnalités

- 🔍 **Parcourir les propriétés** : consultation d'une liste de biens immobiliers avec leurs détails (photos, description, localisation, etc.)
- 🔐 **Authentification** : création de compte et connexion utilisateur
- ❤️ **Système de favoris** : ajout et suppression de propriétés en favoris, accessible après connexion
- 🏠 **Ajout de propriété** : ajout de nouvelle propriété en base de données

### Stack technique

| Couche | Technologie |
|---|---|
| Frontend | React + Next.js |
| Backend | Node.js + Express |
| Base de données | SQLite |
| Gestionnaire de paquets | npm |

### Structure du projet

```
kasa/
├── frontend/   # Application Next.js / React
└── backend/    # API REST Node.js / Express
```
