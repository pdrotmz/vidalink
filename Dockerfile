# --- ETAPA 1: BUILD DO FRONT-END (REACT/VITE) ---
FROM node:20-alpine AS frontend-builder

WORKDIR /app/frontend

# Copia package.json e package-lock.json (ou yarn.lock) para cache de dependências
COPY frontend/package*.json ./

# Instala as dependências do front-end
RUN npm install --omit=dev

# Copia o restante do código-fonte do front-end
COPY frontend/ .

# Compila o front-end (gera a pasta 'dist')
RUN npm run build

# --- ETAPA 2: BUILD DO BACK-END (SPRING BOOT) E INTEGRAÇÃO DO FRONT-END ---
FROM eclipse-temurin:21-jdk AS backend-builder

WORKDIR /app

# Copia o .env (se necessário para o build do Spring Boot ou runtime)
# Geralmente o .env é para variáveis de ambiente do ambiente de execução,
# não para variáveis de build do Java em si.
COPY .env .env

# Copia arquivos essenciais para cache do Maven (pom.xml, mvnw, .mvn/)
# Certifique-se de que estes estão na raiz do seu contexto de build ou ajusta os caminhos
COPY backend/pom.xml backend/mvnw ./backend/
COPY backend/.mvn/ ./backend/.mvn/

# Dá permissão ao Maven Wrapper no diretório correto
RUN chmod +x backend/mvnw

# Baixa dependências do Maven antes de copiar o código-fonte Java
WORKDIR /app/backend
RUN ./mvnw dependency:go-offline

# Copia o código-fonte do back-end
COPY backend/src/ src/

# Copia os arquivos de build do front-end para o diretório de recursos estáticos do Spring Boot
# A pasta `dist` do frontend foi gerada na etapa `frontend-builder`
# Ela será copiada para `src/main/resources/static` no contexto de build do backend
# O caminho aqui é relativo ao WORKDIR atual (`/app/backend`)
COPY --from=frontend-builder /app/frontend/dist src/main/resources/static

# Compila o projeto Spring Boot (agora com o front-end empacotado)
RUN ./mvnw clean package -DskipTests

# --- ETAPA 3: IMAGEM FINAL DE PRODUÇÃO (LEVE) ---
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Copia o JAR da etapa de build do back-end
COPY --from=backend-builder /app/backend/target/*.jar app.jar

# Copia o .env para a imagem final (se usado pelo Spring Boot em runtime)
COPY --from=backend-builder /app/.env .env

# Cria o diretório de logs (caso não seja mapeado pelo volume)
RUN mkdir -p /app/logs && chmod -R 777 /app/logs

# Exposição da porta (Render lida com isso, mas é uma boa prática documentar)
EXPOSE 8080

# Comando para rodar a aplicação
CMD ["java", "-jar", "app.jar"]