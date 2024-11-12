import {Model} from '@nozbe/watermelondb';
import {date, field, readonly} from '@nozbe/watermelondb/decorators';

export default class ChannelModel extends Model {
  static table = 'channels';

  // @ts-ignore
  @field('patient') patient;
  // @ts-ignore
  @field('doctor') doctor;
  // @ts-ignore
  @field('sender') sender;
  // @ts-ignore
  @field('channel_name') channelName;
  // @ts-ignore
  @field('channel_selfie') channelSelfie;
  // @ts-ignore
  @field('last_message') lastMessage;
  // @ts-ignore
  @field('delivery_status') deliverStatus;
  // @ts-ignore
  @readonly @date('updated_at') updatedAt;
}
