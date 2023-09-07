package com.example.backend_gestionreleases.controllers;
import com.example.backend_gestionreleases.entities.Environnement;
import com.example.backend_gestionreleases.repositories.EnvironnementRepository;
import com.example.backend_gestionreleases.services.IEnvironnementServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.POST})
@RequestMapping("/environnements")
public class EnvironnementController {
    @Autowired
    IEnvironnementServiceImpl iEnvironnementService;
    @Autowired
    EnvironnementRepository environnementRepository;

    @GetMapping("/byprojet/{projetId}")
    public List<Environnement> getEnvironnementsByProjet(@PathVariable Long projetId) {
        return environnementRepository.findByProjetId(projetId);
    }
}
