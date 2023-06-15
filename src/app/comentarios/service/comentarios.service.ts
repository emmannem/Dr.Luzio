import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comentario } from '../../modelos/comentario.model';

@Injectable({
  providedIn: 'root',
})
export class ComentariosService {
  //private apiUrl = 'http://localhost:3000/comentarios'; // URL de la API de comentarios

  constructor(private http: HttpClient) { }

  getComentarios(): Observable<Comentario[]> {
    // Realiza una solicitud GET a la API para obtener los últimos comentarios
    return this.http.get<Comentario[]>('http://192.168.137.1:3000/comentarios/5');
  }

  agregarComentario(comentario: Comentario): Observable<any> {
    // Realiza una solicitud POST a la API para agregar un nuevo comentario
    return this.http.post('http://192.168.137.1:3000/comentarios', comentario);
  }
}
