import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from './auth.service';
import { Store, select } from '@ngrx/store';
import * as fromUser from './state/user.reducer';
import * as userActions from './state/user.action';
import { ToggleMaskUserName } from './state/user.action';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  pageTitle = 'Log In';
  errorMessage: string;

  maskUserName: boolean;

  constructor(private authService: AuthService,
              private router: Router, private store: Store<any>) {
  }

  ngOnInit(): void {
    this.store.pipe(select(fromUser.getMaskUserName)).subscribe(
      userMaskState=>{
        //DEMO TODO: check how to ng-bind as angular form obj value
        // if(userDetail)
        // loginForm.form.value.userName;
        this.maskUserName=userMaskState;
      }
    )

  }

  cancel(): void {
    this.router.navigate(['welcome']);
  }

  checkChanged(value: boolean): void {
    this.maskUserName = value;
    this.store.dispatch(
      new userActions.ToggleMaskUserName(value)
    )
  }

  login(loginForm: NgForm): void {
    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      this.authService.login(userName, password);

      this.store.dispatch(
        {
          type:'LOGIN_ACTION',
          payload: {userName: userName, passWord:password}
        }
      )

      if (this.authService.redirectUrl) {
        this.router.navigateByUrl(this.authService.redirectUrl);
      } else {
        this.router.navigate(['/products']);
      }
    } else {
      this.errorMessage = 'Please enter a user name and password.';
    }
  }
}
