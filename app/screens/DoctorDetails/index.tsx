import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
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
import {AboutTab, ReviewsTab, ScheduleTab, TabHeader} from '../../layouts';
import {AppStackParamList} from '../../navigators';
import {spacing} from '../../theme/spacing';
export const DoctorDetails = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
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
        return <ScheduleTab />;
      case 'reviews':
        return <ReviewsTab />;
      default:
        return null;
    }
  };

  const onPress = () => {
    if (index === 0) {
      setIndex(1);
    }
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
      <Button label="Continue" onPress={onPress} />
    </Screen>
  );
};
