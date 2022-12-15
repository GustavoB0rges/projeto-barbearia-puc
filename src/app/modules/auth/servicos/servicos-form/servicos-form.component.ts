import { ServicoService } from '../servicos.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Subject, takeUntil } from 'rxjs';
import * as moment from 'moment';
@Component({
  selector: 'app-servicos-form',
  templateUrl: './servicos-form.component.html',
  styleUrls: ['./servicos-form.component.scss']
})
export class ServicoFormComponent implements OnInit {

  title: any = null;
  form: FormGroup;
  operation: 'view' | 'new' | 'edit' = 'new';
  destroy$ = new Subject();
  hide = true;
  showEdit: boolean =  true;

  constructor(private servicoService: ServicoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,) {

    this.form = new FormGroup({
      id: new FormControl(null),
      descricao: new FormControl(null, [Validators.required, Validators.maxLength(120)]),
      valor: new FormControl(null),
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
      this.servicoService.readByid(id).subscribe(response => {
        this.form.get('id').setValue(response?.id)
        this.form.get('descricao').setValue(response.descricao)
        this.form.get('valor').setValue(response.valor)
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

  saveServico(): void {
    if (this.operation === 'new') {
      this.createServico();
    } else {
      this.updateServico();
    }
  }

  createServico(): void {
    const payload = this.form.getRawValue();
    delete payload.in_id;

    this.servicoService.create(payload).subscribe(
      {
        next: (data) => {
          if (data) {
            Swal.fire('Sucesso!', 'Servico cadastrado', 'success');
            this.router.navigate(['/auth/servicos/index']);
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

  updateServico(): void {
    const payload = {
      id: this.activatedRoute.snapshot.paramMap.get('id'),
      ...this.form.getRawValue()
    }

    this.servicoService.update(payload, this.form.get('id').value).subscribe(
      {
        next: (data) => {
          if (data) {
            Swal.fire('Sucesso!', 'Servico atualizado!', 'success');
            this.router.navigate(['/auth/servicos/index']);
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

  deletaServico(): void {
    const id: any = this.activatedRoute.snapshot.paramMap.get('id');
    this.servicoService.delete(id).subscribe(() => {
      this.servicoService.showMessage("Servico excluido com sucesso!");
      this.router.navigate(['/auth/servicos/index']);
    });
  }

  cancel(): void {
    this.router.navigate(['/auth/servicos/index']);
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }
}
