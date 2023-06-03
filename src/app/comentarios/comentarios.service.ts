import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ComentarioService {
  private apiUrl = 'https://api.comentarios.com'; // Reemplaza con la URL correcta de tu API

  constructor(private http: HttpClient) {}

  obtenerComentarios(correoUsuario: string) {
    const url = `${this.apiUrl}/comentarios?correoUsuario=${correoUsuario}`;
    return this.http.get(url);
  }

  agregarComentario(comentario: any) {
    const url = `${this.apiUrl}/comentarios`;
    return this.http.post(url, comentario);
  }
}
