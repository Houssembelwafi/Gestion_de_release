import { Projet } from "./Projet";
export class Environnement {
  id?: number;
  environnement?: string;
  os?: string;
  protocole?: string;
  cpu?: number;
  disque?: number;
  memoire?: number;
  projet?: Projet;
}
