import { SVG_NS } from '../settings';

/**
 * Creates an instance of a new ball.
 * @class
 */
export default class Ball {
  /**
   * @constructor
   * @param {number} radius - Radius of the ball instance
   * @param {number} boardWidth - Width of the board instancnum
   * @param {number} boardHeight - Height of the board instance
   */
  constructor(radius, boardWidth, boardHeight) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;
    this.reset();
  }

  /**
   * @function
   * @name wallCollision
   * Handles logic for when ball touches the wall of a board.
   */
  wallCollision() {
    if (this.x - this.radius <= 0 || this.x + this.radius >= this.boardWidth) {
      this.vx = -this.vx;
    } else if (
      this.y - this.radius <= 0 ||
      this.y + this.radius >= this.boardHeight
    ) {
      this.vy = -this.vy;
    }
  }

  /**
   * @function
   * @name paddleCollision
   * @param {Paddle} player1 - A player 1 Paddle class
   * @param {Paddle} player2 - A player 2 Paddle class
   * Handles logic for when ball touches a paddle.
   */
  paddleCollision(player1, player2) {
    if (this.vx > 0) {
      let paddle = player2.coordinates(
        player2.x,
        player2.y,
        player2.width,
        player2.height,
      );
      let [leftX, rightX, topY, bottomY] = paddle;
      if (
        this.x + this.radius >= leftX &&
        this.x + this.radius <= rightX &&
        this.y >= topY &&
        this.y <= bottomY
      ) {
        this.vx = -this.vx;
      }
    } else {
      let paddle = player1.coordinates(
        player1.x,
        player1.y,
        player1.width,
        player1.height,
      );
      let [leftX, rightX, topY, bottomY] = paddle;
      if (
        this.x - this.radius <= rightX &&
        this.x - this.radius >= leftX &&
        this.y >= topY &&
        this.y <= bottomY
      ) {
        this.vx = -this.vx;
      }
    }
  }

  /**
   * @function
   * @name reset
   * Resets the ball back to the starting point.
   */
  reset() {
    this.x = this.boardWidth / 2;
    this.y = this.boardHeight / 2;
    this.vy = 0;

    while (this.vy === 0) {
      this.vy = Math.floor(Math.random() * 10 - 5);
    }
    this.vx = this.direction * (6 - Math.abs(this.vy));
  }

  /**
   * @function
   * @name goal
   * Logic for keeping track of score, and resetting the ball.
   */
  goal(player) {
    player.score++;
    this.reset();
  }

  render(svg, player1, player2) {
    // Sets up logic for ball movement
    this.x += this.vx;
    this.y += this.vy;
    this.wallCollision();
    this.paddleCollision(player1, player2);

    // Creates ball within HTML element
    let circle = document.createElementNS(SVG_NS, 'circle');
    circle.setAttributeNS(null, 'r', this.radius);
    circle.setAttributeNS(null, 'cx', this.x);
    circle.setAttributeNS(null, 'cy', this.y);
    circle.setAttributeNS(null, 'fill', 'white');
    svg.appendChild(circle);

    //Detects goals scored by each player
    const rightGoal = this.x + this.radius >= this.boardWidth;
    const leftGoal = this.x - this.radius <= 0;

    if (rightGoal) {
      this.goal(player1);
      this.direction = 1;
    } else if (leftGoal) {
      this.goal(player2);
      this.direction = -1;
    }
  }
}
