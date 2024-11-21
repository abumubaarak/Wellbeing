import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Image, Pressable} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useMMKVString} from 'react-native-mmkv';
import {Upload, UserFill} from '../../assets/svgs';
import {
  AnimatedBox,
  Box,
  Button,
  Dismiss,
  Dropdown,
  InputField,
  Option,
  Screen,
  Text,
} from '../../components';
import {useFirestore} from '../../hooks';
import useUpload from '../../hooks/useUpload';
import {spacing} from '../../theme/spacing';
import {formatDate, moderateScale} from '../../utils';
import {$avatar, $avatarContainer, $uploadContainer} from '../styles';

export const CompleteProfile = () => {
  const [userObject, _] = useMMKVString('user');

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const {uploadDocument, uploadError, path} = useUpload();

  const user = userObject && JSON.parse(userObject!);
  const snapPoints = useMemo(() => ['1', '26%'], []);
  const [open, setOpen] = useState(false);
  const [gender, setGender] = useState('');
  const [enable, setEnable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profilePic, setProfilePic] = useState('');
  const {updateProfile, data} = useFirestore(false);

  const [dob, setDOB] = useState<Date>();
  const maxDate = new Date();

  const {control, watch, getValues} = useForm({
    defaultValues: {
      fullName: user.fullName,
      email: user?.email,
      dob: '',
      gender: '',
    },
  });

  useEffect(() => {
    if (data.length === 1 || uploadError) {
      setIsLoading(false);
    }
  }, [data, uploadError]);
  const openGallery = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
    });
    setProfilePic(result?.assets![0]?.uri!);
  };

  useEffect(() => {
    if (path) {
      (async () => {
        await updateProfile(user.uid, {
          ...user,
          gender,
          dob,
          pic: path,
          verify: true,
        });
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  useEffect(() => {
    getValues('fullName') !== '' &&
    getValues('email') &&
    profilePic &&
    gender &&
    dob
      ? setEnable(true)
      : setEnable(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dob, gender, watch('fullName'), profilePic]);
  const optionPress = (genderType: string) => {
    setGender(genderType);
    bottomSheetModalRef.current?.dismiss();
  };
  const completeProfile = () => {
    setIsLoading(true);
    uploadDocument(profilePic);
  };
  return (
    <Screen useAlignment isLoading={isLoading}>
      <Dismiss title="Complete Your Profile" />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <Box mt="ll" flex={1}>
          <Pressable onPress={openGallery} style={$avatarContainer}>
            <Box
              borderRadius={spacing.borderRadius}
              backgroundColor="greyLight2"
              width={122}
              alignItems="center"
              justifyContent="center"
              height={119}>
              {profilePic ? (
                <Image source={{uri: profilePic}} style={$avatar} />
              ) : (
                <>
                  <Box
                    position="absolute"
                    bottom={1.4}
                    right={5}
                    borderRadius={spacing.borderRadius}
                    width={30}
                    height={30}
                    justifyContent="center"
                    alignItems="center"
                    style={$uploadContainer}
                    backgroundColor="blueLight">
                    <Upload />
                  </Box>
                  <UserFill />
                </>
              )}
            </Box>
            <Text pt="n" fontSize={moderateScale(13)} color="grey">
              Profile picture can't be changed later.
            </Text>
          </Pressable>

          <Box gap="m" mt="ll">
            <Controller
              control={control}
              name="fullName"
              rules={{
                required: true,
              }}
              render={({field: {onChange, value, onBlur}}) => (
                <InputField
                  value={value}
                  addInfo={"You won't be able to change your name afterward."}
                  onBlur={onBlur}
                  label={'Full Name'}
                  onChange={onChange}
                />
              )}
            />
            <Controller
              control={control}
              name="email"
              rules={{
                required: true,
              }}
              render={({field: {onChange, value, onBlur}}) => (
                <InputField
                  editable={false}
                  value={value}
                  onBlur={onBlur}
                  label={'Email'}
                  onChange={onChange}
                />
              )}
            />
            <Dropdown
              label="Gender"
              value={gender}
              onPress={() => bottomSheetModalRef.current?.present()}
            />

            <Dropdown
              value={formatDate(dob!)}
              label="Date of Birth"
              onPress={() => setOpen(true)}
            />
          </Box>
        </Box>
      </KeyboardAwareScrollView>

      <DatePicker
        modal
        maximumDate={maxDate}
        mode="date"
        open={open}
        date={!dob && dob instanceof Date ? dob : maxDate}
        onConfirm={date => {
          setOpen(false);
          setDOB(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <Button
        label="Complete Profile"
        enabled={enable}
        onPress={completeProfile}
      />
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        backdropComponent={BottomSheetBackdrop}
        snapPoints={snapPoints}>
        <BottomSheetView>
          <AnimatedBox>
            <Text
              pl="m"
              color="black"
              variant="mSemiBold"
              fontSize={moderateScale(20)}>
              Gender
            </Text>
            <Box mt="n">
              <Pressable
                onPress={() => {
                  optionPress('Male');
                }}>
                <Option isActive={gender === 'Male'} label="Male" />
              </Pressable>
              <Box backgroundColor="line" height={0.7} />
              <Pressable
                onPress={() => {
                  optionPress('Female');
                }}>
                <Option isActive={gender === 'Female'} label="Female" />
              </Pressable>
            </Box>
          </AnimatedBox>
        </BottomSheetView>
      </BottomSheetModal>
    </Screen>
  );
};
