import {BottomSheetView} from '@gorhom/bottom-sheet';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StackNavigation} from '../../navigators';
import {isAndroid, ISPECIALISTS, moderateScale} from '../../utils';
import {$bottomSheetContainer} from '../AuthModal/style';
import {Box} from '../Box';
import {Button} from '../Button';
import {Text} from '../Text';
import {$container} from './styles';

type SpecialistInfoProps = {
  selectedItem: ISPECIALISTS;
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>;
};
export const SpecialistInfo = ({
  selectedItem,
  bottomSheetModalRef,
}: SpecialistInfoProps) => {
  const navigation = useNavigation<StackNavigation>();

  const insets = useSafeAreaInsets();
  const PADDING_BOTTOM = isAndroid ? 15 : insets.bottom;

  const onPress = () => {
    if (bottomSheetModalRef) {
      bottomSheetModalRef.current?.close();
      navigation.navigate('SpecialistDoctor', {area: selectedItem.name});
    }
  };
  return (
    <BottomSheetView
      style={[
        $bottomSheetContainer,
        $container,
        {paddingBottom: PADDING_BOTTOM},
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
      <Button label={`Explore ${selectedItem?.name}s`} onPress={onPress} />
    </BottomSheetView>
  );
};
