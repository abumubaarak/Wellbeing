import React from 'react-native';
import {Skottie} from 'react-native-skottie';
import {Loader} from '../../assets/lottie';
import {$skottie} from './styles';

type CircularLoaderProps = {
  isLoading: boolean;
};

export const CircularLoader = ({isLoading}: CircularLoaderProps) => {
  return (
    <>
      {isLoading && (
        <Skottie
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
