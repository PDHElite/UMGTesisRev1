import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {

  isCollapsed = true;

  isLoggedIn: boolean = false;
  loggedInUser!: string;

  constructor(
    private loginService: LoginService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loginService.getAuth().subscribe( auth => {
      if(auth){
        this.isLoggedIn = true;
        this.loggedInUser = auth?.email ?? '';
      }
      else{
        this.isLoggedIn = false;
      }
    });
  }

  logout(){
    this.loginService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

}
