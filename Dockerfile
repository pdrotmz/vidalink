# --- ETAPA 1: BUILD DO FRONT-END (REACT/VITE) ---
FROM node:20-alpine AS frontend-builder

# O WORKDIR para o front-end será a pasta onde os arquivos do front-end estão
# De acordo com sua estrutura, o frontend está em 'src/main/frontend'
WORKDIR /app/src/main/frontend

# Copia package.json e package-lock.json (ou yarn.lock) para cache de dependências
# O caminho de origem é relativo ao contexto de build do Docker (raiz do seu projeto)
COPY src/main/frontend/package*.json ./

# Instala as dependências do front-end (AGORA INCLUINDO AS DEV DEPENDENCIES NECESSÁRIAS PARA O BUILD)
RUN npm install

# Copia o restante do código-source do front-end
# O caminho de origem é relativo ao contexto de build do Docker
COPY src/main/frontend/ .

# Compila o front-end (gera a pasta 'dist' dentro de /app/src/main/frontend)
RUN npm run build

# --- ETAPA 2: BUILD DO BACK-END (SPRING BOOT) E INTEGRAÇÃO DO FRONT-END ---
FROM eclipse-temurin:21-jdk AS backend-builder

# O WORKDIR para o back-end será a raiz do seu projeto dentro do container (/app)
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

# Copia os arquivos de build do front-end para o diretório de recursos estáticos do Spring Boot
# A pasta `dist` foi gerada na etapa `frontend-builder` em /app/src/main/frontend/dist
# Ela será copiada para `src/main/resources/static` na etapa atual (/app/src/main/resources/static)
COPY --from=frontend-builder /app/src/main/frontend/dist src/main/resources/static

# Compila o projeto Spring Boot (agora com o front-end empacotado)
# O WORKDIR é /app, então o mvnw será encontrado aqui
RUN ./mvnw clean package -DskipTests

# --- ETAPA 3: IMAGEM FINAL DE PRODUÇÃO (LEVE) ---
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Copia o JAR da etapa de build do back-end
# O JAR estará em /app/target/ na etapa backend-builder
COPY --from=backend-builder /app/target/*.jar app.jar

# Copia o .env para a imagem final (se usado pelo Spring Boot em runtime)
COPY --from=backend-builder /app/.env .env

# Cria o diretório de logs (caso não seja mapeado pelo volume)
RUN mkdir -p /app/logs && chmod -R 777 /app/logs

# Exposição da porta (Render lida com isso, mas é uma boa prática documentar)
EXPOSE 8080

# Comando para rodar a aplicação
CMD ["java", "-jar", "app.jar"]