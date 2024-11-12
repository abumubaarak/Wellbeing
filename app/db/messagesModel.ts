import {Model} from '@nozbe/watermelondb';
import {date, field, readonly} from '@nozbe/watermelondb/decorators';

export default class MessagesModel extends Model {
  static table = 'messages';

  // @ts-ignore
  @field('message') message;
  // @ts-ignore
  @field('doctor') doctor;
  // @ts-ignore
  @field('patient') patient;
  // @ts-ignore
  @field('sender') sender;
  // @ts-ignore
  @field('delivery_status') deliveryStatus;
  // @ts-ignore
  @readonly @date('created_at') createdAt;
}
