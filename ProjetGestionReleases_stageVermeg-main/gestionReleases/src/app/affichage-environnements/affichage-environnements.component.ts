import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Environnement } from '../models/Environnement';
import { Projet } from '../models/Projet';

@Component({
  selector: 'app-affichage-environnements',
  templateUrl: './affichage-environnements.component.html',
  styleUrls: ['./affichage-environnements.component.css']
})
export class AffichageEnvironnementsComponent {
  @Input() environnements: Environnement[] = [];
  @Input() selectedProjet: Projet | undefined;
  @Output() closeModalEvent = new EventEmitter();

  closeModal() {
    this.closeModalEvent.emit();
  }

  pageSizeEnvironnements = 5;
  currentPageEnvironnements = 0;

  get pagedEnvironnements(): Environnement[] {
    const startIndex = this.currentPageEnvironnements * this.pageSizeEnvironnements;
    return this.environnements.slice(startIndex, startIndex + this.pageSizeEnvironnements);
  }

  get pagesEnvironnements() {
    return Array(Math.ceil(this.environnements.length / this.pageSizeEnvironnements)).fill(0).map((x, i) => i);
  }

  onPageChangeEnvironnements(page: number) {
    this.currentPageEnvironnements = page;
  }
}
