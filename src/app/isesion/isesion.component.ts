import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IsesionFormService } from './service/isesionFrom.service';
import { IsesionAPIService } from './service/isesionAPI.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-isesion',
  templateUrl: './isesion.component.html',
  styleUrls: ['./isesion.component.css'],
  providers: [
    IsesionFormService,
    IsesionAPIService
  ],
})
export class IsesionComponent {
  registrationForm!: FormGroup;
  constructor(
    private router: Router,
    private formService: IsesionFormService,
    private isesionAPI: IsesionAPIService
  ) { }

  ngOnInit() {
    this.registrationForm = this.formService.crearFormulario();
  }
  async iniciarSesion() {
    const userData = this.registrationForm.value;
    console.log(this.registrationForm.valid)
    if (this.registrationForm.valid) {
      try {
        const exito = await this.isesionAPI.inicioSesion(userData.correo, userData.contrasena);
        if (exito) {
          alert('Ahora Ingresa al Sistema')
          this.router.navigate(['/perfil']);
        }
      } catch (error) {
        alert('Revisa que los datos sean corectos')

      }
    }

  }




}
