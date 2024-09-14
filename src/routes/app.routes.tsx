import React from "react";
import {
  Home,
  Perfil,
  MyDataView,
  CreateTraining,
  Locations,
  Details,
  HistoricTraining,
  DetailsHistoric,
  DetailsTraining,
  RegisterDone,
  ActiveTrainingsAthlete,
  HistoricTrainingsAthlete,
  RatingAdvisor,
  AssessmentsAdvisor,
  CommunicationAthletes,
  DeleteAccount,
} from '../pages';

import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

const rightToLeftAnimation = {
  cardStyleInterpolator: ({ current, layouts }:{
    current: any; layouts: any
  }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};

const AppRoutes: React.FC = () => (
    <AppStack.Navigator screenOptions={{
        headerShown: false,
      }}>
        <AppStack.Screen name="Home" component={Home}/>
        <AppStack.Screen
          options={rightToLeftAnimation}
          name="Perfil"
          component={Perfil}/>
        <AppStack.Screen
          options={rightToLeftAnimation}
          name="MyData"
          component={MyDataView}/>
        <AppStack.Screen
          options={rightToLeftAnimation}
          name="CreateTraining"
          component={CreateTraining}/>
        <AppStack.Screen
          options={rightToLeftAnimation}
          name="Locations"
          component={Locations}/>
        <AppStack.Screen
          options={rightToLeftAnimation}
          name="Details"
          component={Details}/>
        <AppStack.Screen
          options={rightToLeftAnimation}
          name="HistoricTraining"
          component={HistoricTraining}/>
        <AppStack.Screen
          options={rightToLeftAnimation}
          name="DetailsHistoric"
          component={DetailsHistoric}/>
        <AppStack.Screen
          options={rightToLeftAnimation}
          name="DetailsTraining"
          component={DetailsTraining}/>
        <AppStack.Screen
          options={rightToLeftAnimation}
          name="RegisterDone"
          component={RegisterDone}/>
        <AppStack.Screen
          options={rightToLeftAnimation}
          name="ActiveTrainingsAthlete"
          component={ActiveTrainingsAthlete}/>
        <AppStack.Screen
          options={rightToLeftAnimation}
          name="HistoricTrainingsAthlete"
          component={HistoricTrainingsAthlete}/>
        <AppStack.Screen
          options={rightToLeftAnimation}
          name="RatingAdvisor"
          component={RatingAdvisor}/>
        <AppStack.Screen
          options={rightToLeftAnimation}
          name="AssessmentsAdvisor"
          component={AssessmentsAdvisor}/>
        <AppStack.Screen
          options={rightToLeftAnimation}
          name="CommunicationAthletes"
          component={CommunicationAthletes}/>
        <AppStack.Screen
          options={rightToLeftAnimation}
          name="DeleteAccount"
          component={DeleteAccount}/>
    </AppStack.Navigator>
)

export default AppRoutes;