import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PerfilUsuario } from 'src/app/modelos/perfil.model';
import { LocalStorageService } from 'src/app/service/localStorage.service';

@Injectable()
export class PerfilService {
    constructor(private http: HttpClient,
        private cache: LocalStorageService,
    ) { }

    obtenerUsuarioPorCorreo(): Observable<PerfilUsuario> {
        const url = 'http://192.168.137.1:3000/usuarios/correo/' + this.cache.getItem();
        return this.http.get<PerfilUsuario>(url);
    }
}