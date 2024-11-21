import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {ScrollView} from 'react-native';
import {
  Box,
  Button,
  CirclePie,
  ProgressBar,
  Screen,
  Text,
} from '../../components';
import {AppStackParamList, StackNavigation} from '../../navigators';
import {Colors} from '../../theme';
import {spacing} from '../../theme/spacing';
import {moderateScale, verticalScale} from '../../utils';

export const Analysis = () => {
  const COLORS: {normal: keyof Colors; light: keyof Colors}[] = [
    {normal: 'tomato', light: 'lightTomato'},
    {normal: 'blue', light: 'lightBlue'},
    {normal: 'orange', light: 'lightOrange'},
  ];
  const {params} = useRoute<RouteProp<AppStackParamList, 'Analysis'>>();
  const navigation = useNavigation<StackNavigation>();

  const gotIt = () => {
    navigation.navigate('HomeTab');
  };
  const {diagnosis, illness, medication} = params.result;
  return (
    <Screen useAlignment>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box marginTop="l">
          <Text variant="mSemiBold">Top potential illnesses</Text>

          <Box
            backgroundColor="primary300"
            width={'100%'}
            flexDirection="row"
            marginTop="l"
            height={verticalScale(250)}
            borderRadius={9}>
            {/* Rate */}
            <Box marginLeft="m" flexBasis={'40%'}>
              <Box
                justifyContent="space-between"
                style={{
                  marginTop: verticalScale(35),
                  marginBottom: verticalScale(39),
                }}
                flex={1}
                width={'70%'}>
                {illness.map((analysis, key) => (
                  <Box key={key}>
                    <Box flexDirection="row" gap="s" alignItems="center">
                      <Box
                        backgroundColor={COLORS[key].normal}
                        height={spacing.n}
                        borderRadius={3}
                        width={spacing.n}
                      />
                      <Text
                        color="black"
                        numberOfLines={1}
                        variant={key === 0 ? 'regularBold' : 'regular'}
                        fontSize={moderateScale(14)}>
                        {analysis.name}
                      </Text>
                    </Box>
                    <Box
                      flexDirection="row"
                      alignItems="center"
                      style={{marginTop: 3}}>
                      <ProgressBar
                        containerHeight={5}
                        widthSize={analysis.confidence_rate}
                        backgroundColor={COLORS[key].normal}
                        containerBackgroundColor={COLORS[key].light}
                      />
                      <Text
                        paddingLeft="s"
                        variant="regularBold"
                        fontSize={moderateScale(11)}>
                        {`${analysis.confidence_rate}%`}
                      </Text>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Pie */}
            <Box flexBasis={'60%'}>
              <Box flex={1} justifyContent="center">
                <CirclePie
                  rate={[
                    illness[0].confidence_rate,
                    illness[1].confidence_rate,
                    illness[2].confidence_rate,
                  ]}
                />
              </Box>
            </Box>
          </Box>

          {/* Diagnosis */}
          <Box>
            <Box
              gap="s"
              style={{marginBottom: 10, marginTop: 22}}
              flexDirection="row"
              alignItems="center">
              <Text variant="mSemiBold">Diagnosis</Text>
              <Box
                borderRadius={moderateScale(5)}
                paddingHorizontal="s"
                paddingVertical="s"
                justifyContent="center"
                backgroundColor="primary300">
                <Text
                  color="black"
                  variant="regularBold"
                  fontSize={moderateScale(11)}>
                  {`${illness[0].name} (${illness[0].confidence_rate}% Confidence)`}
                </Text>
              </Box>
            </Box>
            <Text
              variant="regular"
              color="black"
              lineHeight={moderateScale(25)}
              fontSize={moderateScale(16)}>
              {diagnosis}
            </Text>
          </Box>

          {/* There might still be a need to redesign the medication section Should be left still then.*/}

          {/* Medication */}
          <Box style={{marginTop: 22}}>
            <Text variant="mSemiBold">What’s next?</Text>
            <Text variant="regular" color="black">
              Here are recommended medications
            </Text>
            <Box mb="xl">
              {medication.map(({dosage_timing, drug_name, purpose}) => (
                <Box marginTop="m" key={dosage_timing}>
                  <Text variant="regularBold" color="black">
                    {drug_name}
                  </Text>
                  <Box
                    borderRadius={moderateScale(5)}
                    paddingHorizontal="s"
                    paddingVertical="s"
                    alignSelf="baseline"
                    marginVertical="xs"
                    justifyContent="center"
                    backgroundColor="primary300">
                    <Text
                      color="black"
                      variant="regular"
                      fontSize={moderateScale(14)}>
                      {dosage_timing}
                    </Text>
                  </Box>
                  <Text
                    variant="regular"
                    color="black"
                    lineHeight={moderateScale(25)}
                    fontSize={moderateScale(16)}>
                    {purpose}
                  </Text>
                </Box>
              ))}
            </Box>
            <Button onPress={gotIt} label="gotIt" />
          </Box>
        </Box>
      </ScrollView>
    </Screen>
  );
};
