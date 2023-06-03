import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  private apiUrl = 'http://192.168.137.1:3000'; // Reemplaza con la URL de tu API de registro

  constructor(private http: HttpClient) {}

  registrarUsuario(usuario: any): Observable<any> {
    console.log(usuario);
    return this.http.post<any>(`${this.apiUrl}/usuarios`, usuario);
  }
}
