import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errMsg: string;
  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
  }
  loginSub( logForm: NgForm) {
    if ( logForm.valid ) {
    this.httpClient.post(`http://localhost:3000/users/login`, logForm.value)
      .subscribe(
        res => {
          if ( res.msgSuccess ) {

            location.href = 'http://localhost:4200/';
          }
          this.errMsg = res.msgError;
        },
        err => {
          console.log('Error occured');
        }
      );
    }
  }
}
