import { Component, OnInit } from '@angular/core';
import { ComentariosService } from './service/comentarios.service';
import { Comentario } from '../modelos/comentario.model';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css'],
})
export class ComentariosComponent implements OnInit {
  comentarios!: Comentario[];

  constructor(private comentariosService: ComentariosService) {}

  ngOnInit() {
    this.obtenerComentarios();
  }

  obtenerComentarios() {
    this.comentariosService
      .getComentarios()
      .subscribe((comentarios: Comentario[]) => {
        this.comentarios = comentarios;
      });
  }

  agregarComentario(texto: string, tipo: string) {
    const nuevoComentario: Comentario = {
      tipoModulo: tipo, // Reemplaza con el nombre real del módulo
      texto_comentario: texto,
      cuenta: 3,
    };

    this.comentariosService.agregarComentario(nuevoComentario).subscribe(() => {
      this.obtenerComentarios();
    });
  }
}
