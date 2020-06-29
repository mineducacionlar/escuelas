import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { RegisterComponent } from './login/register.component';
import { PagesComponent } from './pages/pages.component';
import { LoginGuardGuard } from './services/service.index';

// 1)
const appRoutes: Routes = [

    {path: 'login', component: LoginComponent , data: { titulo: 'Login' }},
    {path: 'register', component: RegisterComponent, data: { titulo: 'Registro' }},
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard ],   // para llamar la validación del token
        loadChildren: './pages/pages.module#PagesModule'    // para cargar de foma dinamica
    },
    {path: '**', component: NopagefoundComponent , data: { titulo: 'No existente'}} // p/cualquier ruta que no este definida

];

export const  APP_ROUTES = RouterModule.forRoot(appRoutes, {useHash: true});

// 1 creo arreglo de rutas, formado por el path y el componente
// 2 si la ruta es vacía redirecciona a pagescomponent al cual tiene hijos
