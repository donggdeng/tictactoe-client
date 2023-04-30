import Model, { attr, hasMany } from '@ember-data/model';

export default class Game extends Model {
  @attr player1;
  @attr player2;
  @attr status;
  @hasMany('move', { async: true, inverse: null }) moves;
}
