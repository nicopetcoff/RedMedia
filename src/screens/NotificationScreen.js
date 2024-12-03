import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import Notification from '../components/Notification'; // Asegúrate de que este componente funcione sin dependencias de Expo.
import MyData from '../data/MyData'; // Tu archivo local con las notificaciones.
import BackIcon from '../assets/imgs/back.svg'; // Icono personalizado de regreso.
import BackDarkIcon from '../assets/imgs/backBlue.svg'// Icono personalizado de regreso en modo oscuro.
import { useNavigation } from '@react-navigation/native'; // React Navigation para CLI.
import { useToggleMode } from '../context/ThemeContext'; // Contexto de tema personalizado.

const NotificationScreen = () => {
  const {isDark,colors} = useToggleMode(); // Extrae el estado de tema actual.
  const navigation = useNavigation(); // Hook de navegación.

  return (
    <View style={[styles.container,{backgroundColor:colors.background}]}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()} // Volver a la pantalla anterior.
          style={styles.icon}
        >
          {isDark ? <BackDarkIcon/> : <BackIcon/>}
        </TouchableOpacity>
        <Text style={[styles.title,{color:colors.text}]}>Activity</Text>
      </View>
      <FlatList
        data={MyData.notificaciones} // Asegúrate de que este arreglo esté bien estructurado.
        renderItem={({ item }) => <Notification item={item} />}
        keyExtractor={(item) => item.id.toString()} // Convierte el ID a string si no lo es.
        ItemSeparatorComponent={() => <View style={[styles.separator,{backgroundColor:colors.separator}]} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  headerContainer: {
    height: 60, // Reducido para ajustarse mejor
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
    flex: 1,
    textAlign: 'center',
  },
  separator: {
    height: 1,
  },
});

export default NotificationScreen;