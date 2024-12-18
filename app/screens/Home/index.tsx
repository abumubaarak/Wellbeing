import React, {useEffect} from 'react';

import {ScrollView} from 'react-native';
import {useMMKVString} from 'react-native-mmkv';
import {
  Greetings,
  InsightCard,
  Recommended,
  Screen,
  SpecialistCategory,
  Upcoming,
} from '../../components';

export const Home = () => {
  const [_, setSymptomsPref] = useMMKVString('symptoms');
  useEffect(() => {
    setSymptomsPref('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Screen useAlignment useBottomPadding={false}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Greetings />
        <InsightCard />
        <SpecialistCategory />
        <Upcoming />
        <Recommended />
      </ScrollView>
    </Screen>
  );
};
