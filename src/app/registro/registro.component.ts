import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroService } from './registro.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private registroService: RegistroService
  ) {}

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(8)]],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      sexo: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(1)]],
      estatura: ['', [Validators.required, Validators.min(1)]],
      peso: ['', [Validators.required, Validators.min(1)]],
    });
  }

  get imc() {
    const weight = this.registrationForm?.get('peso')?.value;
    const height = this.registrationForm?.get('estatura')?.value / 100;
    const age = this.registrationForm?.get('edad')?.value;
    const gender = this.registrationForm?.get('sexo')?.value;

    const imc = weight / (height * height);

    let classification = '';

    // Clasificación según la OMS
    if (imc < 18.5) {
      classification = 'Bajo peso';
    } else if (imc >= 18.5 && imc < 25) {
      classification = 'Normal';
    } else if (imc >= 25 && imc < 30) {
      classification = 'Sobrepeso';
    } else if (imc >= 30) {
      classification = 'Obesidad';
    }

    // Ajuste según edad y sexo
    if (gender === 'M') {
      if (age < 18 && imc < 18.5) {
        if (imc <= 16.5) {
          classification = 'Bajo peso';
        } else if (imc >= 18.5 && imc < 25) {
          classification = 'Normal';
        } else if (imc >= 25 && imc < 30) {
          classification = 'Sobrepeso';
        } else if (imc >= 30) {
          classification = 'Obesidad';
        }
      } else {
        if (imc < 20) {
          classification = 'Bajo peso';
        } else if (imc >= 20 && imc < 25) {
          classification = 'Normal';
        } else if (imc >= 25 && imc < 30) {
          classification = 'Sobrepeso';
        } else if (imc >= 30) {
          classification = 'Obesidad';
        }
      }
    } else if (gender === 'F') {
      if (age < 18) {
        if (imc <= 16 && imc < 17.5) {
          classification = 'Bajo peso';
        } else if (imc >= 17.5 && imc < 25) {
          classification = 'Normal';
        } else if (imc >= 25 && imc < 30) {
          classification = 'Sobrepeso';
        } else if (imc >= 30) {
          classification = 'Obesidad';
        }
      } else {
        if (imc < 19) {
          classification = 'Bajo peso';
        } else if (imc >= 19 && imc < 24) {
          classification = 'Normal';
        } else if (imc >= 24 && imc < 30) {
          classification = 'Sobrepeso';
        } else if (imc >= 30) {
          classification = 'Obesidad';
        }
      }
    }

    return classification;
  }

  registrarUsuario() {
    console.log(5544);
    if (this.registrationForm.valid) {
      // Obtener los datos del formulario
      const userData = this.registrationForm.value;
      userData.imc = this.imc;

      // Realizar el registro llamando al servicio
      this.registroService.registrarUsuario(userData).subscribe(
        (response) => {
          console.log('Usuario registrado:', response);
          // Registro exitoso, redirigir a otro módulo
          this.router.navigate(['/tareas']);
        },
        (error) => {
          console.error('Error en el registro:', error);
        }
      );
    }
  }
}
