import {RouteProp, useRoute} from '@react-navigation/native';
import moment from 'moment';
import React, {useState} from 'react';
import {useWindowDimensions} from 'react-native';
import {
  NavigationState,
  SceneRendererProps,
  TabView,
} from 'react-native-tab-view';
import {Case, ReviewGreen, SingleStar, UserGroup} from '../../assets/svgs';
import {
  Box,
  Button,
  Dismiss,
  DoctorDetailsHeader,
  DoctorInfoCard,
  Screen,
} from '../../components';
import {useFirestore} from '../../hooks';
import {AboutTab, ReviewsTab, ScheduleTab, TabHeader} from '../../layouts';
import {AppStackParamList} from '../../navigators';
import {spacing} from '../../theme/spacing';
export const DoctorDetails = () => {
  const layout = useWindowDimensions();
  const {bookAppointment, isLoading} = useFirestore();
  const [index, setIndex] = React.useState(0);
  const [appointment, setAppointment] = useState<{
    date: moment.Moment;
    time: any;
  }>();
  const [routes] = React.useState([
    {key: 'about', title: 'About'},
    {key: 'schedules', title: 'Schedules'},
    {key: 'reviews', title: 'Reviews'},
  ]);
  const {params} = useRoute<RouteProp<AppStackParamList, 'DoctorDetails'>>();

  const onTabItemPress = (item: number) => {
    setIndex(item);
  };

  const renderTabHeader = (
    props: SceneRendererProps & {
      navigationState: NavigationState<{key: string; title: string}>;
    },
  ) => (
    <TabHeader index={index} onTabItemPress={onTabItemPress} scene={props} />
  );

  const renderScene = (
    props: SceneRendererProps & {route: {key: string; title: string}},
  ) => {
    switch (props.route.key) {
      case 'about':
        return <AboutTab bio={params.doctor.bio} />;
      case 'schedules':
        return <ScheduleTab doctor={params.doctor} scheduleSet={scheduleSet} />;
      case 'reviews':
        return <ReviewsTab />;
      default:
        return null;
    }
  };

  const onPress = () => {
    if (index === 1) {
      if (appointment) {
        bookAppointment(
          params.doctor.uid,
          moment(appointment.date).format('YYYY-MM-DD'),
          appointment?.time,
        );
        //Later on send them to booking screen after successful booking
      } else {
        setIndex(index + 1);
      }
    } else if (index !== 2) {
      setIndex(index + 1);
    }
  };

  const scheduleSet = (date: moment.Moment, time: any) => {
    setAppointment({
      date,
      time,
    });
  };

  return (
    <Screen useAlignment>
      <Dismiss title="Doctor Profile" />
      <Box mt="ll" flex={1}>
        <DoctorDetailsHeader doctorDetails={params.doctor} />
        <Box flexDirection="row" justifyContent="space-between">
          <DoctorInfoCard icon={<UserGroup />} title="40" summary="Patients" />
          <DoctorInfoCard icon={<Case />} title="40" summary="Career Exp." />
          <DoctorInfoCard icon={<SingleStar />} title="40" summary="Rating" />
          <DoctorInfoCard icon={<ReviewGreen />} title="40" summary="Review" />
        </Box>

        <TabView
          style={{
            marginTop: spacing.ll,
            marginBottom: spacing.ll,
          }}
          renderTabBar={renderTabHeader}
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
        />
      </Box>
      <Button
        label={index === 1 && appointment ? 'Book appointment' : 'Continue'}
        onPress={onPress}
        isLoading={isLoading}
        enabled={!isLoading}
      />
    </Screen>
  );
};
