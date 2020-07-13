export { LoginGuardGuard } from './guards/login-guard.guard';
export { AdminGuard } from './guards/admin.guard';
export { VerificaTokenGuard } from './guards/verifica-token.guard';
export { SubirArchivoService } from './subir-archivo/subir-archivo.service';
export { SettingsService } from './settings/settings.service';
export { SharedService } from './shared/shared.service';
export { SidebarService } from './shared/sidebar.service';
export { UsuarioService } from './usuario/usuario.service';
export { EscuelaService } from './escuela/escuela.service';





/* tengo todos los servicios en un único archivo index, tomo estos servicios y los exporto siendo esta
la única referencia directa a los servicios si muevo las carpetas. trabajando con el app.component*/


