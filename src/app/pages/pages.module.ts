import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './router/pages.router';
import { FormsModule } from '@angular/forms';
import { MapboxComponent } from './mapbox/mapbox.component';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { ChartsModule } from 'ng2-charts';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { PipesModule } from '../pipes/pipes.module';
import { ProfileComponent } from './profile/profile.component';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { EscuelasComponent } from './escuelas/escuelas.component';
import { DirectoresComponent } from './directores/directores.component';
import { DirectorComponent } from './directores/director.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { EscuelaComponent } from './escuelas/escuela.component';
import { ListadosComponent } from './listados/listados.component';
import { ListadoComponent } from './listados/listado.component';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [
    // PagesComponent,
    DashboardComponent,
    Graficas1Component,
    MapboxComponent,
    IncrementadorComponent,
    GraficoDonaComponent,
    AccountSettingsComponent,
    PromesasComponent,
    ProfileComponent,
    UsuariosComponent,
  //  ModalUploadComponent,
    EscuelasComponent,
    DirectoresComponent,
    DirectorComponent,
    BusquedaComponent,
    EscuelaComponent,
    ListadosComponent,
    ListadoComponent,
    ],
  exports: [
    DashboardComponent,
    Graficas1Component
  ],
  imports: [
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    ChartsModule,
    PipesModule,
    CommonModule,
    NgxPaginationModule
    ]

})
export class PagesModule { }

