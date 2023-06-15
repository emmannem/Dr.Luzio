import { Component, OnInit, ViewChild } from '@angular/core';
import { ComentariosService } from './service/comentarios.service';
import { Comentario } from '../modelos/comentario.model';
import { LocalStorageService } from '../service/localStorage.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css'],
})
export class ComentariosComponent implements OnInit {
  comentarios!: Comentario[];
  mostrarError: boolean = false;

  @ViewChild('tipoModuloSelect') tipoModuloSelect: any;
  @ViewChild('comentarioInput') comentarioInput: any;

  constructor(
    private comentariosService: ComentariosService,
    private user: LocalStorageService
  ) {}

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
    if (texto && tipo) {
      const nuevoComentario: Comentario = {
        tipoModulo: tipo,
        texto_comentario: texto,
        cuenta: this.user.getItem(),
      };

      this.comentariosService
        .agregarComentario(nuevoComentario)
        .subscribe(() => {
          this.mostrarError = false; // Reinicia el estado de error
          this.obtenerComentarios();
          this.limpiarFormulario(); // Limpia el formulario
        });
    } else {
      this.mostrarError = true; // Muestra el error si no se seleccionó un módulo o no se escribió nada
    }
  }

  limpiarFormulario() {
    this.tipoModuloSelect.nativeElement.selectedIndex = 0; // Restablece la selección del select
    this.comentarioInput.nativeElement.value = ''; // Limpia el campo de texto
  }
}
