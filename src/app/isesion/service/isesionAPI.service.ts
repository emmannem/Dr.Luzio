import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'src/app/service/localStorage.service';

@Injectable({
    providedIn: 'root',
})
export class IsesionAPIService {
    constructor(
        private http: HttpClient,
        private cache: LocalStorageService,) { }

    async inicioSesion(usuario: string, contraseña: string): Promise<boolean> {
        let url = 'http://localhost:3000/usuarios/login/' + usuario + ',' + contraseña;
        console.log(url)
        return new Promise<boolean>((resolve, reject) => {
            this.http.get(url).subscribe(
                (response) => {
                    console.log('Usuario Ingresando', response);
                    this.cache.setItem(usuario);
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
