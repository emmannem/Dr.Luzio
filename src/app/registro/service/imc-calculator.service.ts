import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root',
})
export class IMCcalculatorService {

    constructor() { }

    imcClassification(peso: number, estatura: number, edad: number, sexo: string) {


        const imc : number = this.calculateIMC(peso,estatura);
        let classification = '';

        // Clasificación según la OMS
        if (imc < 18.5) {
            classification = 'Bajo peso';
        } else if (imc >= 18.5 && imc < 25) {
            classification = 'Normal';
        } else if (imc >= 25 && imc < 30) {
            classification = 'Sobrepeso';
        } else if (imc >= 30) {
            classification = 'Obesidad';
        }

        // Ajuste según edad y sexo
        if (sexo === 'M') {
            if (edad && edad < 18 && imc < 18.5) {
                if (imc <= 16.5) {
                    classification = 'Bajo peso';
                } else if (imc >= 18.5 && imc < 25) {
                    classification = 'Normal';
                } else if (imc >= 25 && imc < 30) {
                    classification = 'Sobrepeso';
                } else if (imc >= 30) {
                    classification = 'Obesidad';
                }
            } else {
                if (imc < 20) {
                    classification = 'Bajo peso';
                } else if (imc >= 20 && imc < 25) {
                    classification = 'Normal';
                } else if (imc >= 25 && imc < 30) {
                    classification = 'Sobrepeso';
                } else if (imc >= 30) {
                    classification = 'Obesidad';
                }
            }
        } else if (sexo === 'F') {
            if (edad && edad < 18) {
                if (imc <= 16 && imc < 17.5) {
                    classification = 'Bajo peso';
                } else if (imc >= 17.5 && imc < 25) {
                    classification = 'Normal';
                } else if (imc >= 25 && imc < 30) {
                    classification = 'Sobrepeso';
                } else if (imc >= 30) {
                    classification = 'Obesidad';
                }
            } else {
                if (imc < 19) {
                    classification = 'Bajo peso';
                } else if (imc >= 19 && imc < 24) {
                    classification = 'Normal';
                } else if (imc >= 24 && imc < 30) {
                    classification = 'Sobrepeso';
                } else if (imc >= 30) {
                    classification = 'Obesidad';
                }
            }
        }

        return classification;
    }

    private calculateIMC(peso: number, estatura: number) : number {
        if (peso && estatura) {
            const height = estatura / 100;
            return peso / (height * height);
        }
        return 0;
    }




}
