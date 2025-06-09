package com.vidalink.log;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Enumeration;

@Component
public class LoggingFilter extends OncePerRequestFilter {

    private static final String LOG_DIR = "logs";
    private static final String LOG_FILE = "app.log";
    private static final Path LOG_PATH = Paths.get(LOG_DIR, LOG_FILE);

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String url = request.getRequestURL().toString();
        String query = request.getQueryString();
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

        try {
            // Garante que o diretório existe
            Files.createDirectories(LOG_PATH.getParent());

            try (PrintWriter logWriter = new PrintWriter(Files.newBufferedWriter(LOG_PATH, java.nio.file.StandardOpenOption.CREATE, java.nio.file.StandardOpenOption.APPEND))) {
                logWriter.println("[" + timestamp + "] INFO: Request: " + url + (query != null ? "?" + query : ""));
                Enumeration<String> headerNames = request.getHeaderNames();
                while (headerNames.hasMoreElements()) {
                    String name = headerNames.nextElement();
                    String value = request.getHeader(name);
                    logWriter.println("[" + timestamp + "] INFO: Header: " + name + " = " + value);
                }
            }

        } catch (IOException e) {
            System.err.println("[" + timestamp + "] ERROR: Failed to write log to " + LOG_PATH);
            // Opcional: pode usar um logger real aqui, tipo SLF4J ou Logback
        }

        filterChain.doFilter(request, response);
    }
}
