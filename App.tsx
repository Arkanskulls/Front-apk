import React, {useCallback, useEffect} from 'react';
import { View } from 'react-native';
import * as SplashScren from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import {
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts
} from '@expo-google-fonts/poppins';

import {
  Home,
  Login,
  CreateAccount
} from './src/pages';

import {AuthProvider} from './src/hooks/auth';
import {TrainingProvider} from './src/hooks/training';
import Routes from './src/routes';

export default function App() {

  const [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  })

  useEffect(() => {
    async function prepare() {
      await SplashScren.preventAutoHideAsync();
    }
    prepare();
  }, [])

  const onLayout = useCallback(async () => {
    if(fontsLoaded) {
      await SplashScren.hideAsync();
    }
  }, [fontsLoaded])

  if(!fontsLoaded) {
    return null;
  }

  return (
      <View style={{flex: 1}} onLayout={onLayout}>
        <StatusBar style="dark" />
        <NavigationContainer>
          <AuthProvider>
            <TrainingProvider>
              <Routes />
            </TrainingProvider>
          </AuthProvider>
        </NavigationContainer>
      </View>
  );
}

