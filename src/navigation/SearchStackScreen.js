import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';
import BackIcon from '../assets/imgs/back.svg'; // Importa tu icono de retroceso

const Stack = createStackNavigator();

const SearchStackScreen = () => {
  return (
    <Stack.Navigator>
      {/* Cambiamos el nombre a "SearchHome" para evitar conflictos */}
      <Stack.Screen 
        name="SearchHome" 
        component={SearchScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen
        name="UserProfile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
              <BackIcon width={24} height={24} />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default SearchStackScreen;