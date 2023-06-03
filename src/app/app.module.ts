import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { appRoutingProviders } from './app-routing.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { RegistroComponent } from './registro/registro.component';
import { RegistroService } from './registro/registro.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { ComentariosComponent } from './comentarios/comentarios.component';
import { ComentarioService } from './comentarios/comentarios.service';
import { TareasComponent } from './tareas/tareas.component';
import { IsesionComponent } from './isesion/isesion.component';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { TestComponent } from './test/test.component';
import { TestFinalComponent } from './test-final/test-final.component';
import { PerfilComponent } from './perfil/perfil.component';
@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    NavbarComponent,
    ComentariosComponent,
    TareasComponent,
    IsesionComponent,
    PreguntasComponent,
    TestComponent,
    TestFinalComponent,
    PerfilComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [RegistroService, ComentarioService, appRoutingProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
