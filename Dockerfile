# 1. Elige una imagen base de Node.js
# Usar 'alpine' la hace más ligera. 'lts' se refiere a "Long Term Support".
FROM node:18-alpine

# 2. Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# 3. Copia los archivos de definición de dependencias
# Esto aprovecha la caché de Docker. Si package.json no cambia, no reinstala.
COPY package.json package-lock.json* ./

# 4. Instala las dependencias del proyecto
# Usamos 'ci' para "continuous integration", es más rápido y seguro para servidores
RUN npm ci

# 5. Copia el resto del código de tu aplicación al contenedor
COPY . .

# 6. Expone el puerto que tu app usa (según tu .env y server.js)
EXPOSE 3001

# 7. El comando para iniciar tu aplicación
CMD [ "node", "server.js" ]