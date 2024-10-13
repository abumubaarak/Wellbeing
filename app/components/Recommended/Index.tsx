import React, {useEffect} from 'react';
import FastImage from 'react-native-fast-image';
import {MapPin, Review, Star, Verified} from '../../assets/svgs';
import {useFirestore} from '../../hooks/useFirestore';
import {doctorReview, moderateScale} from '../../utils';
import {Box} from '../Box';
import {CircularLoader} from '../Loader';
import {Text} from '../Text';
import {$image} from './styles';

export const Recommended = () => {
  const {isLoading, recommendedDoctors, data} = useFirestore();

  useEffect(() => {
    (async () => {
      await recommendedDoctors();
    })();
  }, [recommendedDoctors]);
  return (
    <Box mt="ll" mb="n">
      <Text variant="medium" fontSize={moderateScale(13)}>
        Recommended
      </Text>

      {data ? (
        data.map((item, index) => (
          <Box mt="m" key={index}>
            <Box flexDirection="row" gap="n" alignItems="center">
              <FastImage
                style={$image}
                source={{
                  uri: item?.selfie,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.center}
              />

              {/* Right Content Info */}
              <Box>
                <Text variant="regular" fontSize={moderateScale(13)}>
                  {item?.specialty}
                </Text>
                <Box gap="s" flexDirection="row" alignItems="center">
                  <Text variant="buttonLabel">{item?.fullName}</Text>
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
                    <Star />
                    <Text>{item?.rating}</Text>
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
        ))
      ) : (
        <Box flex={1} justifyContent="center" alignItems="center">
          <CircularLoader isLoading={isLoading} />
        </Box>
      )}
    </Box>
  );
};
