# Snake

## Date: 2/12/2021

### By: Luke Arenas

#### [Website](https://lukearenas.github.io/Personal-Website/) | [GitHub](https://github.com/LukeArenas) | [LinkedIn](https://www.linkedin.com/in/lukearenas/) | [Trello](https://trello.com/b/VDEvoalZ/snake)

### ***Description***

A revamped version of the classic game Snake! This game allows a player to use arrow buttons to control a snake's direction of movement. The snake and the player's score grow as the player successfully guides the snake to the randomly generated food. If the player successfully completes the level, the stakes are raised as the snake begins to move faster and the game board shrinks. Hours of fun!

***

### ***Technologies***

* HTML
* CSS
* JavaScript

***

### ***HTML Decisions***
* create three html pages with buttons to navigate through them
* index.html will be a welcome page, followed by game.html and secondround.html
* index.html:
  * create the h1 title element
  * create a button for the user to navigate to the first round html page
* game.html and secondround.html:
  * create a main element with a predetermined number of divs (first round has 100, second round 64)
  * give these divs a class of board and unique numeric ID for JS navigation
  * create h1 title element and score and high score elements and set their initial values
  * create a play button so the user can begin the game

### ***CSS Decisions***

### ***JS Decisions***


### ***What I Would Do Differently***
I made the decision early on to give each div a numeric value from 0-99. This made coding the movement of the snake difficult as it required intermediate math calculations to figure out where the snake should move next. From my research, I think an easier way to accomplish this would be to use the canvas method.
Additionally, a lot of the code used in the level2.js file is repeated from the script.js file. In the future, I will research how this can be refactored to prevent redundant code.

### ***Screenshots***

#### Here are some screenshots from the game:
![index.html](screenshots/snake_index_html.PNG)
![game.html light](screenshots/snake_game_html_light.PNG)
![game.html dark](screenshots/snake_game_html_dark.PNG)
![game.html gameplay](screenshots/snake_game_html_midgame.PNG)
![next level prompt](screenshots/next_level_prompt.PNG)
![second round](screenshots/snake_secondround_html.PNG)
![game over](screenshots/game_over.PNG)

***

### ***Future Updates***

- [ ] Additional levels once level 2 is passed
- [ ] Change snake color when food eaten

***

### ***Credits***

* [FreeCodeCamp](https://www.freecodecamp.org/news/how-to-build-a-snake-game-in-javascript/)
* [Medium.com](https://medium.com/writeabyte/snake-game-5aaeb80a261a)
* [Educative.io](https://www.educative.io/blog/javascript-snake-game-tutorial)
* Audio: [FreeSoundsLibrary.com](https://www.freesoundslibrary.com/)
* GIF: [Miro.Medium.com](https://miro.medium.com/max/1400/1*4635TGUJegt-JC-i94cGJw.gif)
* Strawberry: [PinClipArt.com](https://www.pinclipart.com/pindetail/bxhmob_grapes-free-on-dumielauxepices-net-transparent-pac-man/)