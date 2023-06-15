import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from 'src/app/service/localStorage.service';


@Injectable({
    providedIn: 'root',
})
export class PreguntasAPIService {
    constructor(
        private http: HttpClient,
        private cache: LocalStorageService) { }

    async asignarAPI(data: any): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.http.patch(`http://localhost:3000/usuarios/Estres/` + this.cache.getItem(), data).subscribe(
                (response) => {
                    console.log('Data Lista:', response);
                    resolve(true); // Resuelve la promesa con éxito
                    this.AsignarTareasEstres();
                },
                (error) => {
                    console.error('Error Data :', error);
                    reject(false); // Rechaza la promesa con fallo
                }
            );
        });
    }
    async AsignarTareasEstres() {
        let header = new HttpHeaders().set("Type", "aplication/json");
        let url = "http://localhost:3000/usuario-act-estres/asignarAct/" + this.cache.getItem();
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
