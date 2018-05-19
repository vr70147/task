import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { isError } from 'util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor( private httpClient: HttpClient, private dataService: DataService ) {}
  x = this.dataService.errors;
  isError: any;
  ngOnInit() {}
  onSubmit( regForm: NgForm) {
    if ( regForm.valid ) {
    this.httpClient.post(`http://localhost:3000/users/register`, regForm.value)
      .subscribe(
        res => {
          if ( res ) {
            location.href = 'http://localhost:4200/';
          }
        },
        err => {
          console.log('Error occured');
        }
      );
    }
    this.isError = 'one or more of the field is empty';
  }
}
