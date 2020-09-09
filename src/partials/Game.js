import Paddle from './Paddle';
import Board from './Board';
import Ball from './Ball';
import { SVG_NS, KEYS } from '../settings';
import Score from './Score';

/**
 * Creates an instance of a new pong game.
 * @class
 */
export default class Game {
  /**
   * @constructor
   * @param {HTMLElement} element - HTML element targetted to render the game.
   * @param {number} width - Width of the game instance
   * @param {number} height - Height of the game instance
   */
  constructor(element, width, height) {
    this.element = element;
    this.width = width;
    this.height = height;

    // Fetches the element in which the game will be rendered.
    this.gameElement = document.getElementById(this.element);

    // Creates an instance of the board
    this.board = new Board(this.width, this.height);

    // Creates settings for paddle initializations
    this.paddleWidth = 8;
    this.paddleHeight = 56;
    this.boardGap = 10;

    // Creates an instance of a ball
    this.ball = new Ball(8, this.width, this.height);

    // Creates an instance of the paddle for player 1
    this.player1 = new Paddle(
      this.height,
      this.paddleWidth,
      this.paddleHeight,
      this.boardGap,
      (this.height - this.paddleHeight) / 2,
      KEYS.a,
      KEYS.z,
    );

    // Creates an instance of the paddle for player 2
    this.player2 = new Paddle(
      this.height,
      this.paddleWidth,
      this.paddleHeight,
      this.width - this.boardGap - this.paddleWidth,
      (this.height - this.paddleHeight) / 2,
      KEYS.up,
      KEYS.down,
    );

    // Creates instances for the scores of both players
    this.score1 = new Score(this.width / 2 - 50, 30, 30);
    this.score2 = new Score(this.width / 2 + 25, 30, 30);

    // Adds listeners for the game controls
    document.addEventListener('keydown', (event) => {
      switch (event.key) {
        // Adds pause functionality
        case KEYS.spaceBar: {
          this.pause = !this.pause;
          this.player1.speed = 10;
          this.player2.speed = 10;
          break;
        }
        //Adds new game functionality
        case KEYS.n: {
          const game = new Game('game', 512, 256);
          (function gameLoop() {
            game.render();
            requestAnimationFrame(gameLoop);
          })();
        }
      }
    });
  }

  render() {
    // Adds pause functionality
    if (this.pause) {
      this.player1.speed = 0;
      this.player2.speed = 0;
      return;
    }

    // Creates element and renders a game board within the HTML
    this.gameElement.innerHTML = '';
    let svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttributeNS(null, 'width', this.width);
    svg.setAttributeNS(null, 'height', this.height);
    svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);
    this.gameElement.appendChild(svg);
    this.board.render(svg);

    // Renders paddles to the game board.
    this.player1.render(svg);
    this.player2.render(svg);

    // Renders ball to the game board.
    this.ball.render(svg, this.player1, this.player2);

    // Renders scoreboards to the game board.
    this.score1.render(svg, this.player1.score);
    this.score2.render(svg, this.player2.score);
  }
}
