import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './registro/registro.component';

import { ComentariosComponent } from './comentarios/comentarios.component';
import { IsesionComponent } from './isesion/isesion.component';
import { TareasComponent } from './tareas/tareas.component';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { TestComponent } from './test/test.component';
import { TestFinalComponent } from './test-final/test-final.component';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '', component: IsesionComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'comentarios', component: ComentariosComponent },
  { path: 'login', component: IsesionComponent },
  { path: 'tareas', component: TareasComponent },
  { path: 'preguntas', component: PreguntasComponent },
  { path: 'test', component: TestComponent },
  { path: 'test-final', component: TestFinalComponent },
  { path: 'perfil', component: PerfilComponent },
];
export const appRoutingProviders: any[] = [];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
