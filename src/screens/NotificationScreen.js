import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import Notification from '../components/Notification'; // Asegúrate de que este componente funcione sin dependencias de Expo.
import MyData from '../data/MyData'; // Tu archivo local con las notificaciones.
import BackIcon from '../assets/imgs/back.svg'; // Icono personalizado de regreso.
import { useNavigation } from '@react-navigation/native'; // React Navigation para CLI.

const NotificationScreen = () => {
  const navigation = useNavigation(); // Hook de navegación.

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()} // Volver a la pantalla anterior.
          style={styles.icon}
        >
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.title}>Activity</Text>
      </View>
      <FlatList
        data={MyData.notificaciones} // Asegúrate de que este arreglo esté bien estructurado.
        renderItem={({ item }) => <Notification item={item} />}
        keyExtractor={(item) => item.id.toString()} // Convierte el ID a string si no lo es.
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfcfc',
    paddingHorizontal: 10,
  },
  headerContainer: {
    height: 60, // Reducido para ajustarse mejor
    backgroundColor: '#fcfcfc',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  title: {
    fontSize: 22, // Reducido para evitar desbordes
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: 'black',
    flex: 1,
    textAlign: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
  },
});

export default NotificationScreen;