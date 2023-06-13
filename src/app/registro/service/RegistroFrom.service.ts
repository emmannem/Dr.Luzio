import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class RegistroFormService {
    constructor(private formBuilder: FormBuilder) { }

    crearFormulario(): FormGroup {
        return this.formBuilder.group({
            correo: [
                '',
                [
                    Validators.required,
                    Validators.pattern(/^[\w-]+(\.[\w-]+)*@estudiantes\.uv\.mx$/),
                ],
            ],
            contrasena: [
                '',
                [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
            ],
            nombre: [
                '',
                [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)],
            ],
            apellido: [
                '',
                [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)],
            ],
            sexo: ['', Validators.required],
            edad: [
                '',
                [
                    Validators.required,
                    Validators.maxLength(2),
                    Validators.min(18),
                    Validators.max(32),
                ],
            ],
            estatura: ['', [Validators.required, Validators.min(100)]],
            peso: ['', [Validators.required, Validators.min(30)]],
        });
    }
}
