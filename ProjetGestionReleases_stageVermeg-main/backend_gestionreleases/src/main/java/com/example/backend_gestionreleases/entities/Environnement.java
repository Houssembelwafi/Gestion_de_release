package com.example.backend_gestionreleases.entities;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import javax.persistence.*;
import java.io.Serializable;
@Data
@Entity
public class Environnement implements Serializable {
    @javax.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String environnement;
    @Enumerated(EnumType.STRING)
    private OS os;
    @Enumerated(EnumType.STRING)
    private Protocole protocole;
    private int cpu;
    private int disque;
    private int memoire;
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "projet_id")
    private Projet projet;
}