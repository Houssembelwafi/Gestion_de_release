package com.example.backend_gestionreleases.entities;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
@Data
@Entity
public class Projet implements Serializable {
    @javax.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nomProjet;
    private String numeroVersionProjet;
    /*@Enumerated(EnumType.STRING)
    private JavaVersion versionJava;*/
    private String versionJava;
   /* @Enumerated(EnumType.STRING)
    private AngularVersion versionAngular;*/
   private String versionAngular;
    @Enumerated(EnumType.STRING)
    private ServeurWeb serveurWeb;
    @Enumerated(EnumType.STRING)
    private BaseDonnees baseDeDonnees;
    @JsonIgnore
    @OneToMany(mappedBy = "projet", cascade = CascadeType.ALL)
    private List<Environnement> environnements;
}