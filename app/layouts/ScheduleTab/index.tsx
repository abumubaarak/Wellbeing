import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {memo, useEffect, useRef, useState} from 'react';
import {Pressable} from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import {CalendarFill, Dropdown} from '../../assets/svgs';
import {Box, ChipList, Text} from '../../components';
import {StackNavigation} from '../../navigators';
import {colors} from '../../theme';
import {fonts} from '../../theme/typography';
import {availableDays, moderateScale, MONTH_NAMES} from '../../utils';
import {$calendarStrip, $dateNameStyle, $dateNumberStyle} from './styles';
type ScheduleTabProps = {
  doctor: FirebaseFirestoreTypes.DocumentData;
  scheduleSet: (date: moment.Moment, time: any) => void;
};
export const ScheduleTab = memo(({doctor, scheduleSet}: ScheduleTabProps) => {
  const {maxDate, startingDate} = availableDays(
    doctor?.dateRange,
    doctor?.customRange,
  );
  const dateRange = doctor?.dateRange;
  const availableTime = doctor?.workingHours;
  const [selectedDate, setSelectedDate] = useState<moment.Moment>();
  const [selectedTime, setSelectedTime] = useState<any>();
  const [selectedCalendarDate, setSelectedCalenderDate] = useState<Date>();
  const navigation = useNavigation<StackNavigation>();
  const calendarStripRef = useRef<CalendarStrip>(null);
  const onDateSelected = (date: moment.Moment) => {
    setSelectedDate(date);
  };
  const onTimeSelected = (workingHour: any) => {
    setSelectedTime(workingHour);
  };
  const calendarSelectedDate = (date: string) => {
    const selected = new Date(date);
    calendarStripRef?.current?.updateWeekView(moment(selected));
    setSelectedCalenderDate(selected);
  };

  const datesBlacklistFunc = (date: moment.Moment) => {
    //Enable weekdays only
    if (dateRange.includes('days')) {
      return date.isoWeekday() === 7 || date.isoWeekday() === 6;
    } else if (dateRange.includes('ends')) {
      //Enable weekends only
      return (
        date.isoWeekday() === 1 ||
        date.isoWeekday() === 2 ||
        date.isoWeekday() === 3 ||
        date.isoWeekday() === 4 ||
        date.isoWeekday() === 5
      );
    }
  };

  useEffect(() => {
    if (selectedTime && selectedDate) {
      scheduleSet(selectedDate, selectedTime);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, selectedTime]);

  return (
    <Box flex={1}>
      <Pressable
        onPress={() =>
          navigation.navigate('CalendarRange', {
            range: doctor?.dateRange,
            dateRangeType: doctor?.customRange ? 'custom' : doctor?.dateRange,
            doctorsName: doctor?.fullName.split(' ')[0],
            selectedDate: calendarSelectedDate,
          })
        }>
        <Box mb="m" flexDirection="row" justifyContent="space-between">
          <Text variant="medium" fontSize={moderateScale(15)}>
            Schedule Date
          </Text>
          <Box flexDirection="row" gap="s" alignItems="center">
            <CalendarFill />
            <Text color="primary600" variant="medium">
              {selectedCalendarDate
                ? `${
                    MONTH_NAMES[selectedCalendarDate.getMonth()]
                  } ${selectedCalendarDate.getDate()}`
                : MONTH_NAMES[startingDate.getMonth()]}
            </Text>
            <Dropdown />
          </Box>
        </Box>
      </Pressable>
      {/* If the custom date is in the past don't show it.Only show dates that are in the future or present.[It will be fix later on] */}
      <CalendarStrip
        ref={calendarStripRef}
        calendarAnimation={undefined}
        scrollerPaging={false}
        scrollable
        disabledDateOpacity={0.27}
        highlightDateNameStyle={{
          fontFamily: fonts.montserratAlternates.Bold,
        }}
        highlightDateNumberStyle={{
          fontFamily: fonts.montserratAlternates.Bold,
        }}
        startingDate={startingDate}
        datesBlacklist={datesBlacklistFunc}
        minDate={startingDate}
        maxDate={maxDate}
        selectedDate={selectedCalendarDate}
        daySelectionAnimation={{
          type: 'background',
          duration: 200,
          highlightColor: colors.primary300,
        }}
        onDateSelected={onDateSelected}
        style={$calendarStrip}
        dateNumberStyle={$dateNumberStyle}
        dateNameStyle={$dateNameStyle}
      />
      <Text variant="medium" fontSize={moderateScale(15)}>
        Time
      </Text>
      {selectedDate || selectedCalendarDate ? (
        <ChipList
          availableTime={availableTime}
          onTimeSelected={onTimeSelected}
        />
      ) : (
        <Box
          paddingHorizontal="xl"
          flex={1}
          justifyContent="center"
          alignItems="center">
          <Text
            fontSize={moderateScale(15)}
            variant="regular"
            textAlign="center">
            Select a day to see doctor's appointment time(s).
          </Text>
        </Box>
      )}
    </Box>
  );
});
