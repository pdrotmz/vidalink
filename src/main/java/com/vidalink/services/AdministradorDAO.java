package com.vidalink.DAO;

import com.vidalink.models.Administrador;

import java.util.ArrayList;
import java.util.List;

@service

public class AdministradorDAO {
    @Autowired
    private final UsuarioRepository repository;

    public List<Administrador> findAll(){
        return repository.findAll();
    }

    public findById(Integer id){
        return Optional<Administrador> repository.findById();
    }

    public Administrador insert(Administrador administrador){
        return repository.insert(administrador);
    }

    public void delete(Administrador administrador){
        if(!administrador.getAdministrador()){
            throw new RuntimeException('Usuário não existe');
        }

        repository.delete(administrador);
    }

    public void update(Administrador administrador){
        if(administrador.getAdministrador() == null){
            throw new RuntimeException('Usuário não existe');
        }

        repository.save(administrador);
    }


}