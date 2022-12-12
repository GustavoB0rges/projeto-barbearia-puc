import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.scss']
})
export class DialogContentComponent implements OnInit {

  @Input() operation: 'view' | 'new' | 'edit' = 'new';
  @Input() showEdit: boolean =  true;
  
  @Output() save = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() cancel = new EventEmitter();
  
  form: FormGroup;
  data: any = {};

  constructor(
    private _dialog: MatDialogRef<DialogContentComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private _formBuilder: FormBuilder,
  ) {
    if (data) {
      this.data = data.data;
      this.operation = data.operation;
    }
    this.createForm();
  }

  ngOnInit(): void {

  }

  createForm(): void {
    this.form = this._formBuilder.group({
      nome: [null],
      tipo: [null],
    });
  }

  salvar(): void { 
    this.form.get('nome').setValue(this.form.get('nome').value)
    this._dialog.close(this.form.getRawValue());
    this.save.emit();
  }
  editar(): void { 
    this.edit.emit();
  }

  deletar(): void { 
    this.delete.emit();
  }

  cancelar(): void { 
    this.cancel.emit();
  }

}
