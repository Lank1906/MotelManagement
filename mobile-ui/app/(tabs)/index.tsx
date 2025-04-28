import { useEffect, useState } from "react";
import { View, FlatList, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { GetFetch } from "@/libs/fetch";
import { RoomType } from "@/interfaces/room";
import SearchBar from "@/components/SearchBar";
import RoomCard from "@/components/RoomCard";
import RoomFilter from "@/components/PriceFilter";

export default function Index() {
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const savedToken = await AsyncStorage.getItem("token") || '';
      setToken(savedToken);

      GetFetch(
        'mobile',
        (data: RoomType[]) => {
          setRooms(data);
        },
        savedToken,
        (err: any) => {
          console.error("Fetch rooms error", err);
        }
      );
    };

    fetchData();
  }, []);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <SearchBar value={searchText} onChangeText={setSearchText} />
      <RoomFilter
        priceMin={priceMin}
        priceMax={priceMax}
        setPriceMin={setPriceMin}
        setPriceMax={setPriceMax}
      />

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
