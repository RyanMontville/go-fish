# go-fish
An Angular app of the card game Go Fish. Following the rules of the game by [Bicyclecards.com](https://bicyclecards.com/how-to-play/go-fish).

### August 2024 Update
The computer is now smarter about asking for cards. Before the update, the computer would randomly pick one of the cards it has. Here is the updated logic for choosing a card to ask for:
* The computer remembers the cards the user asks for and when it is the computer's turn, it will see if any of the cards it has match a card that the user has asked for at any point in the game.
* If it doesn't find any matches, it makes a list of all the cards it has more than one of and asks for a card from that list.
* If the computer doesn't have any duplicate cards, it picks a card a random to ask for.

[Click here](https://ryanmontville.github.io/go-fish/) to play the game.

<div>
  <img src="https://github.com/RyanMontville/go-fish/blob/main/screenshots/game-screen.png" alt="game screen" title="game screen" style="width: 70%; display: inline-block;"></img>
  <img src="https://github.com/RyanMontville/go-fish/blob/main/screenshots/mobile.png" alt="the game on mobile" title="the game on mobile" style="width: 15%; display: inline-block;"></img>
</div>
