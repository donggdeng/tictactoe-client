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
  async playCell(event) {
    if (this.isGameOver) {
      return;
    }

    const cell = event.target;
    const position = cell.dataset.position;

    if (this.isCellPlayed(cell)) {
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
      this.updateGameStatus(cell);
    } catch (error) {
      console.log(error);
    }
  }

  @action
  mouseEnterCell(event) {
    if (this.isGameOver) {
      return;
    }

    const cell = event.target;

    if (this.isCellPlayed(cell)) {
      return;
    }

    cell.innerText = this.isPlayer1Turn ? 'x' : 'o';
  }

  @action
  mouseLeaveCell(event) {
    if (this.isGameOver) {
      return;
    }

    const cell = event.target;

    if (this.isCellPlayed(cell)) {
      return;
    }

    cell.innerText = '';
  }

  @action
  restartGame() {
    window.location.reload(true);
  }

  isCellPlayed(cell) {
    return cell.classList.contains('played');
  }

  updateCell(cell) {
    cell.innerText = this.isPlayer1Turn ? 'x' : 'o';
    cell.classList.add('played');
  }

  async updateGameStatus(cell) {
    await this.args.game.reload();

    if (this.isGameOver) {
      const gameBoardElement = cell.closest('.game-board');
      gameBoardElement.classList.add('finished');
    }
  }
}
