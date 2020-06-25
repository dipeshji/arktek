import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ChatService } from 'src/app/services/chatService/chat.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  name = '';
  message: string;
  alluser = [];
  chatto: string;
  constructor(private _login: LoginService, private _chat: ChatService, private router: Router, public active: ActivatedRoute) { }

  ngOnInit(): void {
    let token = localStorage.getItem('usertoken');
    this._login.authenticate(token)
      .subscribe(data => {
        if (!data.status) {
          this.router.navigate(['login']);
          setTimeout(() => {
            alert("please login");
          }, 100);
        } else {
          this.name = data.user.Name;
          this._login.getall()
            .subscribe(data => {
              this.alluser = data;
            })
        }

      })
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  chat(name) {
    this._chat.changeMessage(name);
    this.router.navigate(['login/dashboard/chat'])
  };

}
