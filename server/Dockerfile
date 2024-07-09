# Usa una imagen base de OpenJDK para ejecutar la aplicación
FROM openjdk:17-jdk-slim

# Establece el directorio de trabajo
WORKDIR /app

# Copia el Maven Wrapper y el código fuente al contenedor
COPY .mvn/ .mvn
COPY mvnw .
COPY pom.xml .

# Instala Maven para construir el proyecto
RUN ./mvnw dependency:resolve

# Copia el resto de los archivos de código fuente
COPY src/ src/

# Expone el puerto en el que la aplicación estará escuchando
EXPOSE 8080

# Comando para ejecutar la aplicación Spring Boot
CMD ["./mvnw", "spring-boot:run"]

