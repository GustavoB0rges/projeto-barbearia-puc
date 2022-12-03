import { Servico, servicoRequest } from './servicos.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ServicoService {

  baseUrl = "http://localhost:3000"

  constructor(private snackBar: MatSnackBar ,private http: HttpClient) { }

  showMessage(msg: string): void{
    this.snackBar.open(msg , 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }
  

  create(servico:any): Observable<any>{
    return this.http.post<any>(`${ this.baseUrl }/servicos`, servico);
  }

  read(): Observable<any>{
    return this.http.get<any>(`${ this.baseUrl }/servicos`)
  }

  readByid(id: number): Observable<any>{
    const url = `${this.baseUrl}/servicos/${id}`
    return this.http.get<any>(url)

  }

  update(servico:any, id): Observable<any> {
    const url = `${this.baseUrl}/servicos/${id}`
    return this.http.put<any>(url , servico)
  }

  delete(id: number): Observable<any>{
    const url = `${this.baseUrl}/servicos/${id}`
    return this.http.delete<any>(url)
  }
}
