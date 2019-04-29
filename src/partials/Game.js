import Paddle from './Paddles';
import Board from './Board';
import Ball, { ball2 } from './Ball'
import {SVG_NS, KEYS} from '../settings';
import Score from './score';
import Ball2 from './Ball'


export default class Game {
  
  //create base elements of an instance of a game
  constructor(element, width, height) {
    this.element = element;
    this.width = width;
    this.height = height;
    
  //calls the game ID
    this.gameElement = document.getElementById(this.element)
    
    //Create instance of board
    this.board = new Board(this.width, this.height)

    //Instance for players paddle instances
    this.paddleWidth = 8;
    this.paddleHeight = 56
    this.boardGap = 10
    

    //Instance for ball instances

       //Ball Instance
       this.ball = new Ball (
        8, this.width, this.height)
      
      

    //Player 1 instance
    this.player1 = new Paddle(
      this.height,
      this.paddleWidth,
      this.paddleHeight,
      this.boardGap,
      ((this.height - this.paddleHeight) / 2),
      KEYS.a,
      KEYS.z

    )
    this.player2 = new Paddle(
      this.height,
      this.paddleWidth,
      this.paddleHeight,
      ((this.width - this.boardGap) - this.paddleWidth),
      ((this.height - this.paddleHeight) / 2),
      KEYS.up,
      KEYS.down

    )

    this.score1 = new Score(this.width / 2 - 50, 30, 30);
    this.score2 = new Score(this.width / 2 + 25, 30, 30);
// What is providing the recognition of the keys
    document.addEventListener('keydown', event => {
      switch(event.key) {
        case KEYS.spaceBar:
          this.pause = !this.pause;
          this.player1.speed = 10
          this.player2.speed = 10
          console.log(this.pause)
          break;
          case KEYS.p:
          this.ball2 = new Ball2 (
            9, this.width, this.height)
          break;
          case KEYS.n: 
          const game = new Game('game', 512 , 256);



        (function gameLoop() {
         game.render();
        requestAnimationFrame(gameLoop);
          })();

      }


  })

  if (this.player1.score == 1) {
   
  }
  
  }
// explanation
  render() {
    
    if (this.pause) {
      this.player1.speed = 0
      this.player2.speed = 0
      return;
    }

    this.gameElement.innerHTML = '';

 let svg = document.createElementNS(SVG_NS, 'svg');
 
 svg.setAttributeNS(null, 'width', this.width);
 svg.setAttributeNS(null, 'height', this.height);
 svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);
 this.gameElement.appendChild(svg)
 
 this.board.render(svg)
 
 //render p1 and p2 paddles
 this.player1.render(svg)
 this.player2.render(svg)
 this.ball.render(svg, this.player1, this.player2)
 
 this.score1.render(svg, this.player1.score);
 this.score2.render(svg, this.player2.score);
  if (this.ball2 !== undefined) {
  this.ball2.render(svg, this.player1, this.player2)
}
}
 
  } 


