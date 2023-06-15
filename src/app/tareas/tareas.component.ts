import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit, inject } from "@angular/core";
import { MandarService } from "./MandarDatos.service";
import { LocalStorageService } from "../service/localStorage.service";

@Component({
  selector: "app-tareas",
  templateUrl: "./tareas.component.html",
  styleUrls: ["./tareas.component.css"],
})
export class TareasComponent implements OnInit {

  constructor(private mandar: LocalStorageService) {

  }

  public actividades: Array<any> = [];
  public actividadesMostrar: Array<any> | any = [];
  public actividades2: Array<any> = [];
  public actividadesMostrar2: Array<any> = [];
  public actividades3: Array<any> = [];
  public actividadesMostrar3: Array<any> = [];
  public contador: number = 0;
  Array: [] | any = [];
  resultado$: any;
  ID_Usuario: string | any;

  public respuesta: any;
  http = inject(HttpClient);

  async ngOnInit() {
    this.ID_Usuario = await this.mandar.getItem();
    await this.peticion(this.ID_Usuario);
    this.peticion2(this.ID_Usuario);
    this.peticion3(this.ID_Usuario);
    this.actualizarIndex(this.contador);
  }

  async peticion(correo: string) {
    let url =
      "http://localhost:3000/act-imc/actividades/E," +
      correo;
    this.resultado$ = await this.http.get(url).toPromise();
    this.actividades = this.resultado$;
    this.actividadesMostrar = this.actividades;
    this.contador += this.actividades.length;

    return this.resultado$;
  }

  async peticion2(correo: string) {
    let header = new HttpHeaders().set("Type", "aplication/json");
    let url = "http://localhost:3000/act-nivel-estres/act/" + correo;
    let resultado2 = await this.http
      .get(url, { headers: header })
      .subscribe((data: any) => {
        this.actividades2 = data;
        this.actividadesMostrar2 = this.actividades2;
        this.contador += this.actividades2.length;
      });
    return resultado2;
  }

  async peticion3(correo: string) {
    let header = new HttpHeaders().set("Type", "aplication/json");
    let url =
      "http://localhost:3000/act-imc/actividades/A," +
      correo;
    let resultado3 = await this.http
      .get(url, { headers: header })
      .subscribe((data: any) => {
        this.actividades3 = data;
        this.actividadesMostrar3 = this.actividades3;
        this.contador += this.actividades3.length;
      });
    return resultado3;
  }

  async actualizar(id: any) {
    console.log("Actividad a eliminar: ", id);

    this.actividadesMostrar = this.actividades.filter(
      (item) => item.id_actIMC !== id
    );
    this.actividades = this.actividadesMostrar;
    this.actividadesMostrar2 = this.actividades2.filter(
      (item) => item.id_actNivelEstres !== id
    );
    this.actividades2 = this.actividadesMostrar2;
    this.actividadesMostrar3 = this.actividades3.filter(
      (item) => item.id_actIMC !== id
    );
    this.actividades3 = this.actividadesMostrar3;

    let url =
      "http://192.168.137.1:3000/usuario-act-imc/update/" +
      this.ID_Usuario +
      "," +
      id;
    console.log(url)

    await this.http.patch(url, { estado: true }).subscribe(
      (response) => {
        console.log(response)
      },
      (error) => {
        console.log(error)
      }
    );
  }

  async actualizar2(id: any) {
    console.log("Actividad a eliminar: ", id);

    this.actividadesMostrar = this.actividades.filter(
      (item) => item.id_actIMC !== id
    );
    this.actividades = this.actividadesMostrar;
    this.actividadesMostrar2 = this.actividades2.filter(
      (item) => item.id_actNivelEstres !== id
    );
    this.actividades2 = this.actividadesMostrar2;
    this.actividadesMostrar3 = this.actividades3.filter(
      (item) => item.id_actIMC !== id
    );
    this.actividades3 = this.actividadesMostrar3;

    let url =
      "http://192.168.137.1:3000/usuario-act-estres/update/" +
      this.ID_Usuario +
      "," +
      id;
    console.log(url)

    await this.http.patch(url, { estado: true }).subscribe(
      (response) => {
        console.log(response)
      },
      (error) => {
        console.log(error)
      }
    );
  }

  actualizarIndex(contador: number) {
    console.log(1);
    for (let i = 1; i <= contador; i++) {
      this.Array.push(i);
    }
  }
}
