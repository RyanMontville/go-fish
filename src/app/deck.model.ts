export class Deck {
    public deck: PlayingCard[];

    constructor() {
        this.deck = [];
    }

    public generateDeck() {
        let suits: string[] = ['♥', '♠', '♣', '♦'];
        for (let suit of suits) {
            for (let i = 2; i < 14; i++) {
                let card: PlayingCard = new PlayingCard(i, suit);
                this.deck.push(card);
            }
        }
        this.shuffleDeck();
    }


    public shuffleDeck() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }

    drawCard(): PlayingCard {
        let card: PlayingCard = this.deck[this.deck.length-1];
        this.deck.pop();
        return card;
    }

    addCardToDeck(card: PlayingCard) {
        this.deck.push(card);
    }

    addMultipleCardsToDeck(cards: PlayingCard[]) {
        for(let card of cards) {
            this.deck.push(card);
        }
    }

    getDeckSize(): number {
        return this.deck.length;
    }

    clearDeck() {
        this.deck = [];
    }

    returnDeck(): PlayingCard[] {
        let deckToReturn = this.deck;
        this.clearDeck();
        return deckToReturn;
    }

    getDeck(): PlayingCard[] {
        return this.deck;
    }

}

export class PlayingCard {
    private suit: string;
    private rank: number;
    constructor(rank: number, suit: string) {
        this.rank = rank;
        this.suit = suit;
    }

    public getRank() {
        return this.rank;
    }

    public getSuit() {
        return this.suit;
    }

    public getCard() {
        if (this.rank === 1) {
            return 'A' + this.suit;
        } else if (this.rank === 11) {
            return 'J' + this.suit;
        } else if (this.rank === 12) {
            return 'Q' + this.suit;
        } else if (this.rank === 13) {
            return 'K' + this.suit;
        } else {
            return this.rank + this.suit;
        }
    }

    getRankChar() {
        if (this.rank === 1) {
            return 'A';
        } else if (this.rank === 11) {
            return 'J';
        } else if (this.rank === 12) {
            return 'Q';
        } else if (this.rank === 13) {
            return 'K';
        } else {
            return this.rank;
        }
    }
}