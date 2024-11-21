import React from 'react';
import {TextInput, TextInputProps} from 'react-native';
import {moderateScale} from '../../../utils';
import {Box} from '../../Box';
import {Text} from '../../Text';
import {$textArea, $textInput} from './styles';

type InputFieldProps = Omit<TextInputProps, 'ref'> & {
  label?: string;
  addInfo?: string;
  isTextArea?: boolean;
  onChange?: (...event: any[]) => void;
  value?: string;
};
export const InputField = ({
  label,
  onChange,
  addInfo,
  isTextArea,
  value,
  ...props
}: InputFieldProps) => {
  return (
    <Box>
      {label && (
        <Text color="greyL" variant="medium">
          {label}
        </Text>
      )}
      <TextInput
        {...props}
        style={[$textInput, isTextArea && $textArea]}
        keyboardType="default"
        onChangeText={onChange}
        value={value}
      />
      {addInfo && (
        <Text pl="s" pt="s" color="grey" fontSize={moderateScale(12)}>
          {addInfo}
        </Text>
      )}
    </Box>
  );
};
