import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {CheckMark} from '../../assets/svgs';
import {Box, Button, Screen, Text} from '../../components';
import {AppStackParamList, StackNavigation} from '../../navigators';
import {spacing} from '../../theme/spacing';
import {moderateScale} from '../../utils';
import {$bookingCircle} from '../styles';

export const BookingStatus = () => {
  const {params} = useRoute<RouteProp<AppStackParamList, 'BookingStatus'>>();
  const navigation = useNavigation<StackNavigation>();
  const goHomeOrGoHard = () => {
    navigation.navigate('HomeTab');
  };
  return (
    <Screen useAlignment>
      <Box gap="ll" flex={1} justifyContent="center" alignItems="center">
        <Box
          style={$bookingCircle}
          borderRadius={spacing.borderRadius}
          backgroundColor="primary300"
          width={160}
          justifyContent="center"
          alignItems="center"
          height={160}>
          <CheckMark width={100} height={100} />
        </Box>
        <Box gap="n" alignItems="center">
          <Text variant="mSemiBold" fontSize={moderateScale(24)}>
            Booking Successful
          </Text>
          <Text
            lineHeight={moderateScale(23)}
            textAlign="center"
            color="grey"
            fontSize={moderateScale(15)}>
            Your appointment with the{' '}
            <Text variant="mSemiBold">{params.doctorName.split(' ')[0]}</Text>{' '}
            has been successfully booked!
          </Text>
        </Box>
      </Box>
      {/* Intentional(smile) redirecting to home instead of viewing the details of what was booked */}
      <Button label="Back to Home" onPress={goHomeOrGoHard} />
    </Screen>
  );
};
