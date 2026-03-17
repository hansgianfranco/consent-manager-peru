# Consent Manager Peru 🇵🇪

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

* Next.js
* Prisma ORM
* Base de datos SQLite
* API Routes

## 📦 Instalación

```bash
git clone https://github.com/hansgianfranco/consent-manager-peru
cd consent-manager-peru
npm install
```

### 🔧 Configuración de variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```bash
ADMIN_KEY=tu_clave_admin_segura
DATABASE_URL="file:./dev.db"
```

> `ADMIN_KEY` se usa para acceder al panel admin.
> `DATABASE_URL` apunta a tu base de datos SQLite local (Prisma).

### 🛠️ Inicializar Prisma

Genera el cliente de Prisma y aplica las migraciones:

```bash
npx prisma generate
npx prisma migrate dev
```

### 🚀 Ejecutar proyecto

```bash
npm run dev
```

## ⚙️ Uso

1. Ejecutar el proyecto con `npm run dev`.
2. Integrar el componente de consentimiento (`ConsentForm`) en tu web.
3. Revisar los registros en el panel admin: `http://localhost:3000/admin/consents`.

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

## 📄 Licencia

MIT

## 🔗 Repositorio

[[https://github.com/hansgianfranco/consent-manager-peru](https://github.com/hansgianfranco/consent-manager-peru)