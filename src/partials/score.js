import { SVG_NS } from '../settings';

/**
 * Creates an instance of the scoreboard for tracking points scored.
 * @class
 */
export default class Score {
  /**
   * @constructor
   * @param {number} x - Position on the gameboard of the scoreboard along the x-axis.
   * @param {number} y - Position on the gameboard of the scoreboard along the y-axis.
   * @param {number} size - Font-size of the numbers of the scoreboard.
   */
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }
  render(svg, score) {
    // Renders the score board to the gameboard.
    let text = document.createElementNS(SVG_NS, 'text');
    text.setAttributeNS(null, 'x', this.x);
    text.setAttributeNS(null, 'y', this.y);
    text.setAttributeNS(null, 'font-family', '"Silkscreen Web", monotype');
    text.setAttributeNS(null, 'font-size', this.size);
    text.setAttributeNS(null, 'fill', 'white');
    text.textContent = score;
    svg.appendChild(text);
  }
}
