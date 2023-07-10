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
  userCardsClicked: PlayingCard[] = [];
  userPairNotification: number[] = [];
  programHand: PlayingCard[] = [];
  programPairs: number[] = [];
  programUniqueCards: number[] = [];
  userHasPair: boolean = false;

  messages: {class: string, text: string}[] = [];

  ngOnInit() {
    this.messages.push({class: 'left',text: 'The game has started!'});
    this.deck.generateDeck();
    for (let i = 0; i < 7; i++) {
      let cardOne: PlayingCard = this.deck.drawCard();
      let cardTwo: PlayingCard = this.deck.drawCard();
      this.userHand.push(cardOne);
      if(this.userUniqueCards.includes(cardOne.getRank())){
        this.userHasPair = true;
        this.userPairNotification.push(cardOne.getRank());
      } else {
        this.userUniqueCards.push(cardOne.getRank());
      }
      this.programHand.push(cardTwo);
      if(this.programUniqueCards.includes(cardTwo.getRank())){
        this.programPairs.push(cardTwo.getRank());
        let noPairComputer: PlayingCard[] = this.programHand.filter(card => card.getRank() !== cardTwo.getRank());
        this.programHand = noPairComputer;
        let uniqueComputer: number[] = this.programUniqueCards.filter(number => number !== cardTwo.getRank());
        this.programUniqueCards = uniqueComputer;
        this.messages.push({class: 'left', text: 'I got a pair of ' + this.formatCardRank(cardTwo.getRank()) + 's'});
      } else {
        this.programUniqueCards.push(cardTwo.getRank());
      }
    }
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

  userClicksCard(card: PlayingCard) {
    this.userCardsClicked.push(card);
    let findPairs: PlayingCard[] = this.userCardsClicked.filter(currentCard => currentCard.getRank === card.getRank);
    if(findPairs.length ===2) {
      let cardOne = findPairs[1];
      let cardTwo = findPairs[0];
      let filtered = this.userHand.filter(currCard => currCard.getCard() != cardOne.getCard());
      this.userHand = filtered;
      filtered = this.userHand.filter(currCard => currCard.getCard() != cardTwo.getCard());
      this.userHand = filtered;
      this.userPairs.push(cardOne.getRank());
      let filterUnique = this.userUniqueCards.filter(card => card != cardOne.getRank());
      this.userUniqueCards = filterUnique;
      let filterNotification = this.userPairNotification.filter(num => num != cardOne.getRank());
      this.userPairNotification = filterNotification;
      if(this.userPairNotification.length===0) {
        this.userHasPair = false;
      }
      findPairs = [];
      this.userCardsClicked = [];
      this.messages.push({class:'right',text:'I got a pair of ' + this.formatCardRank(cardOne.getRank()) + 's'})
    }
  }

}
