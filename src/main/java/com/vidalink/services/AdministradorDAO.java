package com.vidalink.services;

import com.vidalink.models.Administrador;
import com.vidalink.repository.AdministradorRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdministradorService {

    @Autowired
    private AdministradorRepository repository;

    public Administrador registerAdmin(Administrador admin) {
        return repository.save(admin);
    }

    public List<Administrador>findAllAdmins() {
        return repository.findAll();
    }

    public Optional<Administrador> findAdminById(String id) {
        if(repository.findById(id).isEmpty()) {
            throw new EntityNotFoundException("Admin não encontrado!");
        }
        return repository.findById(id);
    }

    public Administrador updateAdminById(Administrador admin, String id) {
        return repository.findById(id).map(existingAdmin -> {
            existingAdmin.setNome(admin.getNome());
            existingAdmin.setEmail(admin.getEmail());

            Administrador newAdmin = repository.save(existingAdmin);
            return existingAdmin;
        }).orElseThrow(() -> new RuntimeException("Erro ao atualizar suas infos!"));
    }

    public void deleteAdminById(String id) {
        repository.deleteById(id);
    }
}