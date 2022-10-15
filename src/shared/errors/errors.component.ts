import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.scss']
})
export class ErrorsComponent implements OnInit {

  @Input() formGroup: any;
  @Input() formcontrolname: any;

  control: any;

  constructor() { }

  ngOnInit(): void {
    this.formGroup.get(this.formcontrolname);
  }

  getErrorMessage(): string {
    const control = this.formGroup.get(this.formcontrolname);
    return control.hasError('required') ? 'Dados obrigatórios não informados' :
      control.hasError('passwordsNotMatching') ? 'Senhas não são iguais' :
      control.hasError('email') ? 'Email inválido' :
      control.hasError('maxlength') ? 'Número de caracteres ultrapassados' :
      control.hasError('minlength') ? 'Número de caracteres não atingido' :
      control.hasError('max') ? 'Valor maior que o permitido' :
      control.hasError('min') ? 'Valor menor que o permitido' :
      control.hasError('pattern') ? 'Campo inválido' :
      control.hasError('invalid') ? 'Campo inválido' :
      control.hasError('cnpj') ? 'CNPJ inválido' :
      control.hasError('cpf') ? 'CPF inválido' :
      control.hasError('blank') ? 'Existe um espaço no ínicio do campo' :
      control.hasError('requiredFileType') ? 'Arquivo inválido' :
      control.hasError('birthDate') ? 'Data de Nascimento deve ser igual ou maior que 18' :
      'Campo inválido';
  }
}
