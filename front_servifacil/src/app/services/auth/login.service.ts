import { Injectable } from '@angular/core';
import { LoginRequest } from "./loginRequest";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { User } from './user';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  URL: string = "https://nodejs-api-67p8.onrender.com/api/";

  currentUserLoginOn: BehaviorSubject<boolean>;
  currentUserData: BehaviorSubject<User>;

  constructor(private http: HttpClient, private router: Router, private location: Location) {
    const storedUserData = localStorage.getItem('userData');
    const storedUserLoginOn = localStorage.getItem('userLoginOn');

    this.currentUserData = new BehaviorSubject<User>(storedUserData ? JSON.parse(storedUserData) : { error: false, status: 0, body: { id: 0, usuario: "", email: "", contrasena: "", rol_usuario: 0, token: "" } });
    this.currentUserLoginOn = new BehaviorSubject<boolean>(storedUserLoginOn ? JSON.parse(storedUserLoginOn) : false);
  }

  get userData(): Observable<User> {
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean> {
    return this.currentUserLoginOn.asObservable();
  }

  private updateLocalStorage(userData: User, userLoginOn: boolean) {
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('userLoginOn', JSON.stringify(userLoginOn));
  }



  login(credentials: LoginRequest): Observable<User> {
    return this.http.post<User>(this.URL + 'login', credentials).pipe(
      tap(userData => {
        this.currentUserData.next(userData);
        this.currentUserLoginOn.next(true);

        this.updateLocalStorage(userData, true);
      }),
      catchError(this.handleError)
    );
  }

  logout() {
    // Agrega el código necesario para cerrar sesión aquí
    const defaultUserData: User = { error: false, status: 0, body: { id: 0, usuario: "", email: "", contrasena: "", rol_usuario: 0, token: "" } };
    this.currentUserData.next(defaultUserData);
    this.currentUserLoginOn.next(false);

    this.updateLocalStorage(defaultUserData, false);

    // Redirige al usuario a la página de inicio de sesión
    this.router.navigate(['/login']);
  }


  getAllUsers(): Observable<any> {
    return this.http.get<any>(this.URL + 'usuarios').pipe(
      tap(users => {
        return users;
      }),
      catchError(this.handleError)
    );
  }

  addUser(newUser: any): Observable<User> {
    return this.http.post<any>(this.URL + 'login/post', newUser).pipe(
      tap((addedUser: any) => {
        if(addedUser.body === "Usuario Agregado"){
          location.reload();
        };
      }),
      catchError(this.handleError)
    );
  }





  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error("Error: ", error.error);
    } else {
      console.error("Codigo de Estado: ", error.status, error.error);

      if(error.error.body = 'Usuario existente') {
        Swal.fire({
          icon: 'info',
          title: '',
          text: 'Usuario existente',
          timer: 2000, // 2000 milisegundos (2 segundos)
          showConfirmButton: false, // Oculta el botón de confirmación
          allowOutsideClick: false // Deshabilita el cierre al hacer clic fuera
        });
      }
    }

    return throwError(() => new Error("Algo falló. Por favor intente nuevamente."));
  };
}
