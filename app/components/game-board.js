import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class GameBoard extends Component {
  @service store;

  get isPlayer1Turn() {
    return this.args.game.moves.length % 2 == 0;
  }

  @action
  async updateGame(element) {
    const game = this.args.game;
    const moves = await game.moves;

    moves.forEach((move) => {
      const cell = element.querySelector(
        `.cell[data-position="${move.position}"]`
      );

      cell.innerText = move.player == 'player1' ? 'x' : 'o';
      cell.classList.add('played');
    });
  }

  @action
  async playCell(event) {
    const cell = event.target;
    const position = cell.dataset.position;

    if (cell.classList.contains('played')) {
      return;
    }

    if (this.args.game.id == null) {
      await this.args.game.save();
    }

    let newMove = this.store.createRecord('move', {
      position: position,
      game: this.args.game,
    });

    try {
      await newMove.save();

      cell.innerText = this.isPlayer1Turn ? 'x' : 'o';
      cell.classList.add('played');
      this.args.game.moves.pushObject(newMove);
    } catch (error) {
      console.log(error);
    }
  }

  @action
  restartGame() {
    window.location.reload(true);
  }
}
