import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Funcionario } from '../funcionarios.model';
import { FuncionarioService } from '../funcionarios.service';


@Component({
  selector: 'app-funcionarios-index',
  templateUrl: './funcionarios-index.component.html',
  styleUrls: ['./funcionarios-index.component.scss']
})
export class FuncionarioIndexComponent implements OnInit {

  @ViewChild('inputSearch', { static: false }) inputSearch: ElementRef;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  operation: string;
  funcionario = new MatTableDataSource<any>();
  // dataSource = new MatTableDataSource<funcionario>(null);
  displayedColumns = ['id', 'nome', 'email', 'telefone', 'dataNasc', 'actions'];
  name: string;
  searchText: string;
  inputOpen = false;

  constructor(
    private funcionarioService: FuncionarioService, 
    private router: Router,) { }

  sideBarOpen = true;

  ngOnInit(): void {
   this.getFuncionario();
  }
  
  getFuncionario(): void {
    this.funcionarioService.read().subscribe(funcionario => {
      this.funcionario = funcionario;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.funcionario.filter = filterValue;
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  editar(value): void {
    this.operation = 'edit';
    this.router.navigate([`/auth/funcionarios/${value.id}/${this.operation}`], { queryParams: { operation: this.operation }})
  }

  navigateToFuncionarioCreate(): void {
    this.operation = 'new';
    this.router.navigate([`/auth/funcionarios/${this.operation}`], { queryParams: { operation: this.operation }})
  }

  deletaFuncionarios(row: any): void {
    const id = row.id;
    this.funcionarioService.delete(id).subscribe(() => {
      this.funcionarioService.showMessage("funcionario excluido com sucesso!");
      this.ngOnInit();
    });
  }
  

  onClickRow(row: any) : void {
    this.operation = 'view';
    this.router.navigate([`/auth/funcionarios/${row.id}/${this.operation}`],{ queryParams: { operation: this.operation }});
  }


}
