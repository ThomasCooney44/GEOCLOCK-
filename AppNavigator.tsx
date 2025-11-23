import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { CreateAlarmScreen } from '../screens/CreateAlarmScreen';
import { EditAlarmScreen } from '../screens/EditAlarmScreen';
import { SettingsScreen } from '../screens/SettingsScreen';

export type RootStackParamList = {
  Home: undefined;
  CreateAlarm: undefined;
  EditAlarm: { alarmId: string };
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen 
          name="CreateAlarm" 
          component={CreateAlarmScreen}
          options={{ headerShown: true, title: 'Create Alarm' }}
        />
        <Stack.Screen 
          name="EditAlarm" 
          component={EditAlarmScreen}
          options={{ headerShown: true, title: 'Edit Alarm' }}
        />
        <Stack.Screen 
          name="Settings" 
          component={SettingsScreen}
          options={{ headerShown: true, title: 'Settings' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

