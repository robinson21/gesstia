# GeSSTia - Gestión Integral SST Chile

Sistema de gestión de Seguridad y Salud en el Trabajo conforme a normativa chilena vigente (DS 44, DS 594, Ley 16.744).

## Stack Tecnológico

- HTML5 + CSS3 + Vanilla JS (PWA)
- Firebase (Firestore, Auth, Storage, Hosting)
- GitHub Actions (CI/CD)

## Características Principales

- ✅ Multi-tenant con aislamiento de datos
- ✅ Registro de trabajadores con IRL por cargo
- ✅ Matriz IPER general y por trabajador
- ✅ Capacitaciones con aula virtual
- ✅ Firma digital
- ✅ Trazabilidad completa

## Instrucciones de Instalación

### 1. Crear Proyecto en Firebase

1. Ir a [Firebase Console](https://console.firebase.google.com/)
2. Crear nuevo proyecto: `gesstia-demo`
3. Habilitar **Firestore Database**, **Authentication**, **Storage**, **Hosting**
4. Ir a **Project Settings** → **General** → **Your Apps** → **Web App**
5. Copiar los valores de `apiKey`, `authDomain`, etc.

### 2. Configurar Auth

En Authentication → **Sign-in method** → Habilitar:
- Email/Password
- Google (opcional)

### 3. Instalar Firebase CLI

```bash
npm install -g firebase-tools
firebase login
firebase init
```

Seleccionar: Firestore, Hosting, Storage

### 4. Configurar Credenciales

Reemplazar en `config.js`:

```javascript
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "gesstia-demo.firebaseapp.com",
    projectId: "gesstia-demo",
    storageBucket: "gesstia-demo.appspot.com",
    messagingSenderId: "...",
    appId: "..."
};
```

### 5. Deploy

```bash
firebase deploy
```

URL: `https://gesstia-demo.web.app`

## Datos de Prueba (Demo)

| Usuario | Email | Password | Rol |
|---------|-------|----------|-----|
| Admin | admin@losandes.cl | Demo1234! | Admin |
| Supervisor | supervisor@losandes.cl | Demo1234! | Supervisor |
| Colaborador | colaborador@losandes.cl | Demo1234! | Colaborador |

## Cumplimiento Normativo

- **DS 44/2024**: Gestión Preventiva de Riesgos Laborales
- **DS 594/1999**: Ordenanza General de Higiene y Seguridad (modificado)
- **Ley 16.744**: Accidentes del Trabajo y Enfermedades Profesionales
- **Ley 20.940**: Ley de Subcontratación
