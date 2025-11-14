# Usar Node 22 (coincide con tu entorno)
FROM node:22

# Directorio de trabajo
WORKDIR /app

# Copiar solo archivos de dependencias primero (cache inteligente)
COPY package*.json ./

# Instalar dependencias en modo de producción si aplica
RUN npm install --production

# Copiar el resto del backend
COPY . .

# Exponer puerto del backend
EXPOSE 3000

# Iniciar servidor
CMD ["node", "app.js"]
