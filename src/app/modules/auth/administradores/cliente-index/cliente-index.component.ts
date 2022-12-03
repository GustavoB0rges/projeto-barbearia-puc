import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Cliente } from '../cliente.model';
import { ClienteService } from '../cliente.service';


@Component({
  selector: 'app-funcionarios-index',
  templateUrl: './cliente-index.component.html',
  styleUrls: ['./cliente-index.component.scss']
})
export class ClienteIndexComponent implements OnInit {

  @ViewChild('inputSearch', { static: false }) inputSearch: ElementRef;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  operation: string;
  cliente = new MatTableDataSource<any>();
  // dataSource = new MatTableDataSource<Cliente>(null);
  displayedColumns = ['id', 'nome', 'email', 'telefone', 'dataNasc', 'actions'];
  name: string;
  searchText: string;
  inputOpen = false;

  constructor(
    private clienteService: ClienteService, 
    private router: Router,) { }

  sideBarOpen = true;

  ngOnInit(): void {
   this.getClient();
  }
  
  getClient(): void {
    this.clienteService.read().subscribe(cliente => {
      this.cliente = cliente;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.cliente.filter = filterValue;
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  editar(value): void {
    this.operation = 'edit';
    this.router.navigate([`/auth/clientes/${value.id}/${this.operation}`], { queryParams: { operation: this.operation }})
  }

  navigateToClienteCreate(): void {
    this.operation = 'new';
    this.router.navigate([`/auth/clientes/${this.operation}`], { queryParams: { operation: this.operation }})
  }

  deletaClientes(row: any): void {
    const id = row.id;
    this.clienteService.delete(id).subscribe(() => {
      this.clienteService.showMessage("Cliente excluido com sucesso!");
      this.ngOnInit();
    });
  }
  

  onClickRow(row: any) : void {
    this.operation = 'view';
    this.router.navigate([`/auth/clientes/${row.id}/${this.operation}`],{ queryParams: { operation: this.operation }});
  }


}
