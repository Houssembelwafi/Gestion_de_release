import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,  } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormulaireComponent } from './formulaire/formulaire.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { AffichageComponent } from './affichageProjets/affichage.component';
import { AffichageEnvironnementsComponent } from './affichage-environnements/affichage-environnements.component';

@NgModule({
  declarations: [
    AppComponent,
    FormulaireComponent,
    NavbarComponent,
    AffichageComponent,
    AffichageEnvironnementsComponent
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    FormsModule,HttpClientModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
