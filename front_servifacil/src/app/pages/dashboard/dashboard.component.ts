import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { User, NewUser } from '../../services/auth/user';
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userLoginOn: any = false;
  userData?: any;
  usersData?: any;

  newUser: any = this.formBuilder.group({
    nombre: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    contrasena: ['', [Validators.required]],
    id_rol: [1, [Validators.required, Validators.pattern(/^-?\d*(\.\d+)?$/)]],
  });

  constructor(private loginService: LoginService, private formBuilder: FormBuilder,) {}

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    });

    this.loginService.currentUserData.subscribe({
      next: (userData) => {
        this.userData = userData;
      }
    });

    this.loginService.getAllUsers().subscribe({
      next: (usersData) => {
        if(!usersData.error) {
          this.usersData = usersData.body;
        } else {
          console.error('Usuarios No obtenidos: ', usersData.error);
        }
      },
      error: (error) => {
        console.error('Error al obtener usuarios: ', error);
      }
    });
  }

  logout() {
    this.loginService.logout();
  }

  onSubmit() {
    var usuarioData = this.newUser.value;
    usuarioData.id_rol = parseInt(usuarioData.id_rol);

    this.loginService.addUser(usuarioData).subscribe({
      next: (addedUser) => {
        console.log('Usuario agregado correctamente:', addedUser);
        // Puedes realizar acciones adicionales después de agregar el usuario, si es necesario
      },
      error: (error) => {
        // console.error('Error al agregar usuario:', error);
      }
    });
  }
}
