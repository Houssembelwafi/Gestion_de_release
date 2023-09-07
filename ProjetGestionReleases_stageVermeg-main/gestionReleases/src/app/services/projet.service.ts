import { Injectable } from '@angular/core';
import { Observable, throwError, of, ObservableInput } from 'rxjs';
import { Projet } from '../models/Projet';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Environnement } from '../models/Environnement';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  private baseUrl = 'http://localhost:8081'; // Remplacez par votre URL backend

  constructor(private http: HttpClient) {}

  getProjets(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/projets/allprojets`);
  }

  createProjetWithEnvironnements(projet: Projet, environnements: Environnement[]): Observable<Projet> {
    const projetEnvironnementsWrapper = {
      projet,
      environnements
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Projet>(`${this.baseUrl}/projets/addprojet`, projetEnvironnementsWrapper, httpOptions);
  }
  
  getEnvironnementsByProjet(projetId: number): Observable<Environnement[]> {
    return this.http.get<Environnement[]>(`${this.baseUrl}/environnements/byprojet/${projetId}`);
  }
  
  createProjects(projet: Projet,environnements:Environnement[]): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const projetEnvironnementsWrapper = {
      projet: projet,
      environnements: environnements
    };
  
    return this.http.post<string>(`${this.baseUrl}/projets/createprojects`, projetEnvironnementsWrapper, httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            console.error('A client-side error occurred:', error.error.message);
            return of('Une erreur côté client a eu lieu: ' + error.error.message);
          } else if (error.status === 200) {
            console.log('Request completed successfully:', error);
            return of('Projets créés avec succès !');
          } else {
            console.error(`Backend returned status code ${error.status}, body was:`, error.error);
            return of('Quelque chose s\'est mal passé lors de la tentative de création des projets.');
          }
        })
      );
  }
  
  
}
