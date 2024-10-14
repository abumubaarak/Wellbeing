import React from 'react';
import {Pressable} from 'react-native';
import {NavigationState, SceneRendererProps} from 'react-native-tab-view';
import {Box, Text} from '../../components';
import {moderateScale} from '../../utils';
import {$container, $line, $pressable} from './styles';

type TabHeaderProps = {
  scene: SceneRendererProps & {
    navigationState: NavigationState<{key: string; title: string}>;
  };
  index: number;
  onTabItemPress: (item: number) => void;
};
export const TabHeader = ({scene, index, onTabItemPress}: TabHeaderProps) => {
  return (
    <Box paddingBottom="m" style={$container}>
      <Box gap="ml" flexDirection="row" alignItems="flex-end">
        {scene.navigationState.routes.map((route, i) => {
          return (
            <Pressable
              key={i}
              style={$pressable}
              onPress={() => onTabItemPress(i)}>
              <Box>
                <Text
                  variant={index === i ? 'buttonLabel' : 'regular'}
                  fontSize={moderateScale(15)}
                  lineHeight={moderateScale(22)}>
                  {route.title}
                </Text>

                <Box
                  opacity={index === i ? 1 : 0}
                  mt="xs"
                  backgroundColor="primary500"
                  height={4}
                  marginHorizontal="s"
                  borderRadius={10}
                />
              </Box>
            </Pressable>
          );
        })}
      </Box>

      <Box style={$line} height={1} backgroundColor="greyLight2" />
    </Box>
  );
};
