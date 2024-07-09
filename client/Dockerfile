# Etapa de construcción
FROM node:16-alpine AS builder

WORKDIR /app

# Copiar archivos de configuración de npm
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar el código fuente y construir la aplicación
COPY . .

# Construir la aplicación con Vite
RUN npm run build

# Etapa de producción
FROM nginx:alpine

# Copiar los archivos construidos desde la etapa anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# Configurar Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]