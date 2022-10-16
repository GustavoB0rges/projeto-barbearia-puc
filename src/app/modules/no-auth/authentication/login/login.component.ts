import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {
  form: FormGroup;
  hide = true;



  constructor(private router: Router) {
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



  ngOnInit(): void {

  }

  navigate() {
    this.router.navigate(['/auth/agendamentos'])
  }


}
