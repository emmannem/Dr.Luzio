import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroService } from './registro.service';
import { crearUsarioModelo } from '../modelos/crearUsarios.model';

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
      contrasena: [
        '',
        [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
      ],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      sexo: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(1), Validators.max(20)]],
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

  async registrarUsuario() {
    console.log(this.crearCuenta());
    console.log(this.registrationForm.valid)
    if (this.registrationForm.valid) {

      try {
        const exito = await this.registroService.registrarUsuario(this.crearCuenta());
        if (exito) {
          alert('Ahora Ingresa al Sistema')
          this.router.navigate(['/']);
        }
      } catch (error) {
        alert('Revisa que los datos sean corectos')

      }
    }

  }
  
  crearCuenta(): any {

    const userData = this.registrationForm.value;
    let user = new crearUsarioModelo()

    user.correo_usuario = userData.correo;
    user.contraseña_usuario = userData.contrasena;
    user.nombre_usuario = userData.nombre;
    user.apellidos_usuario = userData.apellido;
    user.sexo_usuario = userData.sexo;
    user.edad_usuario = userData.edad;
    user.IMC_usuario = this.imc;
    user.peso = userData.peso;
    user.estatura = userData.estatura;
    return user;
  }
  

}
