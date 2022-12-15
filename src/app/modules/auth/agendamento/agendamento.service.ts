import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  baseUrl = "http://localhost:3000"

  private messageSource = new BehaviorSubject<string>("aa");
  changeVar = this.messageSource.asObservable();

  constructor(private snackBar: MatSnackBar ,private http: HttpClient) { }

  changeMyVar (message: string) {
    this.messageSource.next(message)
  }

  create(agendamento:any): Observable<any>{
    return this.http.post<any>(`${ this.baseUrl }/agendamentos`, agendamento);
  }

  read(): Observable<any>{
    return this.http.get<any>(`${ this.baseUrl }/agendamentos`)
  }

  readByid(id: number): Observable<any>{
    const url = `${this.baseUrl}/agendamentos/${id}`
    return this.http.get<any>(url)

  }

  update(agendamento:any, id): Observable<any> {
    const url = `${this.baseUrl}/agendamentos/${id}`
    return this.http.put<any>(url , agendamento)
  }

  delete(id: number): Observable<any>{
    const url = `${this.baseUrl}/agendamentos/${id}`
    return this.http.delete<any>(url)
  }

  readServicos(): Observable<any>{
    return this.http.get<any>(`${ this.baseUrl }/servicos`)
  }

  readFuncionarios(): Observable<any>{
    return this.http.get<any>(`${ this.baseUrl }/funcionarios`)
  }
}
