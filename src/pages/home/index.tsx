import { HomeAdvisor } from './advisor';
import { HomeAthlete } from './athlete';

import { useAuth } from '../../hooks/auth';
import { LoaddingView } from '../common/loadding';

const Home = () => {

    const { user } = useAuth();


    return (
        user ? user.type === 'ADVISOR' ?
            <HomeAdvisor /> : <HomeAthlete /> :
        <LoaddingView />
    );
}


export {Home}