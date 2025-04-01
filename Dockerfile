# Etapa 1: Build da aplicação
FROM eclipse-temurin:21-jdk AS builder

WORKDIR /app

# Copia o .env para a etapa de build (não é essencial, mas pode ser útil)
COPY .env .env

# Copia apenas arquivos essenciais para o cache do Maven
COPY pom.xml mvnw ./
COPY .mvn/ .mvn/

# Dá permissão ao Maven Wrapper
RUN chmod +x mvnw

# Baixa as dependências antes de copiar o código-fonte
RUN ./mvnw dependency:go-offline

# Agora copia o código-fonte
COPY src/ src/

# Compila o projeto
RUN ./mvnw clean package -DskipTests

# Etapa 2: Runtime (Imagem final leve)
FROM eclipse-temurin:21-jdk

WORKDIR /app

# Copia o JAR compilado da etapa anterior
COPY --from=builder /app/target/*.jar app.jar

# Copia o .env para a imagem final (IMPORTANTE!)
COPY --from=builder /app/.env .env

# Exposição de portas
EXPOSE 8080

# Comando para rodar a aplicação
CMD ["java", "-jar", "app.jar"]
