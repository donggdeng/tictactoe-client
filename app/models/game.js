import Model, { attr, hasMany } from '@ember-data/model';

export default class Game extends Model {
  @attr status;
  @attr winner;
  @hasMany('move', { async: true, inverse: null }) moves;
}
