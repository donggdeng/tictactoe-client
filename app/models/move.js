import Model, { attr, belongsTo } from '@ember-data/model';

export default class MoveModel extends Model {
  @attr position;
  @attr player;
  @belongsTo('game', { async: true, inverse: null }) game;
}
