import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LoginService } from '../../services/login.service'
import { Router, ActivatedRoute } from '@angular/router'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: String
  password: String
  loggedin = new FormControl(false)

  constructor(private _login: LoginService, private router: Router, public active: ActivatedRoute) { }

  ngOnInit(): void {
    this._login.authenticate(localStorage.getItem('usertoken'))
      .subscribe(data => {
        if (data.status) {
          this.router.navigate(['login/dashboard'])
        }
      })
  }


  login() {
    this._login.login_user(this.email, this.password)
      .subscribe(data => {
        console.log(data);

        if (data.status) {
          localStorage.setItem('usertoken', data.token);
          this.router.navigate(['login/dashboard']);
          this.email = "";
          this.password = "";
        } else {
          alert(data.msg)
        }
      })

  }

  register() {
    this.router.navigate(['/register']);
  }

  googlelogin() {
    this._login.googleLogin().subscribe(data => {
      console.log(data);

    })
  }

}