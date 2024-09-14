import React, {useContext} from 'react';
import { ActivityIndicator, View } from 'react-native';
import {useAuth} from '../hooks/auth';
import {LoaddingView} from '../pages'
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

const Routes: React.FC = () => {

    const {signed, loading} = useAuth();
    if (loading) {
        return (
            <LoaddingView />
        )
    }

    return signed ? <AppRoutes /> : <AuthRoutes />;
}

export default Routes;