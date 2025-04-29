import { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { GetFetch } from "@/libs/fetch";
import { RoomType } from "@/interfaces/room";
import SearchBar from "@/components/SearchBar";
import RoomCard from "@/components/RoomCard";
import PriceFilter from "@/components/PriceFilter";
import { router } from "expo-router";

export default function Index() {
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(0);
  const [searchText, setSearchText] = useState('');
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

  const fetchData = async () => {
    await getToken();

    if (token) {
      GetFetch(
        'mobile',
        (data: RoomType[]) => {
          setRooms(data);
        },
        token,
        (err: any) => {
          console.error("Fetch rooms error", err);
        }
      );
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  if (!token) {
    return (
      <View style={styles.container}>
        <Text>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <View style={styles.header}>
        <SearchBar value={searchText} onChangeText={setSearchText} />
        <PriceFilter
          priceMin={priceMin}
          priceMax={priceMax}
          setPriceMin={setPriceMin}
          setPriceMax={setPriceMax}
        />
      </View>

      <FlatList
        data={rooms}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <RoomCard room={item} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginTop: 40,
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 8
  }
});
