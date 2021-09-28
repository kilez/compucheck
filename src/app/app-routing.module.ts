import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarComponent } from './listar/listar.component';
import { CrearComponent } from './crear/crear.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { ModuloEditarComponent } from './modulo-editar/modulo-editar.component';


const routes: Routes = [
{path:'lista', component : ListarComponent},
{path:'crear',component:CrearComponent},
{path:'busqueda/:termino',component:BusquedaComponent},
{path:'editar/:id', component:ModuloEditarComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
