import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { User } from '../../services/auth/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit/* , OnDestroy */ {

  userLoginOn: any = false;
  userData?: User;


  constructor(
    private loginService: LoginService,
  ) {}

  // ngOnDestroy(): void {
  //   this.loginService.currentUserLoginOn.unsubscribe();
  // };

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    });

    this.loginService.currentUserData.subscribe({
      next:(userData) => {
        if(!userData.error) {
          // console.log('userData: ', userData);
          this.userData = userData;
        }
      }
    });

  };



}
