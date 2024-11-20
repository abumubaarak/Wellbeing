import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable} from 'react-native';
import {MapPin, RatingN, Review, Star, Verified} from '../../assets/svgs';
import {StackNavigation} from '../../navigators';
import {doctorReview, moderateScale} from '../../utils';
import {Avatar} from '../Avatar';
import {Box} from '../Box';
import {CircularLoader} from '../Loader';
import {Text} from '../Text';

type DoctorListProps = {
  data: FirebaseFirestoreTypes.DocumentData[];
  isLoading: boolean;
};
export const DoctorList = ({data, isLoading}: DoctorListProps) => {
  const navigation = useNavigation<StackNavigation>();

  const onPress = (index: number) => {
    navigation.navigate('DoctorDetails', {doctor: data[index]});
  };
  return (
    <>
      {data ? (
        data.map((item, index) => (
          <Pressable key={index} onPress={() => onPress(index)}>
            <Box mt="m">
              <Box flexDirection="row" gap="n" alignItems="center">
                <Avatar uri={item?.selfie} wnh={50} />

                {/* Right Content Info */}
                <Box>
                  <Text variant="regular" fontSize={moderateScale(13)}>
                    {item?.specialty}
                  </Text>
                  <Box gap="s" flexDirection="row" alignItems="center">
                    <Text variant="buttonLabel" fontSize={moderateScale(13)}>
                      {item?.fullName}
                    </Text>
                    <Verified />
                  </Box>

                  {/* Review,Rating,Location */}
                  <Box flexDirection="row" gap="s" pt="s">
                    <Box flexDirection="row" alignItems="center" gap="s">
                      <Review />
                      <Text fontSize={moderateScale(12)}>
                        {doctorReview(item?.review)}
                      </Text>
                    </Box>
                    <Text>|</Text>
                    <Box flexDirection="row" alignItems="center" gap="s">
                      {!item?.rating ? <RatingN /> : <Star />}

                      <Text>{item?.rating ?? 0}</Text>
                    </Box>
                    <Text>|</Text>
                    <Box flexDirection="row" alignItems="center" gap="s">
                      <MapPin />
                      <Text fontSize={moderateScale(12)}>{item?.country}</Text>
                    </Box>
                  </Box>
                </Box>
              </Box>
              {/* LINE */}
              <Box marginVertical="n" height={1} backgroundColor="greyLight2" />
            </Box>
          </Pressable>
        ))
      ) : (
        <Box flex={1} justifyContent="center" alignItems="center">
          <CircularLoader isLoading={isLoading} />
        </Box>
      )}
    </>
  );
};
