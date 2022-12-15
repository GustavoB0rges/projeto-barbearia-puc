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

  readServicos(): Observable<any>{
    return this.http.get<any>(`${ this.baseUrl }/servicos`)
  }

  readFuncionarios(): Observable<any>{
    return this.http.get<any>(`${ this.baseUrl }/funcionarios`)
  }
}
