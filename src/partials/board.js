import { SVG_NS } from '../settings';

/**
 * Creates an instance of the game board of the pong game.
 * @class
 */
export default class Board {
  /**
   * @constructor
   * @param {number} width - Width of the game board.
   * @param {number} height - Height of the game board.
   */
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  render(svg) {
    // Creates the game board base structure.
    let rect = document.createElementNS(SVG_NS, 'rect');
    rect.setAttributeNS(null, 'fill', '#353535');
    rect.setAttributeNS(null, 'width', this.width);
    rect.setAttributeNS(null, 'height', this.height);

    // Creates a dashed line that seperates the game board into two halves.
    let line = document.createElementNS(SVG_NS, 'line');
    line.setAttributeNS(null, 'x1', this.width / 2);
    line.setAttributeNS(null, 'y1', 0);
    line.setAttributeNS(null, 'x2', this.width / 2);
    line.setAttributeNS(null, 'y2', this.height);
    line.setAttributeNS(null, 'stroke', 'white');
    line.setAttributeNS(null, 'stroke-dasharray', '20, 15');
    line.setAttributeNS(null, 'stroke-width', '4');

    // Renders the game board.
    svg.appendChild(rect);
    svg.appendChild(line);
  }
}
