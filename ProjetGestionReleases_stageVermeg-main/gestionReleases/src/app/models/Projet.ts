import { Environnement } from "./Environnement";
export class Projet {
  id?: number;
  nomProjet?: string;
  numeroVersionProjet?: string;
  versionJava?: string;
  versionAngular?: string;
  serveurWeb?: string;
  baseDeDonnees?: string;
  environnements?: Environnement[];
}
