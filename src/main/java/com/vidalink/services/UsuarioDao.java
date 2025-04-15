package com.vidalink.DAO;

import com.vidalink.models.Usuario;

import java.util.ArrayList;
import java.util.List;

@Service
public class UsuarioDAO {
    @Autowired
    private final UsuarioRepository repository;

    public List<Usuario> findAll(){
        return repository.findAll();//vai exibir uma lista com todos os usuario
 
    }

    public findById(Integer id){ //Integer = int sq com uns ngc massa a mais
        return Optional<Usuario> repository.findById();//procura especifico pelo id

    }

    public Usuario insert(Usuario usuario){
        return repository.insert(usuario);
    }

    public void delete(Usuario usuario){
        if(!usuario.getUsuario()){
            throw new RuntimeException('Usuário não existe');
        }

        repository.delete(usuario);
    }

    public void update(Usuario usuario){
        if(usuario.getId() == null){
            throw new RuntimeException('Usuário não existe');
        }

        repository.save(usuario);
    }
}