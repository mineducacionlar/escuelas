import { PagesComponent } from '../pages.component';
import { RouterModule , Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { Graficas1Component } from '../graficas1/graficas1.component';
import { MapboxComponent } from '../mapbox/mapbox.component';
import { AccountSettingsComponent } from '../account-settings/account-settings.component';
import { LoginGuardGuard, AdminGuard, VerificaTokenGuard } from 'src/app/services/service.index';
import { ProfileComponent } from '../profile/profile.component';
import { UsuariosComponent } from '../usuarios/usuarios.component';
import { EscuelasComponent } from '../escuelas/escuelas.component';
import { DirectoresComponent } from '../directores/directores.component';
import { DirectorComponent } from '../directores/director.component';
import { BusquedaComponent } from '../busqueda/busqueda.component';
import { EscuelaComponent } from '../escuelas/escuela.component';


// 1)
const pagesRoutes: Routes = [
        { path: 'dashboard',
        component: DashboardComponent,
        canActivate: [VerificaTokenGuard ],
        data: { titulo: 'Tablero de control' }},

        {path: 'account-services', component: AccountSettingsComponent, data: { titulo: 'Ajustes del tema' }},
        {path: 'graficas1', component: Graficas1Component, data: { titulo: 'Estadisticas' }},
        {path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de Usuario' }},
        {path: 'mapbox', component: MapboxComponent, data: { titulo: 'Mapbox' }},
        {path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador' }},

        // Mantenimientos
        {path: 'usuarios',
         component: UsuariosComponent,
         canActivate: [AdminGuard],
         data: { titulo: 'Mantenimiento de usuarios' }},

        {path: 'escuelas', component: EscuelasComponent, data: { titulo: 'Mantenimiento de escuelas' }},
        {path: 'escuela/:id', component: EscuelaComponent, data: { titulo: 'Info - Mantenimiento de escuela' }},
        {path: 'directores', component: DirectoresComponent, data: { titulo: 'Mantenimiento de directores' }},
        {path: 'director/:id', component: DirectorComponent, data: { titulo: 'Crear-actualizar director' }},
        {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
];

export const  PAGES_ROUTES = RouterModule.forChild(pagesRoutes);

// 1 creo arreglo de rutas, formado por el path y el componente
// 2 si la ruta es vacía redirecciona a pagescomponent al cual tiene hijos
// 3 propiedad data. se recomienda pasar data por medio de un objeto {} le pasamos el titulo
