import { ClienteService } from '../cliente.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Subject, takeUntil } from 'rxjs';
import * as moment from 'moment';
@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss']
})
export class ClienteFormComponent implements OnInit {

  title: any = null;
  form: FormGroup;
  operation: 'view' | 'new' | 'edit' = 'new';
  destroy$ = new Subject();
  hide = true;

  constructor(private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute,) {

    this.form = new FormGroup({
      id: new FormControl(null),
      id_pessoa: new FormControl(null),
      id_endereco: new FormControl(null),
      nome: new FormControl(null, [Validators.required, Validators.maxLength(120)]),
      cpf: new FormControl(null),
      dt_nasc: new FormControl(null),
      senha: new FormControl(null, [Validators.required, Validators.minLength(4),]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9.%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
      ]),
      telefone: new FormControl(null),
      celular: new FormControl(null),
      cep: new FormControl(null, [Validators.pattern('^[0-9]*$')]),
      estado: new FormControl(null),
      cidade: new FormControl(null),
      bairro: new FormControl(null),
      rua: new FormControl(null),
      numero: new FormControl(null, [Validators.required, Validators.maxLength(4),]),
      complemento: new FormControl(null),
    });
  }

  ngOnInit(): void {


    this.activatedRoute.queryParams
    .subscribe(params => {
      this.operation = params['operation'];
    }
  );

    const id: any = this.activatedRoute.snapshot.paramMap.get('id');
    const operation: any = this.activatedRoute.snapshot;
    console.log('operation param',operation);
    
    if (id) {
      this.clienteService.readByid(id).subscribe(response => {
        this.form.get('id').setValue(response?.id)
        this.form.get('id_pessoa').setValue(response?.pessoa.id)
        this.form.get('nome').setValue(response.pessoa.nome)
        this.form.get('dt_nasc').setValue(new Date(response.pessoa.dataNasc))
        this.form.get('cpf').setValue(response.pessoa.cpf)
        this.form.get('email').setValue(response.pessoa.email)
        this.form.get('telefone').setValue(response.pessoa.telefone)
        this.form.get('celular').setValue(response.pessoa.celular)
        this.form.get('senha').setValue(response.pessoa.senha)
        this.form.get('id_endereco').setValue(response?.endereco?.id)
        this.form.get('cep').setValue(response.pessoa.endereco.cep)
        this.form.get('rua').setValue(response.pessoa.endereco.rua)
        this.form.get('numero').setValue(response.pessoa.endereco.num)
        this.form.get('bairro').setValue(response.pessoa.endereco.bairro)
        this.form.get('cidade').setValue(response.pessoa.endereco.cidade)
        this.form.get('complemento').setValue(response.pessoa.endereco.complemento)
        this.form.get('estado').setValue(response.pessoa.endereco.estado)
      });
      if (this.operation === 'view') {
        this.title = 'Visualizando';
        this.form.disable();
      } else {
        this.title = 'Editando';
        this.form.enable();
      }
    } else {
      this.title = 'Adicionando';
      this.operation = 'new';
    }
    this.form.get('id').disable();
  }

  saveCliente(): void {
    if (this.operation === 'new') {
      this.createCliente();
    } else {
      this.updateCliente();
    }
  }

  createCliente(): void {
    const payload = {
      pessoa: {
        nome: this.form.get('nome').value,
        cpf: this.form.get('cpf').value,
        dataNasc: moment(this.form.get('dt_nasc').value).utc().format('DD-MM-YYYY'),
        email: this.form.get('email').value,
        telefone: this.form.get('telefone').value,
        celular: this.form.get('celular').value,
        senha: this.form.get('senha').value,
        tipoUsuario: {
          id: 1
        },
        endereco: {
          cep: this.form.get('cep').value,
          rua: this.form.get('rua').value,
          num: this.form.get('numero').value,
          bairro: this.form.get('bairro').value,
          cidade: this.form.get('cidade').value,
          complemento: this.form.get('complemento').value,
          estado: this.form.get('estado').value
        }
      }
    }

    this.clienteService.create(payload).subscribe(
      {
        next: (data) => {
          if (data) {
            Swal.fire('Sucesso!', 'Cliente cadastrado', 'success');
            this.router.navigate(['/auth/clientes/index']);
          }
        },
        error: (error) => {
          Swal.fire(
            "Erro!!",
            error.error.message,
            "error"
          );
        }
      }
    );
  }

  updateCliente(): void {
    const payload = {
      id: this.activatedRoute.snapshot.paramMap.get('id'),
      pessoa: {
        nome: this.form.get('nome').value,
        cpf: this.form.get('cpf').value,
        dataNasc: moment(this.form.get('dt_nasc').value).utc().format('DD-MM-YYYY'),
        email: this.form.get('email').value,
        telefone: this.form.get('telefone').value,
        celular: this.form.get('celular').value,
        senha: this.form.get('senha').value,
        tipoUsuario: {
          id: 1
        },
        endereco: {
          cep: this.form.get('cep').value,
          rua: this.form.get('rua').value,
          num: this.form.get('numero').value,
          bairro: this.form.get('bairro').value,
          cidade: this.form.get('cidade').value,
          complemento: this.form.get('complemento').value,
          estado: this.form.get('estado').value
        }
      }
    }

    this.clienteService.update(payload, this.form.get('id').value).subscribe(() => {
      this.clienteService.showMessage('Produto atualizado!');
      this.router.navigate(['/auth/clientes/index']);
    })
  }

  cancel(): void {
    this.router.navigate(['/auth/clientes/index']);
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }
}
