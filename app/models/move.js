import Model, { attr, belongsTo } from '@ember-data/model';

export default class MoveModel extends Model {
  @attr position;
  @attr playerId;
  @belongsTo('game', { async: true, inverse: null }) game;
}
