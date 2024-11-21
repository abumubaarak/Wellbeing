import {Calendar, toDateId} from '@marceloterreiro/flash-calendar';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {Box, DateRangeInfo, Dismiss, Screen} from '../../components';
import {AppStackParamList, StackNavigation} from '../../navigators';
import {
  availableDays,
  getDisabledWeekdayDates,
  getDisabledWeekendDates,
} from '../../utils';

export const CalendarRange = () => {
  const navigation = useNavigation<StackNavigation>();
  const {params} = useRoute<RouteProp<AppStackParamList, 'CalendarRange'>>();
  const {range, dateRangeType, selectedDate: calendarSelectedDate} = params;

  const year = new Date().getFullYear();

  const {maxDate, startingDate, type} = availableDays(
    range,
    dateRangeType === 'custom' ? true : false,
  );
  const calendarDisabledDateIds =
    type === 'days'
      ? getDisabledWeekendDates(year)
      : type === 'ends'
      ? getDisabledWeekdayDates(year)
      : [];

  const [selectedDate, setSelectedDate] = useState<any>();

  useEffect(() => {
    if (selectedDate) {
      calendarSelectedDate(selectedDate);
      navigation.goBack();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);
  return (
    <Screen useAlignment>
      <Dismiss isModal={true} modalOnPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box mb="m">
          <DateRangeInfo dateRange={range} doctorsName={params.doctorsName} />
        </Box>
        <Calendar.List
          calendarDisabledDateIds={calendarDisabledDateIds}
          calendarColorScheme="light"
          calendarInitialMonthId={toDateId(startingDate)}
          calendarMinDateId={toDateId(startingDate)}
          calendarMaxDateId={toDateId(maxDate)}
          onCalendarDayPress={setSelectedDate}
        />
      </ScrollView>
    </Screen>
  );
};
