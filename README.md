# Grokayou

## Analysé

- **Analytique produit avec [Umami](https://umami.is/)** (auto-hébergé) : suivi des pages vues et d'événements métier personnalisés (ajout au panier, passage au checkout, tentative de paiement, etc.) via `app/services/tracking.ts`.
- **Suivi d'erreurs avec [GlitchTip](https://glitchtip.com/)** (auto-hébergé, compatible SDK Sentry) : capture des erreurs client et serveur via `@sentry/nuxt`, avec un proxy d'ingestion côté serveur (`server/middleware/sentry-ingest-proxy.ts`).
- **Logger applicatif** (`app/services/logger.ts`) avec niveaux de log et contexte.
- **Bannière de consentement cookies** : la télémétrie respecte le choix de l'utilisateur.
- **Erreur volontaire** : le paiement échoue volontairement sur un produit précis, afin d'avoir un vrai flux d'erreurs à observer dans GlitchTip.

## Stack technique

| Brique | Rôle |
|---|---|
| Nuxt 4 (Vue 3, Pinia, Tailwind CSS) | Application e-commerce |
| Umami + PostgreSQL | Web analytics |
| GlitchTip + PostgreSQL + Valkey | Suivi d'erreurs (compatible Sentry) |
| nginx | Reverse proxy (routage par sous-domaine `*.localhost`) |
| Docker Compose | Orchestration de l'ensemble |

## Installation

### Prérequis

- [Docker](https://docs.docker.com/get-docker/) et Docker Compose

### 1. Cloner le projet

```bash
git clone https://github.com/tomdepussay/grokayou.git
cd grokayou
```

### 2. Configurer les variables d'environnement

```bash
cp .env.example .env
```

Le `.env.example` contient déjà des valeurs par défaut fonctionnelles pour le local. Il reste à compléter :

- **Les secrets et mots de passe** :
  ```bash
  GLITCHTIP_SECRET_KEY=      # openssl rand -hex 32
  UMAMI_APP_SECRET=          # openssl rand -hex 16
  GLITCHTIP_DB_PASSWORD=     # mot de passe libre
  UMAMI_DB_PASSWORD=         # mot de passe libre
  ```
- **Les valeurs marquées `[CHANGE_ME]`** : `NUXT_PUBLIC_SENTRY_DSN` et `NUXT_PUBLIC_UMAMI_WEBSITE_ID` sont générées par GlitchTip et Umami une fois la stack lancée — laisser `[CHANGE_ME]` pour l'instant, elles seront renseignées à l'étape 4.

### 3. Lancer la stack

```bash
docker compose up -d --build
```

Une fois les services démarrés, tout passe par nginx sur le port `3000` :

| Service | URL |
|---|---|
| Application | http://localhost:3000 |
| Umami | http://umami.localhost:3000 |
| GlitchTip | http://glitchtip.localhost:3000 |

> Les sous-domaines `*.localhost` sont résolus automatiquement par les navigateurs récents. Si ce n'est pas le cas, ajouter `127.0.0.1 umami.localhost glitchtip.localhost` dans `/etc/hosts`.

### 4. Configurer la télémétrie

**Umami** : se connecter sur http://umami.localhost:3000 (identifiants par défaut : `admin` / `umami`), créer un site web pour l'application, puis copier le **Website ID** dans `NUXT_PUBLIC_UMAMI_WEBSITE_ID` (à la place de `[CHANGE_ME]`).

**GlitchTip** : créer un compte sur http://glitchtip.localhost:3000, créer une organisation et un projet (plateforme *Vue/Nuxt*), puis copier le **DSN** du projet dans `NUXT_PUBLIC_SENTRY_DSN` (à la place de `[CHANGE_ME]`). Le détail est décrit dans le tuto ci-dessous.

Redémarrer ensuite l'application pour prendre en compte les nouvelles variables :

```bash
docker compose up -d app
```

### 5. Vérifier

- Naviguer sur http://localhost:3000 et ajouter des produits au panier : les pages vues et événements apparaissent dans Umami.
- Tenter un paiement sur le produit piégé `Chargeur Solaire SunPower 65W (Série Pilote)` : l'erreur remonte dans GlitchTip.

## Crédit 
- [Florent MENUS](https://github.com/FloMenus)
- [Tom DEPUSSAY](https://github.com/tomdepussay)
