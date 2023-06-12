import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  constructor(
    private http: HttpClient,) { }

  async registrarUsuario(usuario: object): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.http.post(`http://localhost:3000/usuarios`, usuario).subscribe(
        (response) => {
          console.log('Usuario registrado:', response);
          resolve(true); // Resuelve la promesa con éxito
        },
        (error) => {
          console.error('Error en el registro:', error);
          reject(false); // Rechaza la promesa con fallo
        }
      );
    });
  }
}
