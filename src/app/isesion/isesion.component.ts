import { Component } from '@angular/core';

@Component({
  selector: 'app-isesion',
  templateUrl: './isesion.component.html',
  styleUrls: ['./isesion.component.css']
})
export class IsesionComponent {
  inputValue!: string;

  btnDeshabilitado: boolean = true;

  habilitarBtn(){
    this.btnDeshabilitado = false;
  }
  deshabilitarBtn(){
    this.btnDeshabilitado = true;
  }

  validarInput(){
    if(this.inputValue.length >=10){
      //habilitar
      this.habilitarBtn();
    }
  }

}
