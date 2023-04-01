# splash-game

This is a guessing game based on random numbers and will progress through a series of
rounds. The goal of this game is to observe the rising ```Multiplier``` value, predict at which point it
will freeze, and place points based on the prediction.

At the beginning of each round, each player will be given a certain amount of points to start with.
The starting points will be the same for all players. If a player guessed correctly, they win the
round and will gain points calculated by the points placed multiplied by the Multiplier (points *
multiplier). Otherwise, all points placed are lost.

The speed slider controls the speed of the rising multiplier value, but it does not affect the
chances of a player's prediction in any way.
Mechanics

- Game Board : consists of a line graph, representing how the Multiplier value increases
over the course of the round.
- Player Inputs :
  - Points : The amount of points the player will place for their guess.
  - Multiplier : The value that the player predicts the Multiplier value will freeze at
- Current Round : A table displaying all active players of the current round
- Speed Slider : Consists of a slider that controls the rising speed of the Multiplier value
- Ranking : A table displaying the total ranking of all players, based on their total points
- Chat : Allows players to send messages to each other through the chat box

In addition, there will be 4 auto-players generated by the game. These auto-players will make
their own predictions, and their points will be included in the overall ranking (As a developer, you
are free to generate these players through the frontend or backend).
