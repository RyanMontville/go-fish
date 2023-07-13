import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { Router } from "@angular/router";
import { Deck, PlayingCard } from "./deck.model";

@Injectable()
export class GameService {
    private userPairs: number[] = [];
    private programPairs: number[] = [];

    setUserPairs(pairs: number[]) {
        this.userPairs = pairs;
    }

    setProgramPairs(pairs: number[]) {
        this.programPairs = pairs;
    }

    getUserPairs() {
        return this.userPairs;
    }

    getProgramPairs() {
        return this.programPairs;
    }
}