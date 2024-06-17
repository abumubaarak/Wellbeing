import React from 'react';
import {Dimensions} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {carouselData} from '../../utils';
import {Box} from '../Box';
import {Text} from '../Text';
import {
  $card,
  $container,
  $labelContainer,
  $labelHeading,
  $labelSummary,
} from './style';

type OnboardingCarouselProps = {
  onSnapToItem: ((index: number) => void) | undefined;
};
export const OnboardingCarousel = ({onSnapToItem}: OnboardingCarouselProps) => {
  const {width} = Dimensions.get('window');

  return (
    <Carousel
      loop={false}
      width={width}
      data={carouselData}
      pagingEnabled={true}
      onSnapToItem={onSnapToItem}
      renderItem={({item, index}) => (
        <Box
          key={index}
          style={$container}
          flex={1}
          overflow="hidden"
          width={width}>
          <Box
            style={$card}
            backgroundColor="white"
            height="66%"
            alignItems="center"
            justifyContent="center">
            {item.icon}
          </Box>
          <Box style={$labelContainer}>
            <Text textAlign="center" variant="special" style={$labelHeading}>
              {item.title}
            </Text>
            <Text
              paddingTop="s"
              variant="regular"
              textAlign="center"
              style={$labelSummary}>
              {item.summary}
            </Text>
          </Box>
        </Box>
      )}
    />
  );
};
