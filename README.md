# Consent Manager Peru 🇵🇪

![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.1.7-black?logo=next.js)
![Prisma](https://img.shields.io/badge/Prisma-7.5.0-blue?logo=prisma)
![Node.js](https://img.shields.io/badge/Node.js-20.19.37-green?logo=node.js)
![SQLite](https://img.shields.io/badge/SQLite-3-lightgrey?logo=sqlite)

Aplicación web para gestionar y registrar los **consentimientos de usuarios** según la **Ley N° 29733 – Ley de Protección de Datos Personales (Perú)**.

Permite simular el registro de consentimientos en un entorno seguro, con funcionalidades de **administración, exportación y análisis de datos**.

## ✨ Funcionalidades

### Usuario
- Mostrar banner o modal de consentimiento según la Ley N° 29733.
- Doble check de aceptación para cumplir con la normativa.
- Persistencia del consentimiento mediante cookies.

### Administrador
- Dashboard con todos los consentimientos registrados.
- Tabla con ID, estado, IP, User Agent y fecha de registro.
- Filtro y visualización responsive.
- Estadísticas rápidas: total, aceptados y rechazados.

### Exportación
- Exportar **PDF** brandeado con tu app y copyright.
- Exportar **CSV** para análisis o integración con otras herramientas.

## 🛠️ Tecnologías
- **Next.js 13** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **jsPDF + jspdf-autotable** para exportación PDF
- **js-cookie** para manejo de consentimientos
- **API Routes** para gestión de consentimientos
- Opcional: **Prisma + SQLite/PostgreSQL** para almacenamiento real

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