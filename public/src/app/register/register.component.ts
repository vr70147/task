import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
  }
  validateUserInput = () => {
    const error = document.querySelector('.alert');
    console.log(error);
  }

  onSubmit( regForm: NgForm): void {
    this.httpClient.post(`http://localhost:3000/users/register`, regForm.value)
      .subscribe(
        res => {
          if ( res ) {
            location.href = 'http://localhost:4200/main';
          }
        },
        err => {
          console.log('Error occured');
        }
      );  }
}
