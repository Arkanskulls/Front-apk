import React from "react";
import {Login, CreateAccount, EmailVerify, VerificationCode, NewPass, TypeEmail} from '../pages';

import { createStackNavigator } from '@react-navigation/stack';

const AuthStack = createStackNavigator();

const AuthRoutes: React.FC = () => (
    <AuthStack.Navigator screenOptions={{
        headerShown: false
      }}>
        <AuthStack.Screen name="Login" component={Login}/>
        <AuthStack.Screen name="CreateAccount" component={CreateAccount}/>
        <AuthStack.Screen name="EmailVerify" component={EmailVerify}/>
        <AuthStack.Screen name="TypeEmail" component={TypeEmail}/>
        <AuthStack.Screen name="VerificationCode" component={VerificationCode}/>
        <AuthStack.Screen name="NewPass" component={NewPass}/>
    </AuthStack.Navigator>
)

export default AuthRoutes;