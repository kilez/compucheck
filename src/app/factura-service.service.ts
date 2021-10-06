import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Factura } from './models/factura';


@Injectable({
  providedIn: 'root'
})
export class FacturaServiceService {
    
  constructor(private http : HttpClient) { }

//  private baseEndPoint = 'http://localhost:8091/api';
//private baseEndPoint = 'http://localhost:8080';
private baseEndPoint ='https://compuchecked.herokuapp.com';
  private cabeceras :  HttpHeaders = new HttpHeaders();

  public listar():Observable<Factura[]>{
    return this.http.get<Factura[]>(this.baseEndPoint);
  }

  public max():Observable<Factura>{
    return this.http.get<Factura>(this.baseEndPoint+"/max");
  }

  public listarPaginas( page : string,size : string) : Observable<Factura>{
    const params = new HttpParams()
    .set('page',page)
    .set('size',size);
   return this.http.get<Factura>(`${this.baseEndPoint}/pagina`, {params : params});
  }

public crear(factura:Factura):Observable<Factura>{
  return this.http.post<Factura>(`${this.baseEndPoint}`,factura, {headers:this.cabeceras});
}


   public eliminar( id:number):Observable<void>{
 return this.http.delete<void>(`${this.baseEndPoint}/${id}`);
  }
  
  public ver(id:number):Observable<Factura>{
return this.http.get<Factura>(`${this.baseEndPoint}/${id}`);
  }

  public filtro(referencia:String):Observable<Factura[]>{
    return this.http.get<Factura[]>(`${this.baseEndPoint}/filtro/${referencia}`);
      }
  
  public editar(factura:Factura):Observable<Factura>{
    return this.http.put<Factura>(`${this.baseEndPoint}/${factura.id}`,factura,
    {headers:this.cabeceras}   );
  }

  
}
