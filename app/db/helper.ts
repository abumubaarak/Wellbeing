import {Q} from '@nozbe/watermelondb';
import ChannelModel from './channelModel';
import {database} from './database';
import MessagesModel from './messagesModel';

type IChannel = {
  lastMessage: string;
  doctor: string;
  patient: string;
  sender: string;
  deliveryStatus: string;
  updatedAt: string;
  channelName: string;
  channelSelfie: string;
};

type IMessage = Omit<
  IChannel,
  'lastMessage' | 'updatedAt' | 'channelName' | 'channelSelfie'
> & {
  message: string;
};

export const messageCollection =
  database.collections.get<MessagesModel>('messages');

export const channelCollection =
  database.collections.get<ChannelModel>('channels');
//  messageCollection.query(Q.where('doctor', doctor)).observe();
//doctor: string
export const observeMessage = () => messageCollection.query().observe();
export const observeChannels = () =>
  channelCollection.query().observeWithColumns(['updated_at']);
//WithColumns(['message', 'delivery_status']);
export const observeChannelCount = () =>
  channelCollection
    .query()
    .observeWithColumns(['last_message', 'delivery_status']);

export const observeUnreadCount = (id: string) =>
  messageCollection
    .query(Q.where('delivery_status', 'delivered'), Q.where('sender', id))
    .observe();

export const unreadCount = () =>
  messageCollection.query(Q.where('delivery_status', 'delivered')).observe();

export const observeDeliveryStatus = () =>
  messageCollection.query().observeWithColumns(['delivery_status']);

export const sendMessage = async (message: IMessage) => {
  //Both ID AND patient are unique:i.e a doctor cant have different conversation with the same patient twice.
  const findChannel = await channelCollection.query(
    Q.where('doctor', message.doctor),
    Q.take(1),
  );
  const updateChannel = findChannel[0];

  const write = await database.write(async () => {
    const newMessage = await messageCollection.create(record => {
      record.message = message.message;
      record.doctor = message.doctor;
      record.patient = message.patient;
      record.sender = message.sender;
      record.deliveryStatus = message.deliveryStatus;
    });

    updateChannel.update(() => {
      updateChannel.lastMessage = message.message;
      updateChannel.deliverStatus = message.deliveryStatus;
      updateChannel.sender = message.sender;
    });
    return newMessage;
  });
  return write;
};

export const updateDeliveryStatus = async (
  deliveryStatus: string,
  messageID: string,
) => {
  const findMessage = await messageCollection.find(messageID);
  const findChannel = await channelCollection.query(
    Q.where('doctor', findMessage?.doctor),
  );
  const updateChannel = findChannel[0];
  if (findMessage) {
    await database.write(async () => {
      await findMessage.update(() => {
        findMessage.deliveryStatus = deliveryStatus;
      });
      await updateChannel.update(() => {
        updateChannel.deliverStatus = deliveryStatus;
      });
    });
  }
  return updateChannel;
};

export const offlineMessages = async () => {
  const pendingMessages = await messageCollection
    .query(Q.where('delivery_status', 'pending'))
    .fetch();

  return pendingMessages;
};

export const updateAllDeliveryStatus = async (
  deliveryStatus: string,
  value: string,
  column: string,
) => {
  const findMessage = await messageCollection
    .query(
      Q.where(column, value),
      Q.where('delivery_status', Q.oneOf(['delivered', 'sent'])),
    )
    .fetch();
  const findChannel = await channelCollection.query(
    Q.where(column, value),
    Q.where('delivery_status', Q.oneOf(['delivered', 'sent'])),
  );

  const updateChannel = findChannel[0];

  if (findMessage.length > 0) {
    await database.write(async () => {
      findMessage.map(async message => {
        await message.update(() => {
          message.deliveryStatus = deliveryStatus;
        });
      });

      await updateChannel.update(() => {
        updateChannel.deliverStatus = deliveryStatus;
      });
    });
  }
};

export const associatedUsers = async () => {
  const users = (
    await channelCollection.query(Q.sortBy('channel_name', Q.asc))
  ).map(user => user.doctor);
  return users;
};

export const addChannel = async (channel: Omit<IChannel, 'updatedAt'>) => {
  const findChannel = await channelCollection.query(
    Q.where('doctor', channel.doctor),
  ).count;
  if (findChannel === 0) {
    const write = await database.write(async () => {
      const newChannel = await channelCollection.create(record => {
        record.lastMessage = channel.lastMessage;
        record.doctor = channel.doctor;
        record.patient = channel.patient;
        record.deliverStatus = channel.deliveryStatus;
        record.sender = channel.sender;
        record.channelName = channel.channelName;
        record.channelSelfie = channel.channelSelfie;
      });

      await messageCollection.create(record => {
        record.message = channel.lastMessage;
        record.doctor = channel.doctor;
        record.patient = channel.patient;
        record.sender = channel.sender;
        record.deliveryStatus = channel.deliveryStatus;
      });

      return newChannel;
    });
    return write;
  }
};
