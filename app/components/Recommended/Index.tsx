import React from 'react';
import {MapPin, Review, Star, Verified} from '../../assets/svgs';
import {moderateScale} from '../../utils';
import {Box} from '../Box';
import {Text} from '../Text';

export const Recommended = () => {
  return (
    <Box mt="ll">
      <Text variant="medium" fontSize={moderateScale(13)}>
        Recommended
      </Text>

      <Box mt="m">
        <Box flexDirection="row" gap="n" alignItems="center">
          <Box
            height={50}
            width={50}
            borderRadius={100}
            backgroundColor="primaryLight"
          />
          {/* Right Content Info */}
          <Box>
            <Text variant="regular" fontSize={moderateScale(13)}>
              Neurologist
            </Text>
            <Box gap="s" flexDirection="row" alignItems="center">
              <Text variant="buttonLabel">Dr. Yusuf Smith</Text>
              <Verified />
            </Box>

            {/* Review,Rating,Location */}
            <Box flexDirection="row" gap="s" pt="s">
              <Box flexDirection="row" alignItems="center" gap="s">
                <Review />
                <Text fontSize={moderateScale(12)}>40 Reviews</Text>
              </Box>
              <Text>|</Text>
              <Box flexDirection="row" alignItems="center" gap="s">
                <Star />
                <Text>4.2</Text>
              </Box>
              <Text>|</Text>
              <Box flexDirection="row" alignItems="center" gap="s">
                <MapPin />
                <Text fontSize={moderateScale(12)}>Uzbekistan</Text>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* LINE */}
        <Box marginVertical="n" height={1} backgroundColor="greyLight2" />
        <Box flexDirection="row" gap="n" alignItems="center">
          <Box
            height={50}
            width={50}
            borderRadius={100}
            backgroundColor="primaryLight"
          />
          {/* Right Content Info */}
          <Box>
            <Text variant="regular" fontSize={moderateScale(13)}>
              Cardiology
            </Text>
            <Box gap="s" flexDirection="row" alignItems="center">
              <Text variant="buttonLabel">Dr. Muawiya</Text>
              <Verified />
            </Box>

            {/* Review,Rating,Location */}
            <Box flexDirection="row" gap="s" pt="s">
              <Box flexDirection="row" alignItems="center" gap="s">
                <Review />
                <Text fontSize={moderateScale(12)}>35 Reviews</Text>
              </Box>
              <Text>|</Text>
              <Box flexDirection="row" alignItems="center" gap="s">
                <Star />
                <Text>4.5</Text>
              </Box>
              <Text>|</Text>
              <Box flexDirection="row" alignItems="center" gap="s">
                <MapPin />
                <Text fontSize={moderateScale(12)}>Singapore</Text>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* LINE */}
        <Box marginVertical="n" height={1} />
      </Box>
    </Box>
  );
};
