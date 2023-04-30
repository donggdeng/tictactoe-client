import Model, { attr } from '@ember-data/model';

export default class GamesModel extends Model {
  @attr player1;
  @attr player2;
  @attr status;
}
