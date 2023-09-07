package com.example.backend_gestionreleases.repositories;

import com.example.backend_gestionreleases.entities.Projet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjetRepository extends JpaRepository<Projet,Long> {
}
