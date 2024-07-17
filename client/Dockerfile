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

# Copiar la configuración de Nginx con soporte SSL
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los certificados SSL de Let's Encrypt
COPY /etc/letsencrypt/live/memoriaoral.com/fullchain.pem /etc/nginx/ssl/fullchain.pem
COPY /etc/letsencrypt/live/memoriaoral.com/privkey.pem /etc/nginx/ssl/privkey.pem

# Configurar Nginx para usar SSL
RUN sed -i '/listen 80;/a \    listen 443 ssl;\n    ssl_certificate /etc/nginx/ssl/fullchain.pem;\n    ssl_certificate_key /etc/nginx/ssl/privkey.pem;' /etc/nginx/conf.d/default.conf

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]