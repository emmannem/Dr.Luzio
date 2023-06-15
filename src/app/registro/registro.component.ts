import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroAPIService } from './service/RegistroAPI.service';
import { crearUsarioModelo } from '../modelos/crearUsarios.model';
import { IMCcalculatorService } from './service/imc-calculator.service';
import { RegistroFormService } from './service/RegistroFrom.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers: [
    RegistroFormService,
    IMCcalculatorService,
    RegistroAPIService
  ],
})
export class RegistroComponent implements OnInit {
  registrationForm!: FormGroup;
  constructor(
    private formService: RegistroFormService,
    private calcu_imc: IMCcalculatorService,
    private router: Router,
    private registroApiService: RegistroAPIService,
  ) { }

  ngOnInit() {
    this.registrationForm = this.formService.crearFormulario();
  }


  async registrarUsuario() {
    console.log(this.crearCuenta());
    console.log(this.registrationForm.valid)
    if (this.registrationForm.valid) {

      try {
        const exito = await this.registroApiService.registrarUsuario(this.crearCuenta());
        if (exito) {
          alert('Ahora Ingresa al Sistema')
          this.router.navigate(['/test']);
        }
      } catch (error) {
        alert('Revisa que los datos sean corectos')

      }
    }

  }

  crearCuenta(): any {
    const userData = this.registrationForm.value;
    console.log(userData);

    const user: crearUsarioModelo = {
      correo_usuario: userData.correo,
      contraseña_usuario: userData.contrasena,
      nombre_usuario: userData.nombre,
      apellidos_usuario: userData.apellido,
      sexo_usuario: userData.sexo,
      edad_usuario: parseInt(userData.edad, 10),
      IMC_usuario: this.calcu_imc.imcClassification(
        userData.peso, userData.estatura, userData.edad, userData.sexo
      ),
      peso: parseInt(userData.peso, 10),
      estatura: parseInt(userData.estatura, 10),
    };

    return user;
  }



}
