import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import {Box} from '../Box';
import {$widthHeightStyle} from './styles';

export const Avatar = ({
  uri,
  doctorID,
  wnh,
}: {
  uri?: string;
  wnh?: number;
  doctorID?: string;
}) => {
  const [activeUsers, _] = useState<string>('');

  // const {uid} = useUser();

  // useEffect(() => {
  //   getOnlineUsers();
  // }, []);

  // const getOnlineUsers = async () => {
  //   const users = await associatedUsers();
  //   socket.emit('active', {users, me: uid});
  // };

  // socket.on('active', async data => {
  //   await getOnlineUsers();
  //   setActiveUser(data);
  // });
  return (
    <Box
      width={wnh ? wnh : 40}
      height={wnh ? wnh : 40}
      backgroundColor="primary300"
      borderRadius={100}>
      <FastImage
        style={[$widthHeightStyle(wnh)]}
        source={{
          uri,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      {activeUsers === doctorID && (
        <Box
          backgroundColor="primary500"
          width={17}
          height={17}
          bottom={0}
          borderWidth={1.5}
          right={1}
          position="absolute"
          borderRadius={100}
          borderColor="primary300"
        />
      )}
    </Box>
  );
};
