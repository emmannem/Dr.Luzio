import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class IsesionFormService {
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

        });
    }
}
