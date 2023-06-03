import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { MandarService } from './MandarDatos.service';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {
  IMC: string='';
  Estres: string='';
  constructor(private servicio: MandarService){
    this.IMC=servicio.getIMC();
    this.Estres=servicio.getEstres();
    console.log(this.IMC, this.Estres);
  }

  public actividades: Array<any>=[];
  public actividadesMostrar: Array<any>=[];
  public actividades2: Array<any>=[];
  public actividadesMostrar2: Array<any>=[];
  public actividades3: Array<any>=[];
  public actividadesMostrar3: Array<any>=[];
  public contador: number=0;
  Array:[] | any = [];
  

  public respuesta: any;
  http=  inject(HttpClient);
  
  async ngOnInit() {
    this.peticion();
    this.peticion2();
    this.peticion3();
    this.actualizarIndex(this.contador);
   
  }

  async peticion(){
    let header=new HttpHeaders().set('Type','aplication/json');
    let url = 'http://localhost:3000/act-imc/actividades/E,' + this.IMC;
    let resultado= await this.http.get(url,{headers: header})
    .subscribe((data: any) => {
      this.actividades=data;
      this.actividadesMostrar=this.actividades;
this.contador +=this.actividades.length;
  })
      return resultado;
  }

  async peticion2(){
    let header=new HttpHeaders().set('Type','aplication/json');
    let url='http://localhost:3000/act-nivel-estres/act/'+this.Estres;
    let resultado2=await this.http.get(url,{headers: header})
    .subscribe((data: any) => {
      this.actividades2=data;
      this.actividadesMostrar2=this.actividades2;
      this.contador +=this.actividades2.length;
  })
  return resultado2;
  }

  async peticion3(){
    let header=new HttpHeaders().set('Type','aplication/json');
    let url='http://localhost:3000/act-imc/actividades/A,'+this.IMC;
    let resultado3=await this.http.get(url,{headers: header})
    .subscribe((data: any) => {
      this.actividades3=data;
      this.actividadesMostrar3=this.actividades3;
      this.contador +=this.actividades3.length;
  })
  return resultado3;
  }

  actualizar(id: any) {
    console.log("Actividad a eliminar: ", id)

    this.actividadesMostrar = this.actividades.filter((item) => item.id_actIMC != id);
    this.actividades=this.actividadesMostrar;
    this.actividadesMostrar2 = this.actividades2.filter((item) => item.id_actNivelEstres != id);
    this.actividades2=this.actividadesMostrar2;
    this.actividadesMostrar3 = this.actividades3.filter((item) => item.id_actIMC != id);
    this.actividades3=this.actividadesMostrar3;
  }

  actualizarIndex(contador: number) {
    console.log(1)
    for(let i = 1; i <= contador; i++) {
      this.Array.push(i);
    }
    
  }

}


