import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class GameBoard extends Component {
  @action
  async updateGame(element) {
    const game = this.args.game;
    const moves = await game.moves;

    moves.forEach((move) => {
      const cell = element.querySelector(
        `.cell[data-position="${move.position}"]`
      );

      cell.innerText = move.player == 'player1' ? 'x' : 'o';
    });
  }
}
