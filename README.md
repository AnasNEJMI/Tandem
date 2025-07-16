[![English](https://img.shields.io/badge/lang-en-blue.svg)](./README.md)
[![Français](https://img.shields.io/badge/lang-fr-blue.svg)](./README.fr.md)

# 📊 Tandem — Personal & Collaborative Expense Tracker

Tandem is an expense tracking app designed to help individuals and households **track spending, set savings goals, and gain insights into their finances — together or solo**.

---

## 🚀 Features

* ✅ **Step-by-Step Onboarding**: Guided setup to personalize your spenders, categories, and preferred places.
* 💸 **Expense Tracking**: Log and categorize expenses with ease.
* 📈 **Smart Stats & Insights**: Visual breakdowns of where your money goes.
* 🎯 **Goals Management**:

  * **Budget Goals**: Set spending limits per category, spender, or period.
  * **Project Savings**: Plan for future expenses with dynamic saving plans.
* 🔔 **Progress Reminders**: Stay on track with timely notifications.
* 🔐 **Secure & Private**: Your data stays yours — we prioritize privacy.
* 🌙 **Dark Mode**: Designed for night owls and aesthetes.

---

## 🛠️ Tech Stack

* **Backend:** Laravel (PHP)
* **Frontend:** Inertia.js + React + TailwindCSS - ReshartsJS
* **Database:** MySQL
* **Authentication:** Laravel Breeze

---

## 🧹 Setup & Installation

1. **Clone the repository**

```bash
git clone https://github.com/AnasNEJMI/Tandem.git
cd Tandem
```

2. **Setup backend**

```bash
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate
```

3. **Setup frontend**

```bash
npm install
npm run dev
```

4. **Run the app**

```bash
php artisan serve
```

5. **Access**

* Visit `http://localhost:8000` in your browser.

---

## 🚩 Roadmap

* [ ] Multi-user expense sharing
* [ ] Export reports to PDF/CSV
* [ ] Mobile app companion
* [ ] Language & theme support
* [ ] Additional tracking data
      
---

## 📄 License

This project is licensed under the MIT License.

---

## 📬 Contact

Built with ❤️ by [Anas NEJMI](https://anasnejmi.com)
