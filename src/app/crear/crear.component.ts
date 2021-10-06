import { Component, OnInit } from '@angular/core';
import { FacturaServiceService } from '../factura-service.service';
import { Factura } from '../models/factura';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {

  facturas: Factura[];
  factura: Factura = new Factura();
  facturaN: Factura = new Factura();
  mes: string;
  anio : string;
  secuencia : number;
  folio : string;
  month : string;

  constructor(public service: FacturaServiceService,
                       private router: Router,) { }


  ngOnInit(): void {
    this.service.listar().subscribe(
      facturas => {
        this.facturas = facturas;
        //this.factura.secuencia=1;
        //console.log( facturas.length)
        // this.factura = facturas[facturas.length - 1];
        
        if(this.facturas.length === 0)  {
          this.factura.secuencia=1;
        }else{
          this.factura = facturas[facturas.length - 1];
        }
        
        
        this.month=this.factura.referencia.substring(2,3);
        this.factura.referencia =this.fecha();
        
        if(this.month != this.factura.referencia.substring(2,3)){
          this.factura.secuencia=this.factura.secuencia =1;
        }else{
          
          this.factura.secuencia=this.factura.secuencia + 1;
          

        }   

        this.factura.referencia = this.factura.referencia + this.factura.secuencia;
        this.factura.fecha =formatDate(new Date(), 'yyyy/MM/dd', 'en');
      }
    );



  }


  fecha(): string {
    const currentDate = formatDate(new Date(), 'yyyy/MM/dd', 'en');
    this.mes = currentDate.substring(5, 7);
    this.anio = currentDate.substring(2,4);
    
    switch (this.mes) {
      case '01':
        this.mes = 'A';
        break;
      case '2':
        this.mes = 'B';
        break;
      case '03':
        this.mes = 'C';
        break;
      case '04':
        this.mes = 'D';
        break;
      case '05':
        this.mes = 'E';
        break;
      case '06':
        this.mes = 'F';
        break;
      case '07':
        this.mes = 'G';
        break;
      case '08':
        this.mes = 'H';
        break;
      case '09':
        this.mes = 'I';
        break;
      case '10':
        this.mes = 'J';
        break;
      case '11':
        this.mes = 'K';
        break;
      case '12':
        this.mes = 'L';
        break;

    }
    
     return this.folio=this.anio+this.mes;

  }

  crear(){
    const currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.facturaN.referencia = this.factura.referencia;
    this.facturaN.secuencia = this.factura.secuencia;
    this.facturaN.fecha = ""+currentDate;
    console.log(this.facturaN);
    this.service.crear(this.facturaN).subscribe(factura =>{
      Swal.fire('Creado',`Se creo el Folio ${this.facturaN.referencia}`,'success')
      this.router.navigate(['/lista']);

    });
  }

}
