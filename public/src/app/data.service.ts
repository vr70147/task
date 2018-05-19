import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
  constructor() {}
  errors = ['email field is required', 'password field is required', 'first name field is required', 'last name field is required'];
  checkFields = () => {
    console.log();
  }
}
