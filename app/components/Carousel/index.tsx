import React from 'react';
import {useTranslation} from 'react-i18next';
import {Dimensions} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {Translation} from '../../i18n';
import {carouselData, isRTL} from '../../utils';
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
  const {t} = useTranslation();

  const translation: Translation = t('translation', {
    returnObjects: true,
  });
  const i18nRTL = isRTL ? translation.reverse() : translation;
  const data = isRTL ? carouselData.reverse() : carouselData;
  const defaultIndex = isRTL ? carouselData.length - 1 : 0;
  return (
    <Carousel
      loop={false}
      autoPlayInterval={1500}
      width={width}
      defaultIndex={defaultIndex}
      data={data}
      pagingEnabled={true}
      onSnapToItem={onSnapToItem}
      renderItem={({item, index}) => (
        <Box
          key={index}
          style={[$container]}
          flex={1}
          overflow="hidden"
          width={width}>
          <Box
            style={$card}
            backgroundColor="primary800"
            height="66%"
            alignItems="center"
            justifyContent="center">
            {item.icon}
          </Box>
          <Box style={$labelContainer}>
            <Text
              textAlign="center"
              numberOfLines={2}
              variant="mSemiBold"
              style={$labelHeading}>
              {i18nRTL[index].title}
            </Text>
            <Text
              paddingTop="s"
              variant="regular"
              textAlign="center"
              style={$labelSummary}>
              {i18nRTL[index].summary}
            </Text>
          </Box>
        </Box>
      )}
    />
  );
};
