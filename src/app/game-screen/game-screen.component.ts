import { Component, OnInit, ViewChild } from '@angular/core';
import { Deck, PlayingCard } from '../deck.model';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.css']
})
export class GameScreenComponent implements OnInit {
  @ViewChild('scroll', { static: true }) scroll: any;
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
  userHasCardProgramIsAskingFor: boolean = false;
  programChoice: number = 0;
  cardsRemainingInDeck: number = 0;

  ngOnInit() {
    this.addMessage('left','The game has started!')
    this.deck.generateDeck();
    for (let i = 0; i < 7; i++) {
      let cardOne: PlayingCard = this.deck.drawCard();
      let cardTwo: PlayingCard = this.deck.drawCard();
      this.addCardToUserHand(cardOne);
      this.programHand.push(cardTwo);
      this.checkProgramUniqueCards(cardTwo.getRank());
    }
    this.playerTurn = 'user';
    this.cardsRemainingInDeck = this.deck.getDeckSize();
  }

  addCardToUserHand(card: PlayingCard) {
    this.userHand.push(card);
    this.checkUserUniqueCards(card.getRank());
    let checkForFour: PlayingCard[] = this.userHand.filter(currentCard => currentCard.getRank() === card.getRank());
    if (checkForFour.length === 4) {
      this.userHand = this.userHand.filter(currCard => currCard.getRank() != card.getRank());
      this.userPairs.push(card.getRank());
      this.addMessage('right','I got 4 ' + this.formatCardRank(card.getRank()) + 's')
      this.userUniqueCards = this.userUniqueCards.filter(rank => rank != card.getRank());
    }
  }

  addCardToProgramHand(card: PlayingCard) {
    this.programHand.push(card);
    this.checkProgramUniqueCards(card.getRank());
    let checkForFour: PlayingCard[] = this.programHand.filter(currentCard => currentCard.getRank() === card.getRank());
    if (checkForFour.length === 4) {
      this.programHand = this.programHand.filter(currCard => currCard.getRank() != card.getRank());
      this.programPairs.push(card.getRank());
      this.addMessage('left','I got 4 ' + this.formatCardRank(card.getRank()) + 's')
      this.programUniqueCards = this.programUniqueCards.filter(rank => rank != card.getRank());
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

  formatCardRank(rank: number) {
    switch (rank) {
      case 1: return 'A';
      case 11: return 'J';
      case 12: return 'Q';
      case 13: return 'K';
      default: return '' + rank + '';
    }
  }

  addMessage(player: string, text: string) {
    this.messages.push({class: player, text: text});
    this.scroll.nativeElement.scrollTo(0, this.scroll.nativeElement.scrollHeight);
  }

  userAsk(card: number) {
    if(this.userHand.length==0){
      if(this.cardsRemainingInDeck>0){
        this.addCardToUserHand(this.deck.drawCard());
      } else {
        this.gameOver = true;
      }
    }
    this.addMessage('right','Got any ' + this.formatCardRank(card) + 's?');
    let matches: PlayingCard[] = this.programHand.filter(currentCard => currentCard.getRank() === card);
    if (matches.length > 0) {
      this.addMessage('left', 'Yes, I have ' + matches.length)
      for (let i = 0; i < matches.length; i++) {
        this.addCardToUserHand(matches[i]);
        this.programHand = this.programHand.filter(matchCard => matchCard.getCard() != matches[i].getCard());
        this.programUniqueCards = this.programUniqueCards.filter(uniqueMatch => uniqueMatch != card);
      }
    } else {
      this.addMessage('left','No, go fish.');
      if(this.cardsRemainingInDeck>0) {
        this.addCardToUserHand(this.deck.drawCard());
      }
      this.cardsRemainingInDeck = this.deck.getDeckSize();
      this.playerTurn = 'program';
      this.programAsk();
    }
  }

  programAsk() {
    if(this.programHand.length==0){
      if(this.cardsRemainingInDeck>0){
        this.addCardToProgramHand(this.deck.drawCard());
      } else {
        this.gameOver = true;
      }
    }
    let min = Math.ceil(0);
    let max = Math.floor(this.programUniqueCards.length - 1);
    let randomNumber: number = Math.floor(Math.random() * (max - min) + min);
    let card: number = this.programUniqueCards[randomNumber];
    this.programChoice = card;
    this.addMessage('left','Got any ' + this.formatCardRank(card) + 's?')
    let userMatch: PlayingCard[] = this.userHand.filter(currentCard => currentCard.getRank() === card);
    if(userMatch.length>0) {
      this.userHasCardProgramIsAskingFor = true;
    } else {
      this.userHasCardProgramIsAskingFor = false;
    }
  }

  userResponse() {
    if(this.userHasCardProgramIsAskingFor) {
      let matchedCards: PlayingCard[] = this.userHand.filter(matchCard => matchCard.getRank() === this.programChoice);
      this.addMessage('right','Yes, I have ' + matchedCards.length)
      for(let i=0;i<matchedCards.length;i++){
        this.addCardToProgramHand(matchedCards[i]);
      }
      this.userHand = this.userHand.filter(currentCard => currentCard.getRank() !== this.programChoice);
      this.userUniqueCards = this.userUniqueCards.filter(rank => rank !== this.programChoice);
      this.programAsk()
    } else {
      this.addMessage('right','No, go fish')
      if(this.cardsRemainingInDeck>0){
        this.addCardToProgramHand(this.deck.drawCard());
      }
      this.cardsRemainingInDeck = this.deck.getDeckSize();
      this.playerTurn = 'user';
    }
  }

  

}
