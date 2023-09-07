package com.example.backend_gestionreleases.entities;

import lombok.Data;

import javax.persistence.Entity;
import java.io.Serializable;
import java.util.List;

@Data

public class ProjetEnvironnementsWrapper implements Serializable {
    private Projet projet;
    private List<Environnement> environnements;
}
