export interface PerfilUsuario {
    nombre_usuario: string;
    apellidos_usuario: string;
    correo_usuario: string;
    edad_usuario: string;
    sexo_usuario: string;
    IMC_usuario: string;
    estatura: any;
    nivelEstres_usuario?: string; // La propiedad es opcional con el operador '?'
}
