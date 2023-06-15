import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../service/localStorage.service';
import { PerfilService } from './services/perfilAPI.service';
import { PerfilUsuario } from '../modelos/perfil.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  providers: [PerfilService],
})
export class PerfilComponent implements OnInit {

  constructor(
    private cahe: LocalStorageService,
    private servicio: PerfilService
  ) { }


  Nombre_Usuario: string = '';
  Apellido_Usuario: string = '';
  Correo_Usuario: string = '';
  Edad_Usuario: string = '';
  Sexo_Usuario: string = '';
  IMC_Usuario: string = '';
  Estatura_Usuario: string | any;
  NivelEstres_Usuario: string = '';

  async ngOnInit() {
    this.ObtenerDatos();
  }

  ObtenerDatos() {
    this.servicio
      .obtenerUsuarioPorCorreo()
      .subscribe(
        (datos: PerfilUsuario) => {
          this.Nombre_Usuario = datos.nombre_usuario;
          this.Apellido_Usuario = datos.apellidos_usuario;
          this.Correo_Usuario = datos.correo_usuario;
          this.Edad_Usuario = datos.edad_usuario;
          this.Sexo_Usuario = datos.sexo_usuario;
          this.IMC_Usuario = datos.IMC_usuario;
          this.Estatura_Usuario = datos.estatura;
          this.NivelEstres_Usuario = datos.nivelEstres_usuario || "Vacio";
        },
        (error: any) => {
          console.log('Error en la solicitud:', error);
        }
      );
  }


}
