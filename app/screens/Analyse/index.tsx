import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Box,
  CircularLoader,
  Dismiss,
  Feedback,
  PermissionHeader,
  Screen,
} from '../../components';
import {useApi} from '../../hooks';
import {Translations} from '../../i18n';
import {AppStackParamList, StackNavigation} from '../../navigators';

export const Analyse = () => {
  const {t} = useTranslation<keyof Translations>();
  const {params} = useRoute<RouteProp<AppStackParamList, 'Analyse'>>();
  const {analyseSymptoms, analysis} = useApi();
  const navigation = useNavigation<StackNavigation>();

  useEffect(() => {
    analyseSymptoms(params?.symptoms);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (analysis) {
      navigation.navigate('Analysis', {result: analysis});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [analysis]);
  return (
    <Screen useAlignment>
      <Dismiss />
      <Box flex={1}>
        <PermissionHeader i18nKey="analysing" />
        <Box flexGrow={1} justifyContent="center" alignItems="center">
          <CircularLoader isLoading={true} />
        </Box>
        <Box flexGrow={0.1} justifyContent="center">
          <Feedback type="CAUTION!" message={t('advice')} />
        </Box>
      </Box>
    </Screen>
  );
};
