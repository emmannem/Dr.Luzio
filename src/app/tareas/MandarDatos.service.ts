import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MandarService {
  Nivel_IMC: string = 'Normal';
  Nivel_Estres: string = 'Bajo';

  setIMC(valor: any) {
    this.Nivel_IMC = valor;
    console.log(valor);
  }

  setEstres(valor: any) {
    this.Nivel_Estres = valor;
  }

  getIMC() {
    return this.Nivel_IMC;
  }

  getEstres() {
    return this.Nivel_Estres;
  }
}
