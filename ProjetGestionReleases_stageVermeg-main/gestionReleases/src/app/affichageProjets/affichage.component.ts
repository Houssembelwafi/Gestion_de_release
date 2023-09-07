import { Component, OnInit } from '@angular/core';
import { Projet } from '../models/Projet';
import { ProjetService } from '../services/projet.service';
import { Environnement } from '../models/Environnement';

@Component({
  selector: 'app-affichage',
  templateUrl: './affichage.component.html',
  styleUrls: ['./affichage.component.css']
})
export class AffichageComponent implements OnInit {
  projets: Projet[] = [];
  pageSize = 5;
  currentPage = 0;
  searchText: string = '';
  selectedProjetEnvironnements: Environnement[] = [];
  isModalVisible: boolean = false;
  selectedProjet: Projet | undefined; // Déclarez la propriété selectedProjet

  constructor(private projetService: ProjetService) {}

  ngOnInit(): void {
    this.loadProjets();
  }

  loadProjets() {
    this.projetService.getProjets().subscribe((data) => {
      this.projets = data;
    });
  }

  get pagedProjets(): Projet[] {
    const startIndex = this.currentPage * this.pageSize;
    return this.projets.slice(startIndex, startIndex + this.pageSize);
  }

  get pages() {
    return Array(Math.ceil(this.projets.length / this.pageSize)).fill(0).map((x, i) => i);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  isFirstPage(): boolean {
    return this.currentPage === 0;
  }

  isLastPage(): boolean {
    return this.currentPage === this.pages.length - 1;
  }

  showEnvironnementsModal(projet: Projet) {
    console.log('Button clicked for project:', projet);

    if (projet.id !== undefined) {
      this.projetService.getEnvironnementsByProjet(projet.id).subscribe((environnements) => {
        console.log('Environnements:', environnements);

        this.selectedProjet = projet; // Initialisez la propriété selectedProjet
        this.selectedProjetEnvironnements = environnements;
        this.isModalVisible = true;
      });
    }
  }

  closeEnvironnementsModal() {
    this.isModalVisible = false;
  }

  clearSearchText() {
    this.searchText = '';
  }

  get filteredProjets(): Projet[] {
    if (!this.searchText) {
      return this.pagedProjets;
    }
    return this.pagedProjets.filter(projet =>
      projet.nomProjet && projet.nomProjet.toLowerCase().includes(this.searchText.toLowerCase()) && projet.numeroVersionProjet && projet.numeroVersionProjet.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
