import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from 'src/app/service/localStorage.service';



@Injectable({
  providedIn: 'root',
})
export class RegistroAPIService {
  constructor(
    private http: HttpClient,
    private cache: LocalStorageService,) { }

  async registrarUsuario(usuario: any): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.http.post(`http://192.168.137.1:3000/usuarios`, usuario).subscribe(
        (response) => {
          console.log('Usuario registrado:', response);
          this.cache.setItem(usuario.correo_usuario);
          resolve(true); // Resuelve la promesa con éxito
          this.AsignarTareasIMC()
        },
        (error) => {
          console.error('Error en el registro:', error);
          alert('Revisa tus datos')
          reject(false); // Rechaza la promesa con fallo
        }
      );
    });
  }

  async AsignarTareasIMC() {
    let header = new HttpHeaders().set("Type", "aplication/json");

    let url = "http://192.168.137.1:3000/usuario-act-imc/asignarAct/" + this.cache.getItem() + ',A';
    this.http.post(url, { header: header }).subscribe(
      (response) => {
        console.log(response)
      },
      (error) => {
        console.log(error)
      }
    )

    url = "http://192.168.137.1:3000/usuario-act-imc/asignarAct/" + this.cache.getItem() + ',E';
    this.http.post(url, { header: header }).subscribe(
      (response) => {
        console.log(response)
      },
      (error) => {
        console.log(error)
      }
    )
  }

}
