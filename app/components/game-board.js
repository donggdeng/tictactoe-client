import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class GameBoard extends Component {
  @service store;

  get isPlayer1Turn() {
    return this.args.game.moves.length % 2 == 0;
  }

  get isGameOver() {
    return this.args.game.status == 'finished';
  }

  get isDraw() {
    return this.args.game.winner == 'draw';
  }

  @action
  async updateGame(element) {
    const moves = await this.args.game.moves;

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
    const gameBoardElement = cell.closest('.game-board');
    const position = cell.dataset.position;

    if (gameBoardElement.classList.contains('finished')) {
      return;
    }

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

      this.updateCell(cell);
      await this.args.game.moves.reload();
      this.updateGameStatus(gameBoardElement);
    } catch (error) {
      console.log(error);
    }
  }

  @action
  restartGame() {
    window.location.reload(true);
  }

  updateCell(cell) {
    cell.innerText = this.isPlayer1Turn ? 'x' : 'o';
    cell.classList.add('played');
  }

  async updateGameStatus(gameBoardElement) {
    await this.args.game.reload();

    if (this.args.game.status == 'finished') {
      gameBoardElement.classList.add('finished');
    }
  }
}
