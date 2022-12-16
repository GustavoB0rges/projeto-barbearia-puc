import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { AgendamentoService } from '../agendamento.service';

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.scss']
})
export class DialogContentComponent implements OnInit {

  @ViewChild('inputTime', { static: false }) inputTime: ElementRef;
  operation: 'view' | 'new' | 'edit' = 'new';
  showEdit: boolean =  true;
  
  form: FormGroup;
  data: any = {};
  funcionario: any[] = [];
  servico: any[] = [];
  title: string = 'Visualizando';
  minDate = new Date();

  constructor(
    private _dialog: MatDialogRef<DialogContentComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private agendamentoService: AgendamentoService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.operation = data.operation;
    if (data.operation === 'new') {
      this.title = 'Adicionando';
    }
    if (data) {
      this.data = data.data;
    } 
    console.log(data);
    
    this.createForm();
  }

  ngOnInit(): void {
    this.getFuncionario();
    this.getServicos();
    this.getOne();

    if (this.operation === 'new') {
      this.form.enable();
      this.form.get('dt_fim').disable();
      this.form.get('status').disable();
    }

    this.form.get('dt_ini').valueChanges.subscribe(element => {
      this.form.get('dt_fim').setValue(element)
    })
  }
  

  async getFuncionario(): Promise<void> {
    this.agendamentoService.readFuncionarios().subscribe(funcionario => {
      this.funcionario = funcionario.map(element => element);
    });
  }

  getOne() {
    this.form.disable();
    const id = this.data?.id;
    if (id) {
      this.agendamentoService.readByid(id).subscribe(response => {
        console.log(response);
        
        this.form.get('nome').setValue(response.nome_cliente)
        this.form.get('dt_ini').setValue(moment(response.dt_ini).format('YYYY-MM-DD'));
        this.form.get('dt_ini_hr').setValue(moment(response.dt_ini).format('HH:mm:ss'));
        this.form.get('dt_fim').setValue(moment(response.dt_fim).format('YYYY-MM-DD'));
        this.form.get('dt_fim_hr').setValue(moment(response.dt_fim).format('HH:mm:ss'));
        this.form.get('status').setValue(response.status);
        this.form.get('funcionario').setValue(response.funcionario.id);
        this.form.get('servico').setValue(response.servico.id);
        this.servico = [{ id: response.servico.id, descricao: response.servico.descricao, valor: response.servico.valor }];
        this.funcionario = [{ id: response.funcionario.id, pessoa: { nome: response.funcionario.pessoa.nome} }];
        this.getFuncionario();
        this.getServicos();
      });
    }
  }

  createForm(): void {
    this.form = new FormGroup({
      nome: new FormControl(null, Validators.required),
      funcionario: new FormControl(null, Validators.required),
      servico: new FormControl(null, Validators.required),
      status: new FormControl({ value: null, disabled: true }),
      dt_ini: new FormControl(null, Validators.required),
      dt_ini_hr: new FormControl(null, Validators.required),
      dt_fim: new FormControl({ value: null, disabled: true }, Validators.required),
      dt_fim_hr: new FormControl(null, Validators.required),
      in_id_servico: new FormControl(null),
      in_id_funcionario: new FormControl(null),
    });
  }

  async getServicos(): Promise<void> {
    this.agendamentoService.readServicos().subscribe(servico => {
      this.servico = servico.map(element => element);
    });
  }

  onSelectChangeFuncionario(event): void {
    const selectedRow = event.value;
    this.form?.get('in_id_funcionario').setValue(selectedRow?.id);
    console.log(this.form?.get('in_id_funcionario').value);
    
  }

  onSelectChangeServico(event): void {
    const selectedRow = event.value;
    this.form?.get('in_id_servico').setValue(selectedRow?.id);
    console.log(this.form?.get('in_id_servico').value);
  }

  salvar(): void { 
    this.form.get('dt_ini').setValue(moment(this.form.get('dt_ini').value).format('YYYY-MM-DD'));
    this.form.get('dt_ini_hr').setValue(this.form.get('dt_ini_hr').value)
    this.form.get('dt_fim').setValue(moment(this.form.get('dt_ini').value).format('YYYY-MM-DD'));
    this.form.get('dt_fim_hr').setValue(this.form.get('dt_fim_hr').value)
    

    const start = moment
    .utc(this.form.get('dt_ini').value + ' ' + this.form.get('dt_ini_hr').value)
    .format('YYYY-MM-DD[T]HH:mm:ss');

    const end = moment
    .utc(this.form.get('dt_fim').value + ' ' + this.form.get('dt_fim_hr').value)
    .format('YYYY-MM-DD[T]HH:mm:ss');

    console.log(this.servico);
    console.log(this.funcionario);
    

    if (this.operation === 'new') {
      const payload = {
        nome_cliente: this.form.get('nome').value,
        servico: {
          id: this.form?.get('in_id_servico').value
        },
        funcionario: {
          id: this.form?.get('in_id_funcionario').value
        },
        dt_ini: start,
        dt_fim: end,
        status: 'Agendado',
        valor: null,
        histServicos: null,
      }
      this.agendamentoService.create(payload).subscribe(
        {
          next: (data) => {
            if (data) {
              this.toastr.success('Sucesso!', 'Agendamento cadastrado!');
              this._dialog.close();
            }
          },
          error: (error) => {
            this.toastr.error(error.error.error);
          }
        }
      ); 
    } else {
      const id = this.data.id;
      const payload = {
        in_id: id,
        nome_cliente: this.form.get('nome').value,
        servico: {
          id: this.form?.get('in_id_servico').value
        },
        funcionario: {
          id: this.form?.get('in_id_funcionario').value
        },
        dt_ini: start,
        dt_fim: end,
        status: 'Agendado',
        valor: null,
        histServicos: null,
      }
      
      this.agendamentoService.update(payload, id).subscribe(
        {
          next: (data) => {
            if (data) {
              this.toastr.success('Sucesso', 'Agendamento atualizado!')
              this._dialog.close();
            }
          },
          error: (error) => {
            this.toastr.error(error.error.error)
          }
        }
      )
    }
  }
  editar(): void { 
    this.title = 'Editando';
    this.showEdit = false;
    this.data.operation = 'edit';
    this.operation = 'edit';
    console.log(this.data);
    
    this.form.enable();
    this.form.get('dt_fim').disable();
    this.form.get('status').disable();
  }

  cancelarAgendamento(): void { 
    const id = this.data.id;
    this.agendamentoService.delete(id).subscribe(() => {
      this.toastr.success('Sucesso', 'Agendamento cancelado!');
      this._dialog.close()
    });
  }

  deletar(): void { 
  }

  cancelar(): void { 
    this._dialog.close();
  }

}
