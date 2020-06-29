import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { RouterModule } from '@angular/router'; // necesario para el router entre páginas
import { PipesModule } from '../pipes/pipes.module';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';


@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    NopagefoundComponent,
    ModalUploadComponent
  ],
  imports: [
    CommonModule,  // para que reconozca directivas Ngfor, pipes etc
    RouterModule,
    PipesModule
  ],

  exports: [
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    NopagefoundComponent,
    ModalUploadComponent
  ]

})
export class SharedModule { }


// modulo especializado para shared
