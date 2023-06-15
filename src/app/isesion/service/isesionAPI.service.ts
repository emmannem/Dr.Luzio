import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'src/app/service/localStorage.service';
import { loginModel } from 'src/app/modelos/login.model';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class IsesionAPIService {
    constructor(
        private http: HttpClient,
        private router: Router,
        private cache: LocalStorageService,) { }

    async inicioSesion(usuario: string, contraseña: string): Promise<boolean> {

        let url = 'http://192.168.137.1:3000/usuarios/login/' + usuario + ',' + contraseña;
        console.log(url)
        return new Promise<boolean>((resolve, reject) => {
            this.http.get<loginModel>(url).subscribe(
                (response) => {
                    this.cache.setItem(usuario);

                    console.log('Usuario Ingresando', response);
                    // console.log(response.nivelEstres_us == null);

                    if (response.nivel_estres == null) {
                        this.router.navigate(['/test']);
                    } else {
                        this.router.navigate(['/tareas']);
                    }
                    resolve(true); // Resuelve la promesa con éxito
                },
                (error) => {
                    console.error('Error', error);
                    reject(false); // Rechaza la promesa con fallo
                }
            );
        });
    }

}
