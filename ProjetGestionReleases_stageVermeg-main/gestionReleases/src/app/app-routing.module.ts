import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AffichageComponent } from './affichageProjets/affichage.component';
import { AffichageEnvironnementsComponent } from './affichage-environnements/affichage-environnements.component';
import { FormulaireComponent } from './formulaire/formulaire.component';

const routes: Routes = [
  { path: '', redirectTo: '/formulaire', pathMatch: 'full' },
  { path: 'projets', component: AffichageComponent },
  { path: 'formulaire', component: FormulaireComponent } // Ajoutez une route pour le nouvel affichage des environnements
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
