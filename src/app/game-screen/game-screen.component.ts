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
  userPairs: number[] = [];
  userUniqueCards: number[] = [];
  programHand: PlayingCard[] = [];
  programPairs: number[] = [];
  programUniqueCards: number[] = [];
  gameOver: boolean = false;
  messages: { class: string, text: string }[] = [];
  playerTurn: string = '';

  ngOnInit() {
    this.messages.push({ class: 'left', text: 'The game has started!' });
    this.deck.generateDeck();
    for (let i = 0; i < 7; i++) {
      let cardOne: PlayingCard = this.deck.drawCard();
      let cardTwo: PlayingCard = this.deck.drawCard();
      this.addCardToUserHand(cardOne);
      this.programHand.push(cardTwo);
      this.checkProgramUniqueCards(cardTwo.getRank());
    }
    this.playerTurn = 'user';
  }

  addCardToUserHand(card: PlayingCard) {
    this.userHand.push(card);
    this.checkUserUniqueCards(card.getRank());
    let checkForFour: PlayingCard[] = this.userHand.filter(currentCard => currentCard.getRank() === card.getRank());
    if (checkForFour.length === 4) {
      this.userHand = this.userHand.filter(currCard => currCard.getRank() != card.getRank());
      this.userPairs.push(card.getRank());
      this.messages.push({ class: 'right', text: 'I got 4 ' + this.formatCardRank(card.getRank()) + 's' });
      this.userUniqueCards = this.userUniqueCards.filter(rank => rank != card.getRank());
    }
  }

  checkUserUniqueCards(rank: number) {
    if (!this.userUniqueCards.includes(rank)) {
      this.userUniqueCards.push(rank);
    }
  }

  checkProgramUniqueCards(rank: number) {
    if (!this.programUniqueCards.includes(rank)) {
      this.programUniqueCards.push(rank);
    }
  }

  checkSuit(suit: string): string {
    if (suit === '♥' || suit === '♦') {
      return "red card";
    }
    return "card";
  }

  addMessage(rank: number) {
    switch (rank) {
      case 1: this.messages.push({ class: 'right', text: "Got any As?" }); break;
      case 11: this.messages.push({ class: 'right', text: "Got any Js?" }); break;
      case 12: this.messages.push({ class: 'right', text: "Got any Qs?" }); break;
      case 13: this.messages.push({ class: 'right', text: "Got any Ks?" }); break;
      default: this.messages.push({ class: 'right', text: "Got any " + rank + "s?" }); break;
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

  userAsk(card: number) {
    this.messages.push({ class: 'right', text: 'Got any ' + this.formatCardRank(card) + 's?' });
    let matches: PlayingCard[] = this.programHand.filter(currentCard => currentCard.getRank() === card);
    if (matches.length > 0) {
      this.messages.push({ class: 'left', text: 'Yes, I have ' + matches.length });
      for (let i = 0; i < matches.length; i++) {
        this.addCardToUserHand(matches[i]);
        this.programHand = this.programHand.filter(matchCard => matchCard.getCard() != matches[i].getCard());
      }
    } else {
      this.messages.push({ class: 'left', text: 'No, go fish.' });
      this.addCardToUserHand(this.deck.drawCard());
      this.playerTurn = 'program';
      this.programAsk();
    }
  }

  programAsk() {
    let min = Math.ceil(0);
    let max = Math.floor(this.programUniqueCards.length - 1);
    let randomNumber = Math.floor(Math.random() * (max - min) + min);
    alert("Program has " + (this.programUniqueCards.length - 1) + ' unique cards. The random number picked was ' + randomNumber);
    this.playerTurn = 'user';
  }

  

}
