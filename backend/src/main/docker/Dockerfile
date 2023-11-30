FROM openjdk:17-oracle
WORKDIR /app
ARG JAR_FILE=quizzzz-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} application.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "application.jar"]
