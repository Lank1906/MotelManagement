import { useLocalSearchParams } from 'expo-router';
import { View, StyleSheet, Text } from 'react-native';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Details = () => {
  const { id } = useLocalSearchParams();
  const [token, setToken] = useState<string>('');

  const getToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
      } else {
        router.replace('/login');
      }
    } catch (error) {
      console.error('Lỗi khi lấy token', error);
    }
  };

  useEffect(() => {
    if (id && isNaN(Number(id))) {
      router.replace('/(tabs)');
      return;
    }

    getToken();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Details Page: {id}</Text>
      <Text>Token: {token}</Text>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
