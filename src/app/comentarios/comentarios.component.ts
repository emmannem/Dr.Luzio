import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ComentarioService } from './comentarios.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css'],
})
export class ComentariosComponent implements OnInit {
  comentarios: any[] = [];
  nuevoComentarioTexto: string = '';
  mostrarUltimosComentarios: boolean = false;

  @ViewChild('comentariosContainer', { static: true })
  comentariosContainer!: ElementRef;

  constructor(private comentarioService: ComentarioService) {}

  ngOnInit() {
    this.obtenerComentarios();
  }

  obtenerComentarios() {
    const correoUsuario = 'usuario@ejemplo.com'; // Obtén el correo electrónico del usuario actual

    this.comentarioService.obtenerComentarios(correoUsuario).subscribe(
      (response: any) => {
        if (response && response.length > 0) {
          this.comentarios = response.slice(-5); // Mostrar solo los últimos 5 comentarios
          this.mostrarUltimosComentarios = true;
          this.scrollUp();
        }
      },
      (error) => {
        console.log('Error al obtener los comentarios:', error);
      }
    );
  }

  agregarComentario() {
    if (this.nuevoComentarioTexto.trim() !== '') {
      const correoUsuario = 'usuario@ejemplo.com'; // Obtén el correo electrónico del usuario actual

      const nuevoComentario = {
        texto: this.nuevoComentarioTexto,
        correoUsuario: correoUsuario,
      };

      this.comentarioService.agregarComentario(nuevoComentario).subscribe(
        (response) => {
          this.comentarios.push(nuevoComentario);
          if (this.comentarios.length > 5) {
            this.comentarios.shift(); // Eliminar el primer comentario si hay más de 5
          }
          this.nuevoComentarioTexto = '';
          this.mostrarUltimosComentarios = true;
          this.scrollUp();
        },
        (error) => {
          console.log('Error al agregar el comentario:', error);
        }
      );
    }
  }

  scrollUp() {
    setTimeout(() => {
      this.comentariosContainer.nativeElement.scrollTop = 0;
    }, 0);
  }
}
