import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {RootState} from './src/redux/store';

import TabNavigator from './src/navigators/TabNavigator';
import SettingScreen from './src/screens/SettingScreen';
import ResetPasswordScreen from './src/screens/ResetPasswordScreen';
import ConfirmDelAccountScreen from './src/screens/ConfirmDelAccountScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import ForgetPasswordScreen from './src/screens/ForgetPasswordScreen';
import SearchScreen from './src/screens/SearchScreen';
import DoctorDetailScreen from './src/screens/DoctorDetailScreen';
import HospitalDetailScreen from './src/screens/HospitalDetailScreen';
import BookingScreen from './src/screens/BookingScreen';

const Stack = createNativeStackNavigator();

const screens = [
  {name: 'Tab', component: TabNavigator, animation: 'default'},
  {name: 'Settings', component: SettingScreen},
  {name: 'ResetPassword', component: ResetPasswordScreen},
  {name: 'ConfirmDelAccount', component: ConfirmDelAccountScreen},
  {name: 'LogIn', component: LoginScreen},
  {name: 'SignUp', component: SignUpScreen},
  {name: 'ForgetPassword', component: ForgetPasswordScreen},
  {name: 'Search', component: SearchScreen},
  {name: 'DoctorDetail', component: DoctorDetailScreen},
  {name: 'HospitalDetail', component: HospitalDetailScreen},
  {name: 'Booking', component: BookingScreen},
];

const privateScreens = [{name: 'Booking', component: BookingScreen}];

const App = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  console.log('app user', isLoggedIn);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}>
        <>
          {/* {isLoggedIn && (
            <>
              {privateScreens.map(({name, component, animation}) => (
                <Stack.Screen
                  key={name}
                  name={name}
                  component={component}
                  options={{animation}}
                />
              ))}
            </>
          )} */}
          {screens.map(({name, component, animation}) => (
            <Stack.Screen
              key={name}
              name={name}
              component={component}
              options={{animation}}
            />
          ))}
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
