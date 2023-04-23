import Model from '@ember-data/model';
import { attr, belongsTo } from '@ember-decorators/data';

export default class GameModel extends Model {
  @belongsTo player1;
  @belongsTo player2;
  @belongsTo winner;
  @attr status;
}
