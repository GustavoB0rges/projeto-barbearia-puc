import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AgendamentoService } from '../agendamento.service';

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.scss']
})
export class DialogContentComponent implements OnInit {

  @ViewChild('inputTime', { static: false }) inputTime: ElementRef;

  operation: 'view' | 'new' | 'edit' = 'new';
  @Input() showEdit: boolean =  true;
  
  @Output() save = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() cancel = new EventEmitter();
  
  form: FormGroup;
  data: any = {};
  funcionario: [] = [];
  servico: [] = [];
  title: string;

  constructor(
    private _dialog: MatDialogRef<DialogContentComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private agendamentoService: AgendamentoService,
  ) {
    if (data) {
      this.data = data.data;
      this.operation = data.operation;
    }
    this.createForm();
  }

  ngOnInit(): void {
    this.getFuncionario();
    this.getServicos();
  }

  async getFuncionario(): Promise<void> {
    this.agendamentoService.readFuncionarios().subscribe(funcionario => {
      this.funcionario = funcionario.map(element => element);
    });
  }

  async getServicos(): Promise<void> {
    this.agendamentoService.readServicos().subscribe(servico => {
      this.servico = servico.map(element => element);
    });
  }

  onSelectChangeFuncionario(event): void {
    const selectedRow = event.value;
    this.form?.get('funcionario').setValue(selectedRow.pessoa.nome);
  }

  onSelectChangeServico(event): void {
    const selectedRow = event.value;
    this.form?.get('tipo').setValue(selectedRow.descricao);
  }

  createForm(): void {
    this.form = new FormGroup({
      nome: new FormControl(null),
      tipo: new FormControl(null),
      funcionario: new FormControl(null),
      status: new FormControl({ value: null, disabled: true }),
      dt_ini: new FormControl(null),
      dt_ini_hr: new FormControl(null),
      dt_fim: new FormControl(null),
      dt_fim_hr: new FormControl(null),
    });
  }

  salvar(): void { 
    this.form.get('nome').setValue(this.form.get('nome').value)
    this.form.get('tipo').setValue(this.form.get('tipo').value)
    this.form.get('status').setValue(this.form.get('status').value)
    this.form.get('dt_ini').setValue(this.form.get('dt_ini').value)
    this.form.get('dt_ini_hr').setValue(this.form.get('dt_ini').value)
    this.form.get('dt_fim').setValue(this.form.get('dt_fim').value)
    this.form.get('dt_fim_hr').setValue(this.form.get('dt_fim').value)
    this._dialog.close(this.form.getRawValue());
    this.save.emit();
  }
  editar(): void { 
    this.operation = 'edit';
    this.edit.emit();
  }

  cancelarAgendamento(): void { 
    this.edit.emit();
  }

  deletar(): void { 
    this.delete.emit();
  }

  cancelar(): void { 
    this._dialog.close();
  }

}
