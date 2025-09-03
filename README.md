# Hazard Reporter

A full-stack hazard reporting web application built with **Django REST Framework (DRF)**, **React**, and **AWS**.  
The app allows users to submit, track, and view hazard reports through a modern web interface backed by a scalable cloud deployment.

✅ Working health check: `/api/health/` → `{ "ok": true }`  
🌍 Live domain: [https://hazardpatrol.com](https://hazardpatrol.com)

---

## 🚀 Features

- Submit hazard reports with descriptions and categories.
- View a list of submitted hazard reports in real time.
- Health check endpoint to verify API status.
- React frontend with DRF backend.
- Deployment via AWS EC2, S3, CloudFront, and Namecheap domain.
- Secure file and media storage in AWS S3.

---

## 🛠️ Tech Stack

- **Frontend**: React, Vite, TailwindCSS
- **Backend**: Django REST Framework
- **Database**: SQLite (local) → AWS RDS (production)
- **Deployment**: AWS EC2, Gunicorn, Nginx
- **Storage**: AWS S3
- **Other Tools**: GitHub Actions (CI/CD), Docker (optional)

---

## 📂 Project Structure

hazard-reporter/
├── backend/ # Django REST Framework API
│ ├── hazard_reporter/ # Core settings, URLs, WSGI/ASGI
│ └── reports/ # Hazard reports app
├── frontend/ # React frontend
│ ├── src/ # Components and pages
│ └── public/ # Static assets
└── .gitignore

🌍 Deployment Notes

Hosted on AWS EC2 with Nginx + Gunicorn.

HTTPS enabled via AWS Certificate Manager.

Static & media served via AWS S3 + CloudFront CDN.

Domain managed via Namecheap.

📜 License

This project is licensed under the MIT License — see the LICENSE file for details.

👤 Author

Schemore Lampart
