import { AdministradorService } from '../administrador.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Subject, takeUntil } from 'rxjs';
import * as moment from 'moment';
@Component({
  selector: 'app-administrador-form',
  templateUrl: './administrador-form.component.html',
  styleUrls: ['./administrador-form.component.scss']
})
export class AdministradorFormComponent implements OnInit {

  title: any = null;
  form: FormGroup;
  operation: 'view' | 'new' | 'edit' = 'new';
  destroy$ = new Subject();
  hide = true;
  showEdit: boolean =  true;

  constructor(private administradorService: AdministradorService,
    private router: Router,
    private activatedRoute: ActivatedRoute,) {

    this.form = new FormGroup({
      id: new FormControl(null),
      id_pessoa: new FormControl(null),
      id_endereco: new FormControl(null),
      nome: new FormControl(null, [Validators.required, Validators.maxLength(120)]),
      cpf: new FormControl(null),
      dt_nasc: new FormControl(null, [Validators.required]),
      senha: new FormControl(null, [Validators.required, Validators.minLength(4),]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9.%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
      ]),
      telefone: new FormControl(null, [Validators.required]),
      celular: new FormControl(null),
      cep: new FormControl(null, [Validators.pattern('^[0-9]*$')]),
      estado: new FormControl(null),
      cidade: new FormControl(null),
      bairro: new FormControl(null),
      rua: new FormControl(null),
      numero: new FormControl(null, [Validators.maxLength(4),]),
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
    
    if (id) {
      this.administradorService.readByid(id).subscribe(response => {
        const horasAjustadas = moment(response.pessoa.dataNasc).add(1,'days').format('YYYY-MM-DD')
        
        this.form.get('id').setValue(response?.id)
        this.form.get('id_pessoa').setValue(response?.pessoa.id)
        this.form.get('nome').setValue(response.pessoa.nome)
        this.form.get('dt_nasc').setValue(horasAjustadas)
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
    }
    this.form.get('id').disable();
  }

  saveAdministrador(): void {
    if (this.operation === 'new') {
      this.createAdministrador();
    } else {
      this.updateAdministrador();
    }
  }

  createAdministrador(): void {
    const payload = {
      pessoa: {
        nome: this.form.get('nome').value,
        cpf: this.form.get('cpf').value,
        dataNasc: this.form.get('dt_nasc').value,
        email: this.form.get('email').value,
        telefone: this.form.get('telefone').value,
        celular: this.form.get('celular').value,
        senha: this.form.get('senha').value,
        tipoUsuario: {
          id: 2
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

    this.administradorService.create(payload).subscribe(
      {
        next: (data) => {
          if (data) {
            Swal.fire('Sucesso!', 'Administrador cadastrado', 'success');
            this.router.navigate(['/auth/administradores/index']);
          }
        },
        error: (error) => {
          Swal.fire(
            "Erro!!",
            error.error.error,
            "error"
          );
        }
      }
    );
  }

  onEdit(): void {
    this.showEdit = false;
    this.form.enable();
    this.operation = 'edit';
  }

  updateAdministrador(): void {
    const payload = {
      id: this.activatedRoute.snapshot.paramMap.get('id'),
      pessoa: {
        nome: this.form.get('nome').value,
        cpf: this.form.get('cpf').value,
        dataNasc: this.form.get('dt_nasc').value,
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

    this.administradorService.update(payload, this.form.get('id').value).subscribe(
      {
        next: (data) => {
          if (data) {
            Swal.fire('Sucesso!', 'Administrador atualizado!', 'success');
            this.router.navigate(['/auth/administradores/index']);
          }
        },
        error: (error) => {
          Swal.fire(
            "Erro!!",
            error.error.error,
            "error"
          );
        }
      }
    )
  }

  deletaAdministradors(): void {
    const id: any = this.activatedRoute.snapshot.paramMap.get('id');
    this.administradorService.delete(id).subscribe(() => {
      this.administradorService.showMessage("Administrador excluido com sucesso!");
      this.router.navigate(['/auth/administradores/index']);
    });
  }

  cancel(): void {
    this.router.navigate(['/auth/administradores/index']);
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }
}
