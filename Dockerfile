# --- ETAPA ÚNICA: BUILD DO BACK-END (SPRING BOOT) E INCLUSÃO DO FRONT-END PRÉ-BUILDADO ---
FROM eclipse-temurin:21-jdk AS builder

# O WORKDIR será a raiz do seu projeto dentro do container (/app)
WORKDIR /app

# Copia o .env (se necessário para o build do Spring Boot ou runtime)
# O .env está na raiz do seu projeto
COPY .env .env

# Copia arquivos essenciais para cache do Maven (pom.xml, mvnw, .mvn/)
# Estes estão na raiz do seu projeto
COPY pom.xml mvnw ./
COPY .mvn/ .mvn/

# Dá permissão ao Maven Wrapper
RUN chmod +x mvnw

# Baixa dependências do Maven antes de copiar o código-fonte Java
# O WORKDIR é /app, então o mvnw será encontrado aqui
RUN ./mvnw dependency:go-offline

# Copia o código-fonte do back-end (java)
# O código-fonte Java está em src/main/java
COPY src/main/java/ src/main/java/

# Copia os recursos do back-end (application.properties, etc.)
# Os recursos estão em src/main/resources
COPY src/main/resources/ src/main/resources/

# COPIA OS ARQUIVOS DO FRONT-END JÁ PRÉ-BUILDADOS
# A pasta `static.dist` que já contém o build do front-end será copiada
# para o local que o Spring Boot espera para servir recursos estáticos: src/main/resources/static
COPY src/main/resources/static.dist/ src/main/resources/static/

# Compila o projeto Spring Boot (agora com o front-end empacotado)
# O WORKDIR é /app, então o mvnw será encontrado aqui
RUN ./mvnw clean package -DskipTests

# --- ETAPA 2: IMAGEM FINAL DE PRODUÇÃO (LEVE) ---
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Copia o JAR da etapa de build do back-end
# O JAR estará em /app/target/ na etapa builder
COPY --from=builder /app/target/*.jar app.jar

# Copia o .env para a imagem final (se usado pelo Spring Boot em runtime)
COPY --from=builder /app/.env .env

# Cria o diretório de logs (caso não seja mapeado pelo volume)
RUN mkdir -p /app/logs && chmod -R 777 /app/logs

# Exposição da porta (Render lida com isso, mas é uma boa prática documentar)
EXPOSE 8080

# Comando para rodar a aplicação
CMD ["java", "-jar", "app.jar"]