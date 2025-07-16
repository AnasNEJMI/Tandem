[![English](https://img.shields.io/badge/lang-en-blue.svg)](./README.md)
[![Français](https://img.shields.io/badge/lang-fr-blue.svg)](./README.fr.md)

# 📊 Tandem — Suivi de Dépenses Personnel et Collaboratif

Tandem est une application de suivi des dépenses conçue pour aider les individus et les foyers à **suivre leurs dépenses, fixer des objectifs d'épargne et mieux comprendre leurs finances — seul ou à plusieurs**.

---

##  Fonctionnalités

* ✅ **Configuration Guidée** : personnalisez vos dépensiers, catégories et lieux préférés.
* ✅ **Suivi des Dépenses** : enregistrez et classez facilement vos dépenses.
* ✅ **Statistiques & Insights** : visualisez où va votre argent.
* ✅ **Gestion des Objectifs** : fixez des limites de dépenses par catégorie, dépensier ou période.

---

## Technologies Utilisées

* **Backend :** Laravel (PHP)
* **Frontend :** Inertia.js + React + TailwindCSS
* **Base de données :** MySQL
* **Authentification :** Laravel Breeze
* **Hébergement/Déploiement :** Environnement Dockerisé + Apache/Nginx

---

## Installation & Lancement

1. **Cloner le dépôt**

```bash
git clone https://github.com/AnasNEJMI/Tandem.git
cd Tandem
```

2. **Configurer le backend**

```bash
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate
```

3. **Configurer le frontend**

```bash
npm install
npm run dev
```

4. **Lancer l'application**

```bash
php artisan serve
```

5. **Accéder à l'application**

* Rendez-vous sur `http://localhost:8000` dans votre navigateur.

---

## Feuille de Route

* [ ] Partage des dépenses entre plusieurs utilisateurs
* [ ] Exportation des rapports en PDF/CSV
* [ ] Application mobile compagnon
* [ ] Internalisation et changement de thème

---

## 📄 Licence

Ce projet est sous licence MIT.

---

## 📬 Contact

Développé avec ❤️ par [Anas NEJMI](https://anasnejmi.com)
