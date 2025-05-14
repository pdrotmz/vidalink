package com.vidalink.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name="tb_admin")
@Data
public class Administrador {


    @Id
    @GeneratedValue(strategy= GenerationType.UUID)
    private String id;

    private String email;
    private String senha;
    private String nome;
}
