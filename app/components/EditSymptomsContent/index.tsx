import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {KeyboardAvoidingView, TextInput} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {storage} from '../../data';
import {isAndroid} from '../../utils';
import {Box} from '../Box';

import {useNavigation} from '@react-navigation/native';
import {StackNavigation} from '../../navigators';
import {Button} from '../Button';
import {$container, $footer, $textInput} from './style';

type EditSymptomsContentProps = {
  symptoms: string;
};
export const EditSymptomsContent = ({symptoms}: EditSymptomsContentProps) => {
  const {control, getValues} = useForm({
    defaultValues: {symptoms},
  });

  const navigation = useNavigation<StackNavigation>();

  const Done = () => {
    const symptomsInput = getValues('symptoms');
    storage.set('symptoms', symptomsInput);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={isAndroid ? 45 : 10}
      style={$container}
      behavior={isAndroid ? 'height' : 'padding'}>
      <KeyboardAwareScrollView>
        <Controller
          control={control}
          rules={{required: true}}
          name="symptoms"
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              multiline={true}
              returnKeyType="next"
              style={$textInput}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
      </KeyboardAwareScrollView>
      <Box style={$footer}>
        <Button onPress={Done} label="done" />
      </Box>
    </KeyboardAvoidingView>
  );
};
