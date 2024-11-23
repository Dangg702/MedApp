import React from 'react';
import {View, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLORS, FONTSIZE, SPACING} from '../theme/theme';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Feather';
import HomeScreen from '../screens/HomeScreen';
import TicketScreen from '../screens/TicketScreen';
import UserAccountScreen from '../screens/UserAccountScreen';
import ScheduledScreen from '../screens/ScheduledScreen';

const Tab = createBottomTabNavigator();

const TabIcon = ({name, focused, iconLib = 'Icon'}) => {
  const IconComponent = iconLib === 'FontAwesomeIcon' ? FontAwesomeIcon : Icon;
  return (
    <View
      style={[
        styles.activeTabBackground,
        focused ? {borderTopColor: COLORS.MainColor} : {},
      ]}>
      <IconComponent
        name={name}
        color={focused ? COLORS.MainColor : COLORS.Text}
        size={FONTSIZE.size_30}
      />
    </View>
  );
};

const tabs = [
  {name: 'Home', component: HomeScreen, iconName: 'home'},
  {name: 'Scheduled', component: ScheduledScreen, iconName: 'calendar'},
  {
    name: 'Ticket',
    component: TicketScreen,
    iconName: 'newspaper-o',
    iconLib: 'FontAwesomeIcon',
  },
  {name: 'User', component: UserAccountScreen, iconName: 'user'},
];

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.White,
          borderTopWidth: 0,
          height: 80,
        },
      }}>
      {tabs.map(tab => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({focused}) => (
              <TabIcon
                name={tab.iconName}
                focused={focused}
                iconLib={tab.iconLib}
              />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  activeTabBackground: {
    borderTopColor: COLORS.White,
    borderTopWidth: 3,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TabNavigator;
