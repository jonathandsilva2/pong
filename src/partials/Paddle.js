import { SVG_NS } from '../settings';

/**
 * Creates an instance of a paddle.
 * @class
 */
export default class Paddle {
  /**
   * @constructor
   * @param {number} Height of the board
   * @param {number} Width of the paddle
   * @param {number} Height of the paddle
   * @param {number} Position of paddle on the board along the X-axis
   * @param {number} Position of paddle on the board along the Y-axis
   * @param {string} Keystroke as a string for the up movement
   * @param {string} Keystroke as a string for the down movement
   */
  constructor(boardHeight, width, height, x, y, up, down) {
    this.boardHeight = boardHeight;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed = 10;
    this.score = 0;

    // Adds a listener for up and down movement buttons
    document.addEventListener('keydown', (event) => {
      switch (event.key) {
        case up:
          this.y = Math.max(0, this.y - this.speed);
          break;

        case down:
          this.y = Math.min(
            this.boardHeight - this.height,
            this.y + this.speed,
          );
          break;
      }
    });
  }

  /**
   * @function
   * @name coordinates
   * @param {number} Initial starting point of the paddle along the x-axis of the board.
   * @param {number} Initial starting point of the paddle along the y-axis of the board.
   * @param {number} Width of the paddle.
   * @param {number} Height of the paddle.
   * @returns {[...coordinates]} An array of the coordinates of the four corners of the paddle.
   */
  coordinates(x, y, width, height) {
    let leftX = x;
    let rightX = x + width;
    let topY = y;
    let bottomY = y + height;
    return [leftX, rightX, topY, bottomY];
  }

  render(svg) {
    // Renders the paddle to the board
    let rect = document.createElementNS(SVG_NS, 'rect');
    rect.setAttributeNS(null, 'fill', 'white');
    rect.setAttributeNS(null, 'width', this.width);
    rect.setAttributeNS(null, 'height', this.height);
    rect.setAttributeNS(null, 'x', this.x);
    rect.setAttributeNS(null, 'y', this.y);
    svg.appendChild(rect);
  }
}
