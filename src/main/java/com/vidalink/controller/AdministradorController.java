package com.vidalink.controllers;

import com.vidalink.models.Administrador;
import com.vidalink.services.AdministradorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin")
public class AdministradorController {

    @Autowired
    private AdministradorService service;

    @PostMapping("/create")
    public ResponseEntity<Administrador> createAdmin(@RequestBody Administrador admin) {
        Administrador newAdmin = service.registerAdmin(admin);
        return ResponseEntity.status(HttpStatus.CREATED).body(newAdmin);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Administrador>> findAll() {
        List<Administrador> admins = service.findAllAdmins();
        return ResponseEntity.status(HttpStatus.OK).body(admins);
    }

    @GetMapping("search-by/id/{id}")
    public ResponseEntity<Administrador> findAdminById(@PathVariable String id) {
        Optional<Administrador> adminId = service.findAdminById(id);
        return adminId.map(
                ResponseEntity::ok)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Admin not found!"));
    }

    @PutMapping("update-by/id/{id}")
    public ResponseEntity<Administrador> updateAdminById(@RequestBody Administrador admin, @PathVariable String id) {
        Administrador updatedAdmin = service.updateAdminById(admin, id);
        return ResponseEntity.status(HttpStatus.OK).body(updatedAdmin);
    }

    @DeleteMapping("delete-by/id/{id}")
    public ResponseEntity<Void> deleteAdminById(@PathVariable String id) {
        service.deleteAdminById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}