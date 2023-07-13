import { Component } from '@angular/core';
import { Deck } from '../deck.model';
import { GameService } from '../game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.css']
})
export class StartScreenComponent {
  constructor(private gameService: GameService, private router: Router) {}

  start() {
    this.router.navigate(['/game']);
  }
}
