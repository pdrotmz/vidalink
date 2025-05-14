package com.vidalink.repository;

import com.vidalink.models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, String> {

} // conexão do DB <entidade que vai ser passada>