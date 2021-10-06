import { Component, OnInit, ViewChild } from '@angular/core';
import { Factura } from 'src/app/models/factura';
import { FacturaServiceService } from '../../factura-service.service';
import { map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  factura : Factura = new Factura();
  termino : string;
  data : Factura[] =[];


  constructor (public servicio : FacturaServiceService,
               private router : Router,) { }

  ngOnInit(): void {
  }


buscar(termino: string){
  if(termino.length <1 ){
    return;
  }

  this.router.navigate(['/busqueda',termino]);
  //this.termino = this.factura.referencia;
  //this.router.navigate(['/busqueda',this.termino]);
/*  
this.servicio.filtro(this.factura.referencia).subscribe(a =>{
  if(a.length < 1) {
   Swal.fire('Error',`La Factura ${this.factura.referencia} no existe`,'error');
       }
this.data= a;


//console.log(this.data,this.data.length);

} );
*/
}

}
