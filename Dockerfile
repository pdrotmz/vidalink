# Etapa 1: Build da aplicação
FROM eclipse-temurin:21-jdk AS builder

WORKDIR /app

# Copia o .env para a etapa de build
COPY .env .env

# Copia arquivos essenciais para cache do Maven
COPY pom.xml mvnw ./
COPY .mvn/ .mvn/

# Dá permissão ao Maven Wrapper
RUN chmod +x mvnw

# Baixa dependências antes de copiar o código-fonte
RUN ./mvnw dependency:go-offline

# Copia o código-fonte
COPY src/ src/

# Compila o projeto
RUN ./mvnw clean package -DskipTests

# Etapa 2: Runtime (Imagem final leve)
FROM eclipse-temurin:21-jdk

WORKDIR /app

# Copia o JAR da etapa de build
COPY --from=builder /app/target/*.jar app.jar

# Copia o .env para a imagem final
COPY --from=builder /app/.env .env

# Cria o diretório de logs (caso não seja mapeado pelo volume)
RUN mkdir -p /app/logs && chmod -R 777 /app/logs

# Exposição da porta
EXPOSE 8080

# Comando para rodar a aplicação
CMD ["java", "-jar", "app.jar"]
