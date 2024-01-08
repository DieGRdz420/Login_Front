import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './services/auth/login.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.loginService.userLoginOn.pipe(
      map(userLoginOn => {
        if (!userLoginOn) {
          this.router.navigate(['/login']);
          return false;
        }

        return true;
      })
    );
  }
}
