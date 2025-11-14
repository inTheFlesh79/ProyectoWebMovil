# 📝 Proyecto Full Stack: Ionic + Node.js/Express

Este proyecto incluye un **frontend en Ionic** y un **backend en Node.js con Express**. Ambos se comunican vía API REST.

---

## 📦 Requisitos previos

Tener instalados:
- [Node.js](https://nodejs.org/) (v14 o superior)
- [Ionic CLI](https://ionicframework.com/docs/cli) (v7+):  
```bash
  /ProyectoWebMovil  # Ionic Angular
│
├── backend/         # Node.js + Express
│   ├── app.js
    ├── controllers
    ├── models
    ├── routes
    ├── middleware
    ├── config
│   └── package.json
│
└── frontend/        # Ionic Angular
    ├── src/
    └── package.json
```
## 🚀 Instrucciones para correr el proyecto
### ▶️ 1. Iniciar el Backend (Node.js + Express + Supabase)
  ```bash
cd backend
npm install express pg cors dotenv jsonwebtoken bcrypt express-validator axios
node app.js
```
Esto levanta el servidor en http://localhost:3000.
Es importante tener el archivo ".env"

# ▶️ 2. Iniciar el Frontend (Ionic)
```bash
cd frontend
npm install
ionic serve
```
# 🔗 Comunicación entre frontend y backend
  - El frontend hace peticiones HTTP a la API REST del backend.

  - Ejemplo de uso:

      - POST http://localhost:3000/api/auth/register → retorna JWT (requiere body)
      - GET http://localhost:3000/api/auth/me → retorna perfil del usuario (requiere header Autorization + JWT token)

**Asegurarse que CORS esté habilitado**  en el backend para permitir llamadas desde Ionic:
```bash
const cors = require('cors');
app.use(cors());
```

# 🔐 Autenticación

  - El backend genera un token JWT al registrarse o iniciar sesión.

  - El frontend grada el token y lo envía en las peticiones que son protegidas.
    
  - El middleware en el servidor verifica el token y permite acceder a rutas protegidas.

```ts 
Authorization: Bearer <token>
```
# ✅ Funcionalidades implementadas

1. Registro de usuarios con JWT
2. Inicio de sesión de usuarios con JWT
3. Validación y protección de rutas con JWT
4. Páginas de profesor, usuario e instituciones educativas
5. Crear comentarios, publicaciones, calificaciones
6. Dar like/dislike a comentarios, publicaciones, calificaciones
7. Interacción entre frontend y backend mediante API REST