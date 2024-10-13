import LottieView from 'lottie-react-native';
import React from 'react-native';
import {Loader} from '../../assets/lottie';
import {$skottie} from './styles';

type CircularLoaderProps = {
  isLoading: boolean;
};

export const CircularLoader = ({isLoading}: CircularLoaderProps) => {
  return (
    <>
      {isLoading && (
        <LottieView
          style={$skottie}
          resizeMode="cover"
          source={Loader}
          autoPlay={true}
          loop={true}
        />
      )}
    </>
  );
};
