import React from 'react';
import {Pressable} from 'react-native';
import {spacing} from '../../theme/spacing';
import {formatTiming, moderateScale} from '../../utils';
import {Avatar} from '../Avatar';
import {Box} from '../Box';
import {Text} from '../Text';
import {$item} from './styles';

type TimelineItemProps = {
  onPress: (selfie: string, patientID: string, patientName: string) => void;
  item: any;
};

export const TimelineItem = ({onPress, item}: TimelineItemProps) => {
  return (
    <Box flexDirection="row" alignItems="flex-start" mt="s">
      <Text variant="medium" color="grey">
        {item?.time}
      </Text>
      {item?.data?.map(
        ({appointmentTime, doctorName, selfie, doctorID, specialty}) => (
          <Pressable
            key={item}
            style={$item}
            onPress={() => onPress(selfie, doctorID, doctorName)}>
            <Box>
              <Box height={1} backgroundColor="greyLight2" />
              <Box
                paddingHorizontal="n"
                paddingVertical="m"
                mt="n"
                gap="n"
                borderLeftWidth={3}
                borderColor="primary500"
                flexDirection="row"
                backgroundColor="primary50"
                borderRadius={spacing.n}>
                <Avatar wnh={40} uri={selfie} />

                <Box overflow="hidden" flexDirection="row">
                  <Box gap="n">
                    <Text
                      adjustsFontSizeToFit
                      numberOfLines={1}
                      variant="mSemiBold"
                      fontSize={moderateScale(13)}>
                      {doctorName}
                    </Text>
                    <Text color="grey">{specialty}</Text>

                    <Text
                      color="black"
                      fontSize={moderateScale(14)}>
                      {formatTiming(
                        appointmentTime[0].startTime,
                        appointmentTime[0].endTime,
                      )}
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Pressable>
        ),
      )}
    </Box>
  );
};
