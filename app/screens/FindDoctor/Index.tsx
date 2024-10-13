import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
import React, {useMemo, useRef, useState} from 'react';
import {Dimensions, Pressable} from 'react-native';
import {Box, Dismiss, Screen, SpecialistCard} from '../../components';
import {$indicator} from '../../components/AuthModal/style';
import {SpecialistInfo} from '../../components/Specialist';
import {
  ISPECIALISTS,
  SPECIALISTS,
  SPECIALISTS_INFO,
  verticalScale,
} from '../../utils';

export const FindDoctor = () => {
  const snapPoints = useMemo(() => ['1', '85%'], []);
  const width = Dimensions.get('screen').width;
  const [selectedItem, setSelectedItem] = useState<ISPECIALISTS>();

  const bottomSheetModalRef = useRef<BottomSheetModal>();

  const openModel = (index: any) => {
    setSelectedItem(SPECIALISTS_INFO[index]);
    bottomSheetModalRef.current?.present();
  };
  return (
    <>
      <Screen useAlignment>
        <Dismiss title="Find your Doctor" wnh={40} />
        <Box
          pt="l"
          flexDirection="row"
          mt="l"
          style={{columnGap: width / 8.3}}
          alignItems="flex-start"
          rowGap="xl"
          flexWrap="wrap">
          {SPECIALISTS.map(({icon, name}, index) => (
            <Pressable key={name} onPress={() => openModel(index)}>
              <SpecialistCard icon={icon} title={name} wnh={80} />
            </Pressable>
          ))}
        </Box>
      </Screen>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        backgroundStyle={{
          paddingTop: verticalScale(20),
        }}
        handleIndicatorStyle={$indicator}
        backdropComponent={BottomSheetBackdrop}
        snapPoints={snapPoints}>
        <SpecialistInfo selectedItem={selectedItem!} />
      </BottomSheetModal>
    </>
  );
};
