import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PreguntasAPIService } from './service/preguntas.service';




@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})

export class PreguntasComponent {
  constructor(
    private router: Router,
    private serviceAPI: PreguntasAPIService,
  ) { }

  async submitForm() {



    try {
      const exito = await this.serviceAPI.asignarEstres(this.dataEstres());
      if (exito) {
        alert('Ahora Ingresa al Sistema')
        this.router.navigate(['/test-final']);
      }
    } catch (error) {
      alert('Revisa que los datos sean corectos')

    }

  }
  dataEstres() {
    const respuestas = [];
    for (let i = 1; i <= 10; i++) {
      const pregunta = document.querySelector(`.pregunta${i}`) as HTMLDivElement;
      const opcionSeleccionada = pregunta.querySelector(`input[name="opcion${i}"]:checked`) as HTMLInputElement;
      respuestas.push(opcionSeleccionada.value);
    }

    // Calcular la puntuación total
    let puntuacionTotal = 0;
    respuestas.forEach((respuesta) => {
      switch (respuesta) {
        case 'nunca':
          puntuacionTotal += 0;
          break;
        case 'ocasional':
          puntuacionTotal += 1;
          break;
        case 'general':
          puntuacionTotal += 2;
          break;
        case 'siempre':
          puntuacionTotal += 4;
          break;
        default:
          break;
      }
    });

    // Determinar el nivel de estrés
    let nivelEstrés = '';
    if (puntuacionTotal >= 0 && puntuacionTotal <= 13) {
      nivelEstrés = 'bajo';
    } else if (puntuacionTotal >= 14 && puntuacionTotal <= 26) {
      nivelEstrés = 'moderado';
    } else {
      nivelEstrés = 'alto';
    }

    // Imprimir la puntuación total y el nivel de estrés
    console.log('Puntuación total:', puntuacionTotal);
    console.log('Nivel de estrés:', nivelEstrés);

    return {
      "nivelEstres_usuario": nivelEstrés
    }

  }



}










