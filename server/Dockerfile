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



# FROM maven:3.8.2-openjdk-17 AS build

# # Establece el directorio de trabajo en el contenedor
# WORKDIR /app

# # Copia el archivo POM y los archivos de código fuente al contenedor
# COPY pom.xml .
# COPY src ./src

# # Compila la aplicación
# RUN mvn clean package -DskipTests

# # Usa una imagen base de OpenJDK para ejecutar la aplicación
# FROM openjdk:17-jdk-slim

# # Establece el directorio de trabajo
# WORKDIR /app

# # Copia el archivo JAR desde la etapa de construcción
# COPY --from=build /app/target/server-0.0.1-SNAPSHOT.jar /app/server.jar

# # Expone el puerto en el que la aplicación estará escuchando
# EXPOSE 8080

# # Comando para ejecutar la aplicación Spring Boot
# ENTRYPOINT ["java", "-jar", "/app/server.jar"]