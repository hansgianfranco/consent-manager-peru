# Consent Manager Peru

![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.1.7-black?logo=next.js)
![Prisma](https://img.shields.io/badge/Prisma-7.5.0-blue?logo=prisma)
![Node.js](https://img.shields.io/badge/Node.js-20.19.37-green?logo=node.js)
![SQLite](https://img.shields.io/badge/SQLite-3-lightgrey?logo=sqlite)

Sistema ligero para gestionar el consentimiento de datos personales en sitios web, alineado con la normativa peruana (Ley 29733).

## 🚀 Descripción

Este proyecto permite a cualquier sitio web:

* Mostrar un banner de consentimiento de datos
* Registrar la aceptación o rechazo del usuario
* Mantener un historial auditable
* Gestionar los registros desde un panel administrativo

## ✨ Funcionalidades

* Banner de consentimiento (aceptar / rechazar)
* Registro de IP, user agent y fecha
* Panel admin con listado de consentimientos
* Integración sencilla en cualquier web

## 🛠️ Tecnologías

* [Next.js](https://nextjs.org/)
* [Prisma ORM](https://www.prisma.io/)
* Base de datos SQLite
* API Routes (Next.js)

## 📦 Instalación

```bash
git clone https://github.com/hansgianfranco/consent-manager-pe.git
cd consent-manager-pe
npm install
npm run dev
```

## ⚙️ Uso

1. Ejecutar el proyecto (npm run dev)
2. Integrar el componente de consentimiento en tu web
3. Revisar los registros en el panel admin (/admin/consents)

## 📂 Estructura del proyecto


    .
    ├── app
    │   ├── api/
    │   │   ├── consents  # API pública para registrar consentimientos
    │   │   └── admin/consents  # API protegida para listar consentimientos
    │   └── admin/
    │       └──Page.tsx      # Panel administrativo
    ├── components/
    │   └── ConsentForm.tsx    # Componente para mostrar banner de consentimiento
    └── prisma/
        └── schema.prisma      # Modelo de datos

## 👨‍💻 Autor

Franco Caballero
