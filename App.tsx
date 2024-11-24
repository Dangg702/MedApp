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

// HOC for private screens
const PrivateScreen = ({children, navigation}: any) => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  React.useEffect(() => {
    if (!isLoggedIn) {
      navigation.navigate('LogIn'); // Redirect to login if not logged in
    }
  }, [isLoggedIn, navigation]);

  return isLoggedIn ? children : null; // Render screen only if logged in
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}>
        {/* Public Screens */}
        <Stack.Screen name="Tab" component={TabNavigator} />
        <Stack.Screen name="Settings" component={SettingScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        <Stack.Screen name="ConfirmDelAccount" component={ConfirmDelAccountScreen} />
        <Stack.Screen name="LogIn" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="DoctorDetail" component={DoctorDetailScreen} />
        <Stack.Screen name="HospitalDetail" component={HospitalDetailScreen} />

        {/* Private Screen */}
        <Stack.Screen
          name="Booking"
          options={{animation: 'default'}}
          children={(props) => (
            <PrivateScreen navigation={props.navigation}>
              <BookingScreen {...props} />
            </PrivateScreen>
          )}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
