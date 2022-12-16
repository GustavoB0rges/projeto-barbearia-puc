import { Administrador, administradorRequest } from './administrador.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  baseUrl = "https://api-projeto-barbearia-production-b4d1.up.railway.app"

  constructor(private snackBar: MatSnackBar ,private http: HttpClient) { }

  showMessage(msg: string): void{
    this.snackBar.open(msg , 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

  create(administrador:any): Observable<any>{
    return this.http.post<any>(`${ this.baseUrl }/administradores`, administrador);
  }

  read(): Observable<any>{
    return this.http.get<any>(`${ this.baseUrl }/administradores`)
  }

  readByid(id: number): Observable<any>{
    const url = `${this.baseUrl}/administradores/${id}`
    return this.http.get<any>(url)

  }

  update(administrador:any, id): Observable<any> {
    const url = `${this.baseUrl}/administradores/${id}`
    return this.http.put<any>(url , administrador)
  }

  delete(id: number): Observable<any>{
    const url = `${this.baseUrl}/administradores/${id}`
    return this.http.delete<any>(url)
  }
}
