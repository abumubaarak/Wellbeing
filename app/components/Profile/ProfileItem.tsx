import React, {ReactNode} from 'react';
import {Pressable} from 'react-native';
import {ArrowRight} from '../../assets/svgs';
import {Colors} from '../../theme';
import {moderateScale} from '../../utils';
import {Box} from '../Box';
import {Text} from '../Text';

type ProfileItemProps = {
  title: string;
  bg: keyof Colors;
  icon: ReactNode;
  onPress: () => void;
};
export const ProfileItem = ({bg, icon, title, onPress}: ProfileItemProps) => {
  return (
    <Pressable
    onPress={onPress}
      style={({pressed}) => [
        pressed
          ? {
              opacity: 0.4,
              transform: [
                {
                  scale: 0.98,
                },
              ],
            }
          : {},
      ]}>
      <Box
        paddingVertical="l"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between">
        <Box flexDirection="row" alignItems="center" gap="n">
          <Box
            justifyContent="center"
            alignItems="center"
            width={35}
            height={35}
            backgroundColor={bg}
            borderRadius={9}>
            {icon}
            {/* <User /> */}
          </Box>
          <Text variant="medium" fontSize={moderateScale(15)}>
            {title}
          </Text>
        </Box>

        <ArrowRight />
      </Box>
    </Pressable>
  );
};
