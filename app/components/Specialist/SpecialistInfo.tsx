import {BottomSheetView} from '@gorhom/bottom-sheet';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ISPECIALISTS, moderateScale} from '../../utils';
import {$bottomSheetContainer} from '../AuthModal/style';
import {Box} from '../Box';
import {Button} from '../Button';
import {Text} from '../Text';
import {$container} from './styles';

type SpecialistInfoProps = {
  selectedItem: ISPECIALISTS;
};
export const SpecialistInfo = ({selectedItem}: SpecialistInfoProps) => {
  const insets = useSafeAreaInsets();

  return (
    <BottomSheetView
      style={[
        $bottomSheetContainer,
        $container,
        {paddingBottom: insets.bottom},
      ]}>
      <Box flex={1} gap="l">
        <Box>
          <Text variant="mSemiBold" fontSize={moderateScale(20)}>
            💡 Summary
          </Text>
          <Text pt="s" lineHeight={23} fontSize={moderateScale(15)}>
            {selectedItem?.summary}
          </Text>
        </Box>
        <Box>
          <Text variant="mSemiBold" fontSize={moderateScale(20)}>
            {`🤔 So, When to See a ${selectedItem?.who}:`}
          </Text>
          <Text pt="s" lineHeight={23} fontSize={moderateScale(15)}>
            {selectedItem?.when}
          </Text>
        </Box>
      </Box>
      <Button label={`Explore ${selectedItem?.name}s`} />
    </BottomSheetView>
  );
};
