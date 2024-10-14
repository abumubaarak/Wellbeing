import React from 'react';
import {ScrollView} from 'react-native';
import {Text} from '../../components';
import {moderateScale} from '../../utils';
import {$container} from './styles';

type AboutTabProps = {
  bio: string;
};
export const AboutTab = ({bio}: AboutTabProps) => {
  return (
    <ScrollView style={$container}>
      <Text
        color="black"
        fontSize={moderateScale(15)}
        variant="regular"
        textAlign="left"
        lineHeight={moderateScale(27)}>
        {bio}
      </Text>
    </ScrollView>
  );
};
