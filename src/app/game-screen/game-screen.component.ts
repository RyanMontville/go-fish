import { Component, OnInit } from '@angular/core';
import { Deck, PlayingCard } from '../deck.model';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.css']
})
export class GameScreenComponent implements OnInit {
  deck: Deck = new Deck;
  userHand: PlayingCard[] = [];
  userPairs: PlayingCard[] = [];
  userUniqueCards: number[] = [];
  programHand: PlayingCard[] = [];
  programPairs: PlayingCard[] = [];
  programUniqueCards: number[] = [];

  messages: {class: string, text: string}[] = [];

  ngOnInit() {
    this.deck.generateDeck();
    for (let i = 0; i < 7; i++) {
      let cardOne: PlayingCard = this.deck.drawCard();
      let cardTwo: PlayingCard = this.deck.drawCard();
      this.userHand.push(cardOne);
      if(this.userUniqueCards.includes(cardOne.getRank())){
        change this to give the user the chance to remove pairs instead of auto-remove
        this.userPairs.push(cardOne);
        let noPairs: PlayingCard[] = this.userHand.filter(card => card.getRank() !== cardOne.getRank());
        this.userHand = noPairs;
        let unique: number[] = this.userUniqueCards.filter(number => number !== cardOne.getRank());
        this.userUniqueCards = unique;
      } else {
        this.userUniqueCards.push(cardOne.getRank());
      }
      this.programHand.push(cardTwo);
      if(this.programUniqueCards.includes(cardTwo.getRank())){
        this.programPairs.push(cardTwo);
        let noPairComputer: PlayingCard[] = this.programHand.filter(card => card.getRank() !== cardTwo.getRank());
        this.programHand = noPairComputer;
        let uniqueComputer: number[] = this.programUniqueCards.filter(number => number !== cardTwo.getRank());
        this.programUniqueCards = uniqueComputer;
      } else {
        this.programUniqueCards.push(cardTwo.getRank());
      }
    }
    this.messages.push({class: 'left',text: 'The game has started!'});
  }

  checkSuit(suit: string):string {
    if(suit==='♥' || suit==='♦') {
      return "red card";
    }
    return "card";
  }

  addMessage(rank: number) {
    switch(rank) {
      case 1: this.messages.push({class:'right',text:"Got any As?"}); break;
      case 11: this.messages.push({class:'right',text:"Got any Js?"}); break;
      case 12: this.messages.push({class:'right',text:"Got any Qs?"}); break;
      case 13: this.messages.push({class:'right',text:"Got any Ks?"}); break;
      default: this.messages.push({class:'right',text:"Got any " + rank + "s?"}); break;
    }
    
  }

  formatCardRank(rank: number) {
    switch(rank) {
      case 1: return 'A';
      case 11: return 'J';
      case 12: return 'Q';
      case 13: return 'K';
      default: return '' + rank + '';
    }
  }

}
