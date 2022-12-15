import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Pessoa } from '../../../models/pessoa';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  API_BASE_URL: string = "http://localhost:3000";

  private currentPessoaSubject: BehaviorSubject<Pessoa>;
  public currentPessoa: Observable<Pessoa>;

  constructor(private http: HttpClient) {
    this.currentPessoaSubject = new BehaviorSubject<Pessoa>(JSON.parse(localStorage.getItem('currentPessoa')));
    this.currentPessoa = this.currentPessoaSubject.asObservable();
  }
  public get currentPessoaValue(): Pessoa {
    return this.currentPessoaSubject.value;
  }

  login(email: string, senha: string): Observable<any> {
    return this.http.post<any>(`${ this.API_BASE_URL }/login`, { email, senha }).pipe(map((result: any) => {
      const nome = result.data.nome
      const email = result.data.email
      localStorage.setItem('nome', nome)
      localStorage.setItem('email', email)
      return result
    }));
    
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentPessoaSubject.next(null);
  }
}
