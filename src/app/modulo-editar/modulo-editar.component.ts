import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Factura } from '../models/factura';

@Component({
  selector: 'app-modulo-editar',
  templateUrl: './modulo-editar.component.html',
  styleUrls: ['./modulo-editar.component.css']
})
export class ModuloEditarComponent implements OnInit {

   factura : Factura;
 respuestas='no no no no';
  constructor(@Inject(MAT_DIALOG_DATA) public data : any,
  public modalRef : MatDialogRef<ModuloEditarComponent>) { }

  ngOnInit(  ): void {
    this.factura = this.data.factura as Factura;
    console.log(this.factura);
  }

  cancelar():void{
    this.modalRef.close();
  }

}
