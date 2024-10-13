import React from 'react';
import {Appointment, Time, Video} from '../../assets/svgs';
import {spacing} from '../../theme/spacing';
import {moderateScale} from '../../utils';
import {Box} from '../Box';
import {Text} from '../Text';

export const Upcoming = () => {
  return (
    <Box borderRadius={spacing.m} mt="ml" backgroundColor="primary300">
      <Box
        paddingHorizontal="n"
        flexDirection="row"
        paddingVertical="l"
        alignItems="center"
        justifyContent="space-between">
        <Text variant="medium" fontSize={moderateScale(13)}>
          Upcoming Schedule
        </Text>
        <Text variant="regular" color="black">
          See All
        </Text>
      </Box>
      {/* White background */}
      <Box
        borderRadius={spacing.m}
        paddingHorizontal="n"
        pb="l"
        backgroundColor="white">
        <Box gap="n" paddingVertical="m">
          <Box gap="s" flexDirection="row" alignItems="center">
            <Appointment />
            <Text variant="regular" fontSize={moderateScale(13)} color="black">
              Monday, 7 October
            </Text>
          </Box>
          <Box gap="s" flexDirection="row" alignItems="center">
            <Time />
            <Text variant="regular" fontSize={moderateScale(13)} color="black">
              09:30 AM - 10:30 AM
            </Text>
          </Box>
        </Box>
        <Box height={0.5} backgroundColor="greyLight2" />

        <Box
          pt="m"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between">
          <Box gap="n" flexDirection="row" alignItems="center">
            <Box
              height={50}
              width={50}
              borderRadius={100}
              backgroundColor="primaryLight"
            />
            <Box gap="s">
              <Text variant="regular" fontSize={moderateScale(13)}>
                Neurologist
              </Text>
              <Text variant="buttonLabel">Dr. Yusuf Smith</Text>
            </Box>
          </Box>
          <Box
            backgroundColor="blueLight"
            height={40}
            width={40}
            justifyContent="center"
            alignItems="center"
            borderRadius={moderateScale(100)}>
            <Video />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
