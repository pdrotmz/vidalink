package com.vidalink.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name="tb_user")
@Data
public class Usuario {

    @Id
    @GeneratedValue(strategy= GenerationType.UUID)
    private String id;

    private String email;
    private String senha;
    private String nome;
    private int pontos;
    private int codigoDeRecomendacao;
    private String tipoSanguineo;
    private String foto;

}