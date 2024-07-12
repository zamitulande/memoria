aplicativo Memoria Oral, para la recuperacion del patrimonio inmaterial del departamento del cauca.

java - Spring boot
javascript - React

aplicacion dockerizada docker compose, con entorno de desarrollo y produccion.

para levantar proyecto tener intalado docker y docker compose en tu equipo.

correr los siguientes comando para levantar proyecto.

(para entorno desarrollo)
ENV_FILE=./server/.env.dev docker-compose --profile dev up -d --build 

(para entorno de produccion)
ENV_FILE=./server/.env.prod docker-compose up -d --build 