package com.example.backend_gestionreleases.repositories;

import com.example.backend_gestionreleases.entities.Environnement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EnvironnementRepository extends JpaRepository<Environnement,Long> {
    List<Environnement> findByProjetId(Long projetId);
}
