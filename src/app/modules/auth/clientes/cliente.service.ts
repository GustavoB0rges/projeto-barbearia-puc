import { Cliente, clientRequest } from './cliente.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  baseUrl = "https://api-projeto-barbearia.herokuapp.com"

  constructor(private snackBar: MatSnackBar ,private http: HttpClient) { }

  showMessage(msg: string): void{
    this.snackBar.open(msg , 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

  create(cliente:any): Observable<any>{
    return this.http.post<any>(`${ this.baseUrl }/clientes`, cliente);
  }

  read(): Observable<any>{
    return this.http.get<any>(`${ this.baseUrl }/clientes`)
  }

  readByid(id: number): Observable<any>{
    const url = `${this.baseUrl}/clientes/${id}`
    return this.http.get<any>(url)

  }

  update(cliente:any, id): Observable<any> {
    const url = `${this.baseUrl}/clientes/${id}`
    return this.http.put<any>(url , cliente)
  }

  delete(id: number): Observable<any>{
    const url = `${this.baseUrl}/clientes/${id}`
    return this.http.delete<any>(url)
  }
}
