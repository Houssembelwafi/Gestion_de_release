package com.example.backend_gestionreleases.controllers;

import com.example.backend_gestionreleases.entities.Environnement;
import com.example.backend_gestionreleases.entities.Projet;
import com.example.backend_gestionreleases.entities.ProjetEnvironnementsWrapper;
import com.example.backend_gestionreleases.repositories.EnvironnementRepository;
import com.example.backend_gestionreleases.repositories.ProjetRepository;
import com.example.backend_gestionreleases.services.IEnvironnementServiceImpl;
import com.example.backend_gestionreleases.services.IProjetServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.POST})
@RequestMapping("/projets")
public class ProjetController {

    @Autowired
    IProjetServiceImpl iProjetService;
    @Autowired
    ProjetRepository projetRepository;
    @Autowired
    IEnvironnementServiceImpl iEnvironnementService;

    @PostMapping("/addprojet")
    public ResponseEntity<Projet> createProjetWithEnvironnements(@RequestBody ProjetEnvironnementsWrapper wrapper) {
        Projet projet = wrapper.getProjet();
        List<Environnement> environnements = wrapper.getEnvironnements();

        Projet savedProjet = iProjetService.saveProjet(projet);

        for (Environnement environnement : environnements) {
            environnement.setProjet(savedProjet);
            iEnvironnementService.saveEnvironnement(environnement);
        }

        return ResponseEntity.ok(savedProjet);
    }

    @GetMapping("/allprojets")
    public ResponseEntity<List<Projet>> getAllProjets() {
        List<Projet> projets = projetRepository.findAll();
        return new ResponseEntity<>(projets, HttpStatus.OK);
    }


    @PostMapping("/createprojects")
    public ResponseEntity<String> createProjects(@RequestBody ProjetEnvironnementsWrapper projetEnvironnementsWrapper) {
        try {
            Projet projet = projetEnvironnementsWrapper.getProjet();
            List<Environnement> environnements = projetEnvironnementsWrapper.getEnvironnements();

            // Récupérer les données du projet et des environnements
            String nomProjet = projet.getNomProjet();
            String versionAngular = projet.getVersionAngular().toString();
            String versionJava = projet.getVersionJava().toString();
            String serveurWeb = projet.getServeurWeb().toString();
            String baseDeDonnnees = projet.getBaseDeDonnees().toString();

            String systeme = ""; // Déclarez la variable en dehors de la boucle for

            for (Environnement env : environnements) {
                systeme = env.getOs().toString(); // Affectez la valeur dans la boucle
                // Traitez d'autres propriétés de l'environnement si nécessaire
            }

            String command = "cmd.exe /c F:\\git\\ProjetGestionReleases_stageVermeg\\backend_gestionreleases\\automatisation.sh " + nomProjet + " " + versionAngular + " " + versionJava + " " + serveurWeb + " " + baseDeDonnnees + " " + systeme;

            Process process = Runtime.getRuntime().exec(command);
            process.waitFor();

            // Traiter la sortie du script
            int exitValue = process.exitValue();
            if (exitValue == 0) {
                return ResponseEntity.ok("Projets créés avec succès !");
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur lors de la création des projets.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur lors de l'exécution du script.");
        }
    }

}