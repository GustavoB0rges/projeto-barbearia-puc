import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  private messageSource = new BehaviorSubject<string>("aa");
  changeVar = this.messageSource.asObservable();

  constructor() { }

  changeMyVar (message: string) {
    this.messageSource.next(message)
  }
}
