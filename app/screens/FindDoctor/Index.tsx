import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
import React, {useMemo, useRef, useState} from 'react';
import {Dimensions, Pressable} from 'react-native';
import {Box, Dismiss, Screen, SpecialistCard, SpecialistInfo} from '../../components';
import {$indicator} from '../../components/AuthModal/style';
 import {
  ISPECIALISTS,
  SPECIALISTS,
  SPECIALISTS_INFO,
  verticalScale,
} from '../../utils';

export const FindDoctor = () => {
  const {width} = Dimensions.get('screen');
  const snapPoints = useMemo(() => ['1', '90%'], []);

  const [selectedItem, setSelectedItem] = useState<ISPECIALISTS>();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

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
          // style={{columnGap: width / 10}}
          alignItems="flex-start"
          justifyContent="space-between"
          rowGap="xl"
          flexWrap="wrap">
          {SPECIALISTS.map(({icon, name}, index) => (
            <>
              <Pressable
                key={index}
                onPress={() => {
                  index !== 11 && openModel(index);
                }}>
                <SpecialistCard
                  index={index}
                  icon={icon}
                  title={name}
                  wnh={width / 4.3}
                />
              </Pressable>
            </>
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
        <SpecialistInfo
          selectedItem={selectedItem!}
          bottomSheetModalRef={bottomSheetModalRef}
        />
      </BottomSheetModal>
    </>
  );
};
