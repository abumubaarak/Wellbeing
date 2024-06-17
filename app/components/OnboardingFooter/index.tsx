import React from 'react';
import {Pressable, TouchableNativeFeedback} from 'react-native';
import {Box} from '../Box';
import {Text} from '../Text';
import {
  $button,
  $container,
  $getStartedContainer,
  $label,
  $labelLogin,
} from './style';

export const OnboardingFooter = () => {
  return (
    <Box style={$container} flexGrow={0.05} overflow="hidden">
      <Box style={$getStartedContainer} overflow="hidden">
        <TouchableNativeFeedback>
          <Box
            backgroundColor="primary300"
            justifyContent="center"
            alignItems="center"
            style={$button}>
            <Text style={$label} variant="buttonLabel">
              Get started
            </Text>
          </Box>
        </TouchableNativeFeedback>
      </Box>
      <Pressable>
        <Text variant="buttonLabel" style={[$label, $labelLogin]}>
          Login
        </Text>
      </Pressable>
    </Box>
  );
};
