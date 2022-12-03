import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ServicoService } from '../servicos.service';


@Component({
  selector: 'app-funcionarios-index',
  templateUrl: './servicos-index.component.html',
  styleUrls: ['./servicos-index.component.scss']
})
export class FuncionarioIndexComponent implements OnInit {

  @ViewChild('inputSearch', { static: false }) inputSearch: ElementRef;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  operation: string;
  servico = new MatTableDataSource<any>();
  // dataSource = new MatTableDataSource<Servico>(null);
  displayedColumns = ['id', 'nome', 'email', 'telefone', 'dataNasc', 'actions'];
  name: string;
  searchText: string;
  inputOpen = false;

  constructor(
    private servicoService: ServicoService, 
    private router: Router,) { }

  sideBarOpen = true;

  ngOnInit(): void {
   this.getClient();
  }
  
  getClient(): void {
    this.servicoService.read().subscribe(servico => {
      this.servico = servico;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.servico.filter = filterValue;
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  editar(value): void {
    this.operation = 'edit';
    this.router.navigate([`/auth/servicos/${value.id}/${this.operation}`], { queryParams: { operation: this.operation }})
  }

  navigateToServicoCreate(): void {
    this.operation = 'new';
    this.router.navigate([`/auth/servicos/${this.operation}`], { queryParams: { operation: this.operation }})
  }

  deletaServicos(row: any): void {
    const id = row.id;
    this.servicoService.delete(id).subscribe(() => {
      this.servicoService.showMessage("Servico excluido com sucesso!");
      this.ngOnInit();
    });
  }
  

  onClickRow(row: any) : void {
    this.operation = 'view';
    this.router.navigate([`/auth/servicos/${row.id}/${this.operation}`],{ queryParams: { operation: this.operation }});
  }


}
