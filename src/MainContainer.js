import * as React from 'react';
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import EventSearch from './views/EventSearch';
import ProfileScreen from './views/ProfileScreen';

const homeName = 'Home';
const profileName = 'Profile';
const Tab = createBottomTabNavigator();
export default function MainContainer(){
    return(
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={homeName}
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName;
                        let routeName = route.name;

                        if(routeName === homeName){
                            iconName = focused ? 'home' : 'home-outline';
                        }
                        else if(routeName === profileName){
                            iconName = focused ? 'person' : 'person-outline'; 
                        }

                        return <Ionicons name={iconName} size={size} color={color}/>
                    },
                })}>
                    <Tab.Screen name={homeName} component={EventSearch}/>
                    <Tab.Screen name={profileName} component={ProfileScreen}/>



            </Tab.Navigator>
        </NavigationContainer>
    )
}