import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    user.edad_usuario = parseInt(userData.edad, 10);
    user.IMC_usuario = this.calcu_imc.imcClassification(
      userData.peso, userData.estatura, userData.edad, userData.sexo
    );
    user.peso = parseInt(userData.peso, 10);
    user.estatura = parseInt(userData.estatura, 10);
    return user;
  }


}
