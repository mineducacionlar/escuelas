import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Módulos
import { PagesModule } from './pages/pages.module';
// Rutas
import { APP_ROUTES } from './app.routes';


// Servicios
import { SettingsService } from './services/settings/settings.service';


// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Servicios
import { ServiceModule } from './services/service.module'; // Módulo integrado de servicios
import { PagesComponent } from './pages/pages.component';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PagesComponent


],
  imports: [
    BrowserModule,
    APP_ROUTES,
    FormsModule,
    ReactiveFormsModule,  // para  trabajar con formularios
    ServiceModule,
    SharedModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
