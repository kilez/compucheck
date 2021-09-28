import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ListarComponent } from './listar/listar.component';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CrearComponent } from './crear/crear.component';
import { FormsModule } from '@angular/forms';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { ModuloEditarComponent } from './modulo-editar/modulo-editar.component';
import { MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';



@NgModule({
  declarations: [
    AppComponent,
    ListarComponent,
    CrearComponent,
    BusquedaComponent,
    ModuloEditarComponent
  ],
  entryComponents:[
    ModuloEditarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    MatTableModule,
    MatInputModule,
    MatCardModule,
    MatTabsModule,
    MatPaginatorModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatExpansionModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
