@Entity
@Table (name='tb_user')

@RequiredArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy=GenerationType.UUID)
    @Getters 
    @Setters
    private int id;

    @Getters 
    @Setters
    private String email;

    @Getters 
    @Setters
    private String senha;

    @Getters 
    @Setters
    private String nome;

    @Getters 
    @Setters
    private int pontos;

    @Getters 
    @Setters
    private int codigoDeRecomendacao;

    @Getters 
    @Setters
    private String tipoSanguineo;

    @Getters 
    @Setters
    private String foto;

    // Método para exibir informações do usuário
    public void exibirInformacoes() {
        System.out.println("Nome: " + nome);
        System.out.println("Email: " + email);
        System.out.println("Pontos: " + pontos);
        System.out.println("Código de Recomendação: " + codigoDeRecomendacao);
        System.out.println("Tipo Sanguíneo: " + tipoSanguineo);
        System.out.println("Foto: " + foto);
    }

    // Método main para testar a classe
    public static void main(String[] args) {
        Usuario usuario = new Usuario(
            "maria@email.com",
            "senha123",
            "Maria Silva",
            50,
            12345,
            "O+",
            "foto.jpg"
        );

        usuario.exibirInformacoes();
    }
}