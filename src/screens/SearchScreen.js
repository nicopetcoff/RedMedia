import React, { useState } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import usersData from '../data/users.json';
import BackIcon from '../assets/imgs/back.svg'; // Icono personalizado de retroceso
import SearchIcon from '../assets/imgs/search.svg'; // Icono de búsqueda personalizado

const SearchScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  // Función para filtrar usuarios basándose en el texto de búsqueda
  const handleSearch = (text) => {
    setSearchText(text);
    if (text) {
      const filtered = usersData.filter((user) =>
        user.name.toLowerCase().includes(text.toLowerCase()) ||
        user.username.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers([]); 
    }
  };

  
  const renderUserItem = ({ item }) => (
    <TouchableOpacity
      style={styles.userItem}
      onPress={() =>
        navigation.navigate('UserProfile', { username: item.username })
      }
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.userInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.username}>@{item.username}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <BackIcon width={24} height={24}  />
        </TouchableOpacity>
      </View>

      
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <SearchIcon width={20} height={20} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search users..."
            value={searchText}
            onChangeText={handleSearch}
            placeholderTextColor="#999"
          />
        </View>
      </View>

      
      {searchText.length > 0 && (
        <FlatList
          data={filteredUsers}
          renderItem={renderUserItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <Text style={styles.noResultsText}>No users found</Text>
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    marginRight: 10,
  },
  searchContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 10,
    width: '90%',
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    flexDirection: 'column',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 14,
    color: 'gray',
  },
  noResultsText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'gray',
    marginTop: 20,
  },
});

export default SearchScreen;