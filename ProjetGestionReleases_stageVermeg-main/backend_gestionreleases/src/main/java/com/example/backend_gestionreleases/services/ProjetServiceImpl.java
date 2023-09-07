package com.example.backend_gestionreleases.services;
import com.example.backend_gestionreleases.entities.Projet;
import com.example.backend_gestionreleases.repositories.ProjetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class ProjetServiceImpl implements  IProjetServiceImpl {
    @Autowired
    ProjetRepository projetRepository;
    @Override
    public Projet saveProjet(Projet projet) {
        return projetRepository.save(projet);
    }
}
