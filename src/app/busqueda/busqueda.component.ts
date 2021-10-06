import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { FacturaServiceService } from '../factura-service.service';
import { Factura } from '../models/factura';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ModuloEditarComponent } from '../modulo-editar/modulo-editar.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    public servicio: FacturaServiceService,
            public  dialog:MatDialog) { }

data : Factura[]=[];

mostrarColumnas = ['referencia','fecha','nombre','vehiculo','telefono','falla','eliminar'];
dataSource : MatTableDataSource<Factura>;
@ViewChild(MatPaginator,{static:true}) paginator : MatPaginator;
pageSizeOptions = [5, 10, 15, 20, 50,100];

  ngOnInit(): void {
    this.route.paramMap.subscribe(params =>{
      const termino : String = params.get('termino');
      this.servicio.filtro(termino).subscribe(a =>{
        if(a.length < 1) {
         Swal.fire('Error',`La Factura ${termino} no existe`,'error');
         return;
             }

      this.data= a;
      console.log(this.data,this.data.length);
      this.iniciarPaginador();
      } );
       


    }
    )
  }

  iniciarPaginador():void{
    this.dataSource = new MatTableDataSource<Factura>(this.data);
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel="Registros por Pagina";
  }
  

  eliminarFactura(factura :Factura): void{

    Swal.fire({
      title: 'Cuidado',
      text: `Seguro que deseas eliminar al ${factura.nombre} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.value) {
        this.servicio.eliminar(factura.id).
    subscribe(() =>{
      this.data = this.data.filter(a => a.id !== factura.id);
      this.iniciarPaginador();
      Swal.fire('Eliminado:',
      `Factura ${factura.nombre} Eliminada con exito`,
      'success');
    });

      }
    });

   }

   editar(factura:Factura):void{
    const modalRef = this.dialog.open(ModuloEditarComponent,{
      
      data : {factura: factura}
      

      
    });
    modalRef.afterClosed().subscribe(respuestas =>{
   this.servicio.editar(respuestas).subscribe(editar =>{
    Swal.fire('ACTUALIZAR',`Folio ${respuestas.referencia} Actualizado`,'success');
  });
    }
      
      );
   }

}
