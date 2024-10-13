import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {useNavigation} from '@react-navigation/native';
import React, {useMemo, useRef, useState} from 'react';
import {Pressable} from 'react-native';
import {StackNavigation} from '../../navigators';
import {
  ISPECIALISTS,
  moderateScale,
  SPECIALISTS_HOME,
  SPECIALISTS_INFO,
  verticalScale,
} from '../../utils';
import {$indicator} from '../AuthModal/style';
import {Box} from '../Box';
import {Text} from '../Text';
import {SpecialistCard} from './SpecialistCard';
import {SpecialistInfo} from './SpecialistInfo';

export const SpecialistCategory = () => {
  const navigation = useNavigation<StackNavigation>();
  const snapPoints = useMemo(() => ['1', '85%'], []);

  const bottomSheetModalRef = useRef<BottomSheetModalMethods>(null);
  const [selectedItem, setSelectedItem] = useState<ISPECIALISTS>();

  const seeAll = () => {
    navigation.navigate('FindDoctor');
  };
  const openModel = (index: any) => {
    setSelectedItem(SPECIALISTS_INFO[index]);
    bottomSheetModalRef.current?.present();
  };

  return (
    <Box mt="ml">
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between">
        <Text variant="medium" fontSize={moderateScale(13)}>
          Find your doctor
        </Text>
        <Pressable onPress={seeAll}>
          <Text variant="regular" color="black">
            See All
          </Text>
        </Pressable>
      </Box>
      <Box pt="l" flexDirection="row" justifyContent="space-between">
        {SPECIALISTS_HOME.map(({icon, name}, index) => (
          <Pressable key={name} onPress={() => openModel(index)}>
            <SpecialistCard icon={icon} title={name} wnh={55} />
          </Pressable>
        ))}
      </Box>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        backgroundStyle={{
          paddingTop: verticalScale(20),
        }}
        handleIndicatorStyle={$indicator}
        backdropComponent={BottomSheetBackdrop}
        snapPoints={snapPoints}>
        <SpecialistInfo
          selectedItem={selectedItem!}
          bottomSheetModalRef={bottomSheetModalRef}
        />
      </BottomSheetModal>
    </Box>
  );
};
