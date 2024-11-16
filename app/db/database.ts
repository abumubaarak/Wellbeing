import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import ChannelModel from './channelModel';
import MessagesModel from './messagesModel';
import {schema} from './schema';

const adapter = new SQLiteAdapter({
  schema,
});
export const database = new Database({
  adapter,
  modelClasses: [MessagesModel, ChannelModel],
});
