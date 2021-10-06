
import { Component, OnInit, ViewChild } from '@angular/core';
import { FacturaServiceService } from '../factura-service.service';
import { Factura } from '../models/factura';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModuloEditarComponent } from '../modulo-editar/modulo-editar.component';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
  factura : Factura[] = [];
  mostrarColumnas = ['referencia','fecha','nombre','vehiculo','telefono','falla','eliminar'];
   dataSource : MatTableDataSource<Factura>;
  @ViewChild(MatPaginator,{static:true}) paginator : MatPaginator;
  pageSizeOptions = [5, 10, 15, 20, 50,100];
  

  constructor(public service : FacturaServiceService,
                      public  dialog:MatDialog) { }

  ngOnInit(): void {
    this.service.listar().subscribe(facturas=>{
    this.factura = facturas;
    this.iniciarPaginador();
    });
  }

  
  iniciarPaginador():void{
    this.dataSource = new MatTableDataSource<Factura>(this.factura);
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel="Registros por Pagina";
  }

  eliminarFactura(factura :Factura): void{
 console.log(factura);
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
        this.service.eliminar(factura.id).
    subscribe(() =>{
      this.factura = this.factura.filter(a => a.id !== factura.id);
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
      width:'950px',
      data : {factura: factura}
      

      
    });
    modalRef.afterClosed().subscribe(respuestas =>{
      if(respuestas.id==EMPTY){
        console.log("si es null");
        return;
      }
   this.service.editar(respuestas).subscribe(editar =>{
    Swal.fire('ACTUALIZAR',`Folio ${respuestas.referencia} Actualizado`,'success');
  });
    }
      
      );
   }

}
