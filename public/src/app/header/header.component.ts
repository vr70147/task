import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor( private httpClient: HttpClient ) { }

  ngOnInit() { }
  isLoggedOut = () => {
    this.httpClient.get(`http://localhost:3000/users/logout`)
      .subscribe(
        (res: any) => {
          console.log(res);
          // if ( res.msgSuccess ) {

          //   location.href = 'http://localhost:4200/main';
          // }
          // this.errMsg = res.msgError;
        },
        err => {
          console.log(err);
        }
      );
  }

}
