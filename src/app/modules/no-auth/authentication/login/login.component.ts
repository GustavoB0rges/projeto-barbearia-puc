import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {
  form: FormGroup;
  hide = true;

  constructor(private router: Router,
    private _authenticationService: AuthenticationService,) {
    localStorage.removeItem('token');

    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9.%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
      ]),

      senha: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ])
    })
  }

  onLogin(): void {
    this._authenticationService.login(this.form.value.email, this.form.value.senha).subscribe(
      {
        next: (data) => {
          console.log(data);
          
          if (data) {
            localStorage.setItem('user', JSON.stringify({ ...data.data.pessoa, ...{ email: data.data.email } }));
            localStorage.setItem('token', data.token);
            this.navigate();
          } else {
              Swal.fire(
                "E-mail inexistente!!",
                "error"
              );
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

       

        
      //   response => {
      //     if (response) {
      //         localStorage.setItem('user', JSON.stringify({ ...response.data.pessoa, ...{ email: response.data.email } }));
      //         localStorage.setItem('token', response.token);
      //         this.navigate();
      //         if (!localStorage.getItem('custom')) {
      //             this.openDialog();
      //         }
      //     } else {
      //         this._toastrService.error('E-mail inexistente!');
      //     }
      //     this._loading.hide();
      // },
      // error => {
      //     this._toastrService.error(error.error.message);
      // }
    }

  ngOnInit(): void {

  }

  navigate() {
    this.router.navigate(['/auth/agendamentos'])
  }

}
