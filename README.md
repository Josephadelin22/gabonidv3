# Gabon ID (V3) - Le Terminal Numérique du Citoyen Gabonais

![Gabon ID Banner](public/og-image.png) <!-- Optionnel: lien vers une capture d'écran du projet -->

**Gabon ID** est une plateforme gouvernementale dématérialisée visant à offrir aux citoyens gabonais un accès sécurisé, rapide et centralisé à leurs services consulaires et identitaires. 

Ce projet a été conçu pour digitaliser la relation entre le citoyen, l'Ambassade et les différentes institutions de l'État (DGDI, ANBG, etc.).

---

## ⚖️ Protection Intellectuelle & Droits d'Auteur

> **AVERTISSEMENT LÉGAL**
> Ce système informatique, son architecture, son code source, ainsi que ses interfaces graphiques sont la propriété exclusive de **INOV E-TECH .L LTD** (dirigée par Joseph BOUSSAMBA QUENUM CTO of Inov e-tech .l ltd).
> 
> **Le projet a fait l'objet d'un dépôt de protection intellectuelle formel.** 
> Toute reproduction, distribution, copie partielle ou totale, ou utilisation non autorisée par écrit de la part d'INOV E-TECH .L LTD constitue une violation des droits d'auteur et s'expose à des poursuites judiciaires conformément aux lois internationales en vigueur sur la Propriété Intellectuelle.

---

## 🎯 Fonctionnalités Principales

### 1. Espace Citoyen (Dashboard)
- **Vérification d'Identité :** Lien avec la DGDI (GAB-2024-XXXXXX).
- **Check-in Semestriel :** Registre numérisé de présence et de confirmation de résidence pour la diaspora.
- **Coffre-fort Sécurisé :** Stockage des documents officiels (actes, certificats) avec certification numérique.
- **Urgence & Sécurité (Bouton SOS) :** Interface pour déclencher une alerte géolocalisée d'urgence envoyée directement à l'Ambassade.
- **Services Académiques :** Connexion directe avec les services de l'ANBG (Bourses et Stages).

### 2. L'Œil de l'Ambassade (Portail Administratif)
- **Tableau de Bord :** Statistiques en direct sur la diaspora (répartition géographique, validité des passeports).
- **Gestion des SOS :** Interface d'intervention rapide pour les urgences signalées par les citoyens (GPS, groupe sanguin, contact).
- **Validation des Documents :** Outil de certification numérique (génération de hash SHA-256) pour authentifier les documents légaux.
- **Recensement :** Validation des check-ins semestriels.

---

## 🛠 Architecture & Technologies

Le projet repose sur une architecture moderne de type **Serverless / BaaS (Backend as a Service)** :

- **Frontend :** 
  - [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
  - [TypeScript](https://www.typescriptlang.org/) (Typage fort)
  - [Tailwind CSS](https://tailwindcss.com/) (Stylisation et animations fluides)
  - Composants UI inspirés de `shadcn/ui` (Radix)
- **Backend & Base de Données :** 
  - [Supabase](https://supabase.com/) (PostgreSQL)
  - **Authentification :** Gestion des sessions via Supabase Auth (séparation Citoyens / Administration).
  - **RLS (Row Level Security) :** Sécurisation fine des données directement dans la base de données PostgreSQL.

---

## 🚀 Installation & Lancement en local

1. **Cloner le projet**
   ```bash
   git clone <url_du_depot>
   cd gabonidv3
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement**
   Créez un fichier `.env` à la racine du projet et ajoutez vos clés Supabase :
   ```env
   VITE_SUPABASE_URL=votre_url_supabase
   VITE_SUPABASE_ANON_KEY=votre_cle_anon_supabase
   ```

4. **Configurer la base de données (Supabase)**
   Exécutez le script SQL `supabase_setup.sql` situé à la racine du projet dans l'éditeur SQL de votre Dashboard Supabase pour créer les tables et les règles de sécurité.

5. **Démarrer l'application**
   ```bash
   npm run dev
   ```
   L'application sera accessible sur le port défini par Vite (ex: `http://localhost:8080`).

## 👨‍💻 Équipe & Crédits

* **Développeur Principal & Architecte :** BOUSSAMBA QUENUM Joseph Et LANDJI NDJOUBI WARREN TERRY
* **Société Propriétaire :** INOV E-TECH .L LTD
* **Site Web :** [https://inov-e-tech.com/](https://inov-e-tech.com/)
* **Année :** 2026

*Pour toute demande professionnelle ou technique, veuillez contacter INOV E-TECH .L LTD.*
inovetechl073@gmail.com
