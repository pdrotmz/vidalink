package com.vidalink.services;

import com.vidalink.models.Usuario;
import com.vidalink.repository.UsuarioRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository repository;

    public Usuario registerUsuario(Usuario usuario) {
        return repository.save(usuario);
    }

    public List<Usuario> findAllUsers() {
        return repository.findAll();
    }

    public Optional<Usuario> findUsuarioById(String id) {
        if(repository.findById(id).isEmpty()) {
            throw new EntityNotFoundException("Usuário não encontrado!");
        }
        return repository.findById(id);
    }

    public Usuario updateUsuarioById(Usuario usuario, String id) {
        return repository.findById(id).map(existingUsuario -> {
            existingUsuario.setNome(usuario.getNome());
            existingUsuario.setEmail(usuario.getEmail());
            existingUsuario.setTipoSanguineo(usuario.getTipoSanguineo());
            existingUsuario.setFoto(usuario.getFoto());

            Usuario newUsuario = repository.save(existingUsuario);
            return existingUsuario;
        }).orElseThrow(() -> new RuntimeException("Erro ao atualizar!"));
    }

    public void deleteUsuarioById(String id) {
        repository.deleteById(id);
    }
}
