import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  baseUrl = "https://api-projeto-barbearia-production-a8b0.up.railway.app"

  constructor(private snackBar: MatSnackBar ,private http: HttpClient) { }

  showMessage(msg: string): void{
    this.snackBar.open(msg , 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

  create(cliente:any): Observable<any>{
    return this.http.post<any>(`${ this.baseUrl }/funcionarios`, cliente);
  }

  read(): Observable<any>{
    return this.http.get<any>(`${ this.baseUrl }/funcionarios`)
  }

  readByid(id: number): Observable<any>{
    const url = `${this.baseUrl}/funcionarios/${id}`
    return this.http.get<any>(url)

  }

  update(cliente:any, id): Observable<any> {
    const url = `${this.baseUrl}/funcionarios/${id}`
    return this.http.put<any>(url , cliente)
  }

  delete(id: number): Observable<any>{
    const url = `${this.baseUrl}/funcionarios/${id}`
    return this.http.delete<any>(url)
  }
}
