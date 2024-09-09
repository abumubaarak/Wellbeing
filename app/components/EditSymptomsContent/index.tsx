import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {KeyboardAvoidingView, TextInput} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {storage} from '../../data';
import {isAndroid} from '../../utils';
import {Box} from '../Box';

import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {Translations} from '../../i18n';
import {StackNavigation} from '../../navigators';
import {$button, $buttonContainer, $label} from '../OnboardingFooter/style';
import {Text} from '../Text';
import {$container, $footer, $textInput} from './style';

type EditSymptomsContentProps = {
  symptoms: string;
};
export const EditSymptomsContent = ({symptoms}: EditSymptomsContentProps) => {
  const {control, getValues} = useForm({
    defaultValues: {symptoms},
  });
  const {t} = useTranslation<keyof Translations>();

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
        <Box style={[$buttonContainer]} overflow="hidden">
          <RectButton style={$button} onPress={Done}>
            <Text style={$label} variant="buttonLabel">
              {t('done')}
            </Text>
          </RectButton>
        </Box>
      </Box>
    </KeyboardAvoidingView>
  );
};
