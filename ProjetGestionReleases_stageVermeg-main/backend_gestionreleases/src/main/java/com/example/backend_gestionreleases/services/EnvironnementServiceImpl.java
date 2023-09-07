package com.example.backend_gestionreleases.services;
import com.example.backend_gestionreleases.entities.Environnement;
import com.example.backend_gestionreleases.repositories.EnvironnementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class EnvironnementServiceImpl implements IEnvironnementServiceImpl{
    @Autowired
    EnvironnementRepository environnementRepository;
@Override
    public Environnement saveEnvironnement(Environnement environnement) {
        return environnementRepository.save(environnement);
    }
}
