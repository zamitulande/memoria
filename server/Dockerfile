#development
FROM maven:3.8.2-openjdk-17

WORKDIR /app
COPY . .
RUN mvn clean install

CMD mvn spring-boot:run

# production
# FROM maven:3.8.2-openjdk-17 AS build
# WORKDIR /app
# COPY . .
# RUN mvn clean install

# FROM openjdk:17-jdk-slim
# WORKDIR /app
# COPY --from=build /app/target/*.jar app.jar
# ENTRYPOINT ["java", "-jar", "app.jar"]