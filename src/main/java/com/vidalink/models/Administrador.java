@Entity
@Table (name='tb_admin')


@RequiredArgsConstructor
public class Administrador {


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

    // Método para exibir informações do usuário
    public void exibirInformacoes() {
        System.out.println("Nome: " + nome);
        System.out.println("Email: " + email);
    }

    // Método main para testar a classe
    public static void main(String[] args) {
        Administrador administrador = new Administrador(
            "maria@email.com",
            "senha123",
            "Maria Silva",
        );

        administrador.exibirInformacoes();
    }
}