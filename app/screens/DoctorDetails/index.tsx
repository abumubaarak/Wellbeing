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
  Dismiss,
  DoctorDetailsHeader,
  DoctorInfoCard,
  Screen,
} from '../../components';
import {AboutTab, ReviewsTab, ScheduleTab, TabHeader} from '../../layouts';
import {AppStackParamList} from '../../navigators';
import {colors} from '../../theme';
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
  const {patients, yoe, rating, review} = params.doctor;
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
        return <ScheduleTab doctor={params.doctor} />;
      case 'reviews':
        return <ReviewsTab />;
      default:
        return null;
    }
  };

  return (
    <Screen useAlignment>
      <Dismiss title="Doctor Profile" />
      <Box mt="ll" flex={1}>
        <DoctorDetailsHeader doctorDetails={params.doctor} />
        <Box flexDirection="row" justifyContent="space-between">
          <DoctorInfoCard
            icon={<UserGroup />}
            title={patients ?? 0}
            summary="Patients"
          />
          <DoctorInfoCard
            icon={<Case />}
            title={yoe ?? 0}
            summary="Career Exp."
          />
          <DoctorInfoCard
            icon={<SingleStar />}
            title={rating ?? 0}
            summary="Rating"
          />
          <DoctorInfoCard
            icon={<ReviewGreen />}
            title={review ?? 0}
            summary="Review"
          />
        </Box>

        <TabView
          lazy={true}
          style={{
            marginTop: spacing.ll,
          }}
          sceneContainerStyle={{backgroundColor: colors.primary}}
          renderTabBar={renderTabHeader}
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
        />
      </Box>
    </Screen>
  );
};
