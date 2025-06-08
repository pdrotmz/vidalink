// ...código existente...
import java.io.FileWriter;
import java.io.PrintWriter;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
// ...código existente...

@Component
public class LoggingFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {
        String url = request.getRequestURL().toString();
        String query = request.getQueryString();

        // Formatar data/hora
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

        // Caminho do arquivo de log (ajuste se necessário)
        String logFilePath = "logs/app.log";

        try (PrintWriter logWriter = new PrintWriter(new FileWriter(logFilePath, true))) {
            logWriter.println("[" + timestamp + "] INFO: Request: " + url + (query != null ? "?" + query : ""));
            Enumeration<String> headerNames = request.getHeaderNames();
            while (headerNames.hasMoreElements()) {
                String name = headerNames.nextElement();
                String value = request.getHeader(name);
                logWriter.println("[" + timestamp + "] INFO: Header: " + name + " = " + value);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        filterChain.doFilter(request, response);
    }
}