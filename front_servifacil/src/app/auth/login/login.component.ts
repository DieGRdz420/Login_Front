import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";

import { Router } from "@angular/router";

import { LoginService } from "../../services/auth/login.service";
import { LoginRequest } from "../../services/auth/loginRequest";
import { BehaviorSubject } from 'rxjs';
import { User } from '../../services/auth/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    contrasena: ['', [Validators.required]],
  });

  loginError: string = '';


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
  ) {}


  ngOnInit(): void {
  }


  get email() {
    return this.loginForm.controls.email;
  }

  get contrasena() {
    return this.loginForm.controls.contrasena;
  }

  login() {
    if(this.loginForm.valid) {
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (userData) => {
          // console.log('login: ', userData);
        },
        error: (err) => {
          // console.error('login: ', err);
          this.loginError = "Error. Por favor intentar nuevamente";
        },
        complete: () => {
          // console.log("Login completo");

          this.router.navigateByUrl('/dashboard');
          this.loginForm.reset();
        }
      });
    } else {
      // console.log('login: ', "No logueado");

      this.loginForm.markAllAsTouched();
    }
  };





}
