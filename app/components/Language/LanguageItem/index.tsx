import React from 'react';
import {BorderlessButton} from 'react-native-gesture-handler';
import {useMMKVString} from 'react-native-mmkv';
import {CheckMark, Radio, RadioEmpty} from '../../../assets/svgs';
import {setLanguage} from '../../../data';
import {LNGCODE} from '../../../i18n/';
import {isAndroid, moderateScale} from '../../../utils';
import {Box} from '../../Box';
import {Text} from '../../Text';
import {$langLabelContainer} from '../style';
import {LanguageIcon} from './LanguageIcon';
import {$container, $line} from './style';

type LanguageItemProps = {
  lngCode: LNGCODE;
  lngTitle: string;
  lngSummary: string;
};

export const LanguageItem = ({
  lngSummary,
  lngCode,
  lngTitle,
}: LanguageItemProps) => {
  const [language] = useMMKVString('language');

  return (
    <BorderlessButton borderless={false} onPress={() => setLanguage(lngCode)}>
      <>
        <Box
          flexDirection="row"
          style={$container}
          justifyContent="space-between"
          alignItems="center">
          <Box flexDirection="row" alignItems="center">
            <LanguageIcon lngCode={lngCode} />
            <Box style={$langLabelContainer}>
              <Text
                variant="regularBold"
                fontSize={moderateScale(14)}
                color="black"
                paddingBottom="s">
                {lngTitle}
              </Text>
              <Text variant="regular">{lngSummary}</Text>
            </Box>
            {!isAndroid && <Box height={1} backgroundColor="line" />}
          </Box>
          {isAndroid && language !== lngCode && <RadioEmpty />}
          {language === lngCode && (
            <Box>{!isAndroid ? <CheckMark /> : <Radio />}</Box>
          )}
        </Box>
        <Box height={1} backgroundColor="line" style={$line} />
      </>
    </BorderlessButton>
  );
};
