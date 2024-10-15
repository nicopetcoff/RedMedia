import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native';
import ProfileScreen from '../screens/ProfileScreen'; // Importa la nueva pantalla de perfil
import BackIcon from '../assets/back.svg'; // Icono personalizado de regreso
import NotificationScreen from '../screens/NotificationScreen';

const Stack = createStackNavigator();

const NotificationStackScreen = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="StackProfile"
        component={ProfileScreen} // Añadimos la nueva pantalla de perfil
        options={{
          headerTitle: '', // Eliminamos el título del header
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{marginLeft: 10}}>
              <BackIcon width={24} height={24} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default NotificationStackScreen;
