import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showMenu: boolean = false;

  constructor(private router: Router) {}

  goHome() {
    this.showMenu = false;
    this.router.navigate(['/'])
  }

  goToGame() {
    this.showMenu = false;
    this.router.navigate(['/game'])
  }
}
