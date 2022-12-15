import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/modules/auth/clientes/cliente.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})


export class RegisterComponent implements OnInit {
  form: FormGroup;
  hide = true;

  constructor(
    private router: Router,
    private clienteService: ClienteService,
    private toastr: ToastrService
  ) 
    {
    this.form = new FormGroup({
      id: new FormControl(null),
      nome: new FormControl(null, [Validators.required, Validators.maxLength(120)]),
      dt_nasc: new FormControl(null, [Validators.required]),
      senha: new FormControl(null, [Validators.required, Validators.minLength(4),]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9.%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
      ]),
      telefone: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {

  }

  onSave(): void {
    const payload = {
      pessoa: {
        nome: this.form.get('nome').value,
        dataNasc: this.form.get('dt_nasc').value,
        email: this.form.get('email').value,
        telefone: this.form.get('telefone').value,
        senha: this.form.get('senha').value,
        tipoUsuario: {
          id: 1
        },
      }
    }

    this.clienteService.create(payload).subscribe(
      {
        next: (data) => {
          if (data) {
            this.toastr.success('Sucesso!', 'Cadastrado realizado com sucesso!');
            this.router.navigate(['**']);
          }
        },
        error: (error) => {
          this.toastr.error(
            error.error.error
          );
        }
      }
    );
  }

  cancel(): void {
    this.router.navigate(['**']);
  }

  navigate() {
    this.router.navigate(['/auth/agendamentos'])
  }


}
