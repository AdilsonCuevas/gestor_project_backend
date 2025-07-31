# 1. Imagen base recomendada para Node.js 20
FROM node:20-alpine

# 2. Establecer directorio de trabajo
WORKDIR /app

# 3. Clonar el repositorio desde GitHub (rama master)
RUN apk add --no-cache git && \
    git clone -b master https://github.com/AdilsonCuevas/gestor_project_backend.git . && \
    rm -rf .git

# 4. Instalar dependencias
RUN npm install

# 5. Compilar el proyecto NestJS
RUN npm run build

# 6. Exponer el puerto (por defecto NestJS usa 3000)
EXPOSE 4000

# 7. Comando para iniciar la app en producción
CMD ["npm", "run", "start:prod"]