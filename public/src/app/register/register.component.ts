import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
  }
  onSubmit( regForm: NgForm): void {
    this.httpClient.post(`http://localhost:3000/users/register`, regForm.value)
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log('Error occured');
        }
      );  }
}
