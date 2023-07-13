import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-end-screen',
  templateUrl: './end-screen.component.html',
  styleUrls: ['./end-screen.component.css']
})
export class EndScreenComponent implements OnInit {
  programPairs: number[] = [];
  userPairs: number[] = [];
  outcomeMessage: string = '';

  constructor(private router: Router, private gameService: GameService) { }

  ngOnInit() {
    this.programPairs = this.gameService.getProgramPairs();
    this.userPairs = this.gameService.getUserPairs();
    if(this.userPairs.length===0 && this.programPairs.length===0) {
      this.outcomeMessage = 'No game has been played, going to home page';
      this.router.navigate(['/']);
    }
    if(this.programPairs.length > this.userPairs.length) {
      this.outcomeMessage = "You Lost. You had " + this.userPairs.length + " pairs while the computer had " + this.programPairs.length;
    } else {
      this.outcomeMessage = "You Won! You had " + this.userPairs.length + " pairs while the computer had " + this.programPairs.length;
    }
  }

  formatCardRank(rank: number) {
    switch (rank) {
      case 1: return 'A';
      case 11: return 'J';
      case 12: return 'Q';
      case 13: return 'K';
      default: return '' + rank + '';
    }
  }

}
