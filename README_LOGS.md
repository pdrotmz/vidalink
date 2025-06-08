# Visualização de Logs com Grafana, Loki e Promtail

## Passos para visualizar os logs do backend no Grafana

1. **Suba o backend Java normalmente**

   - Exemplo:
     ```
     mvn spring-boot:run
     ```
   - Ou rode o comando equivalente para iniciar sua aplicação Java.

2. **Suba a stack de logs (Loki, Promtail e Grafana)**

   - No terminal, na raiz do projeto, execute:
     ```
     docker-compose -f docker-compose.logs.yml up -d
     ```

3. **Faça uma requisição para a API**

   - Exemplos de endpoints disponíveis:
     - `POST http://localhost:8080/api/auth/register`
     - `POST http://localhost:8080/api/auth/login`
     - `GET  http://localhost:8080/api/auth/me`
   - Use ferramentas como Postman, Insomnia, curl ou o próprio frontend.

4. **Acesse o Grafana**

   - Abra o navegador e vá para: [http://localhost:3000](http://localhost:3000)
   - Usuário: `admin`
   - Senha: `admin`

5. **Visualize os logs**
   - No menu lateral, clique em **Explore**.
   - Selecione a fonte de dados **Loki**.
   - No campo de busca, digite:
     ```
     {job="varlogs"}
     ```
   - Clique em **Run query**.
   - Os logs das requisições feitas para a API aparecerão na tela.

---

## Observações

- Os logs são gravados no arquivo `logs/app.log` na raiz do projeto.
- O Promtail coleta automaticamente todos os arquivos `.log` dentro da pasta `logs`.
- Se não aparecerem logs, verifique se a aplicação Java está rodando e se a pasta `logs` existe.

---

## Dúvidas?

Em caso de dúvidas, consulte a equipe de desenvolvimento ou verifique a configuração dos arquivos:

- `docker-compose.logs.yml`
- `promtail-config.yaml`
- `LoggingFilter.java`
