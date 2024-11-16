import {appSchema, tableSchema} from '@nozbe/watermelondb';

export const schema = appSchema({
  version: 67,
  tables: [
    tableSchema({
      name: 'channels',
      columns: [
        {name: 'patient', type: 'string'},
        {name: 'doctor', type: 'string'},
        {name: 'sender', type: 'string'},
        {name: 'channel_name', type: 'string'},
        {name: 'channel_selfie', type: 'string'},
        {name: 'last_message', type: 'string'},
        ///Sent ->i.e Sent from the device to the sever
        //Read ->i.e received AND read by the user
        {name: 'delivery_status', type: 'string'},
        {name: 'updated_at', type: 'number'},
      ],
    }),
    tableSchema({
      name: 'messages',
      columns: [
        {name: 'message', type: 'string'},
        {name: 'doctor', type: 'string'},
        {name: 'patient', type: 'string', isIndexed: true},
        {name: 'sender', type: 'string'},
        {name: 'created_at', type: 'number'},
        ///Sent ->i.e Sent from the device to the sever
        //Read ->i.e received AND read by the user
        {name: 'delivery_status', type: 'string'},
      ],
    }),
  ],
});
