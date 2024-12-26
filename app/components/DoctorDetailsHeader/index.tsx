import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {MapPin, Verified} from '../../assets/svgs';
import {moderateScale} from '../../utils';
import {Box} from '../Box';
import {Text} from '../Text';
import {$image, $verify} from './styles';

type DoctorDetailsHeaderProps = {
  doctorDetails: FirebaseFirestoreTypes.DocumentData;
};
export const DoctorDetailsHeader = ({
  doctorDetails,
}: DoctorDetailsHeaderProps) => {
  const country = doctorDetails?.country;
  return (
    <>
      <Box flexDirection="row" gap="m">
        {/* Avatar */}
        <Box flexDirection="row" alignItems="flex-end">
          <FastImage
            style={$image}
            source={{
              uri: doctorDetails?.selfie,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <Verified height={25} width={22} style={$verify} />
        </Box>
        {/* Info */}
        <Box gap="s">
          <Text variant="buttonLabel" fontSize={moderateScale(16)}>
            {doctorDetails?.fullName}
          </Text>
          <Text variant="regular" fontSize={moderateScale(14)}>
            {doctorDetails?.specialty}
          </Text>
          <Box flexDirection="row" alignItems="center" gap="s">
            <MapPin />
            <Text fontSize={moderateScale(12)}>{country}</Text>
          </Box>
        </Box>
      </Box>
      {/* LINE */}
      <Box marginVertical="l" height={1} backgroundColor="greyLight2" />
    </>
  );
};
