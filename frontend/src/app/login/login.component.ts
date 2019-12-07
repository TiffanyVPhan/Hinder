import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router){
    //subscribes every changes of your route
    // this.router.events.subscribe((event) => {
    //     if (event instanceof NavigationEnd){
    //        //scroll to top
    //        window.scrollTo(0,0);
    //     }
    //  }
 }

  ngOnInit() {
  }

}
