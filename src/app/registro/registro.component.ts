import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroService } from './registro.service';
import { Usuario } from './usuario.model';

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
      correo: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-Za-z0-9._%+-]+@estudiantes\.uv\.mx$/),
        ],
      ],
      contrasena: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9!@#$%^&*]{8}$/)],
      ],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      sexo: ['', Validators.required],
      edad: [
        '',
        [Validators.required, Validators.pattern(/^(1[8-9]|[2-3][0-9])$/)],
      ],
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
    if (this.registrationForm.valid) {
      const userData: Usuario = {
        correo: this.registrationForm.value.correo,
        contrasena: this.registrationForm.value.contrasena,
        nombre: this.registrationForm.value.nombre,
        apellido: this.registrationForm.value.apellido,
        sexo: this.registrationForm.value.sexo,
        edad: this.registrationForm.value.edad,
        estatura: this.registrationForm.value.estatura,
        peso: this.registrationForm.value.peso,
        imc: this.imc,
      };

      this.registroService.registrarUsuario(userData).subscribe(
        (response) => {
          console.log('Usuario registrado:', response);
          this.router.navigate(['/tareas']);
        },
        (error) => {
          console.error('Error en el registro:', error);
        }
      );
    }
  }
}
