import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {memo, useEffect, useRef, useState} from 'react';
import {Pressable, ScrollView} from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import {CalendarFill, Dropdown} from '../../assets/svgs';
import {Box, Button, ChipList, CircularLoader, Text} from '../../components';
import {useFirestore} from '../../hooks';
import {StackNavigation} from '../../navigators';
import {colors} from '../../theme';
import {fonts} from '../../theme/typography';
import {availableDays, moderateScale, MONTH_NAMES} from '../../utils';
import {
  $calendarStrip,
  $container,
  $dateNameStyle,
  $dateNumberStyle,
} from './styles';
type ScheduleTabProps = {
  doctor: FirebaseFirestoreTypes.DocumentData;
};
export const ScheduleTab = memo(({doctor}: ScheduleTabProps) => {
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
  const {bookAppointment, isLoading, data} = useFirestore(false);

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
  // useEffect(() => {
  //   if (fixAndroidUnmount) {
  //     setTimeout(() => navigation.goBack(), 100);
  //   }
  // }, [fixAndroidUnmount, navigation]);
  useEffect(() => {
    if (data.length === 1) {
      setTimeout(
        () =>
          navigation.reset({
            index: 0,
            routes: [
              {name: 'BookingStatus', params: {doctorName: doctor?.fullName}},
            ],
          }),
        100,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onPress = () => {
    bookAppointment(
      doctor.uid,
      moment(selectedDate).format('YYYY-MM-DD'),
      selectedTime,
    );
  };
  return (
    <Box flex={1}>
      {isLoading ? (
        <Box flex={1} justifyContent="center" alignItems="center">
          <CircularLoader isLoading={true} />
        </Box>
      ) : (
        <>
          <ScrollView style={$container}>
            <Pressable
              onPress={() =>
                navigation.navigate('CalendarRange', {
                  range: doctor?.dateRange,
                  dateRangeType: doctor?.customRange
                    ? 'custom'
                    : doctor?.dateRange,
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
              <Box>
                <ChipList
                  availableTime={availableTime}
                  onTimeSelected={onTimeSelected}
                />
              </Box>
            ) : (
              <Box
                marginVertical="borderRadius"
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
          </ScrollView>
          {selectedTime && selectedDate && (
            <Box justifyContent="flex-end" pt="s">
              <Button
                label="Book appointment"
                onPress={onPress}
                isLoading={isLoading}
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
});
