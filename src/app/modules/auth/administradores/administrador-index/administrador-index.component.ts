import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Administrador } from '../administrador.model';
import { AdministradorService } from '../administrador.service';


@Component({
  selector: 'app-funcionarios-index',
  templateUrl: './administrador-index.component.html',
  styleUrls: ['./administrador-index.component.scss']
})
export class AdministradorIndexComponent implements OnInit {

  @ViewChild('inputSearch', { static: false }) inputSearch: ElementRef;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  operation: string;
  administrador = new MatTableDataSource<any>();
  // dataSource = new MatTableDataSource<Administrador>(null);
  displayedColumns = ['id', 'nome', 'email', 'telefone', 'dataNasc', 'actions'];
  name: string;
  searchText: string;
  inputOpen = false;

  constructor(
    private administradorService: AdministradorService, 
    private router: Router,) { }

  sideBarOpen = true;

  ngOnInit(): void {
   this.getClient();
  }
  
  getClient(): void {
    this.administradorService.read().subscribe(administrador => {
      this.administrador = administrador;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.administrador.filter = filterValue;
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  editar(value): void {
    this.operation = 'edit';
    this.router.navigate([`/auth/administradores/${value.id}/${this.operation}`], { queryParams: { operation: this.operation }})
  }

  navigateToAdministradorCreate(): void {
    this.operation = 'new';
    this.router.navigate([`/auth/administradores/${this.operation}`], { queryParams: { operation: this.operation }})
  }

  deletaAdministradors(row: any): void {
    const id = row.id;
    this.administradorService.delete(id).subscribe(() => {
      this.administradorService.showMessage("Administrador excluido com sucesso!");
      this.ngOnInit();
    });
  }
  

  onClickRow(row: any) : void {
    this.operation = 'view';
    this.router.navigate([`/auth/administradores/${row.id}/${this.operation}`],{ queryParams: { operation: this.operation }});
  }


}
