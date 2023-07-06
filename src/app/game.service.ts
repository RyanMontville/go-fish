import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { Router } from "@angular/router";
import { Deck, PlayingCard } from "./deck.model";

@Injectable()
export class GameService {
    public deck: Deck = new Deck;
    public userHand: Deck = new Deck;
    public userPairs: Deck = new Deck;
    public userSubject = new Subject<PlayingCard[]>();
    public userPairSubject = new Subject<PlayingCard[]>();
    public programHand: Deck = new Deck;
    public programPairs: Deck = new Deck;
    public programSubject = new Subject<PlayingCard[]>();
    public programPairSubject = new Subject<PlayingCard[]>();

    startGame() {
        this.deck.generateDeck();
        for (let i = 0; i < 7; i++) {
            this.userHand.addCardToDeck(this.deck.drawCard());
            this.programHand.addCardToDeck(this.deck.drawCard());
        }
        alert(JSON.stringify(this.userHand.getDeck()));
        this.userSubject.next(this.userHand.getDeck());
        this.programSubject.next(this.programHand.getDeck());
    }
}