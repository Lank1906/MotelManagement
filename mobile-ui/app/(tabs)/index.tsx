import { useEffect, useState, useCallback, useRef } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
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
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const getToken = async () => {
    const storedToken = await AsyncStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      router.replace("/login");
    }
  };

  const fetchDataByLandlord = async (id: number) => {
    if (!token) return;
    setLoading(true);
    GetFetch(
      'mobile/landlord/' + id,
      (data: RoomType[]) => {
        if (Array.isArray(data)) {
          setRooms(data);
        }
        setLoading(false);
      },
      token,
      (err: any) => {
        console.error("Fetch rooms error", err);
        setLoading(false);
      }
    );
  };

  const fetchData = () => {
    if (!token) return;

    setLoading(true);

    const query = new URLSearchParams();
    if (searchText) query.append("address", searchText);
    if (priceMin > 0) query.append("minPrice", priceMin.toString());
    if (priceMax > priceMin) query.append("maxPrice", priceMax.toString());

    GetFetch(
      `mobile?${query.toString()}`,
      (data: RoomType[]) => {
        setRooms(Array.isArray(data) ? data : []);
        setLoading(false);
        setRefreshing(false);
      },
      token,
      (err: any) => {
        alert(err.message);
        setLoading(false);
        setRefreshing(false);
      }
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (!token) return;

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      fetchData();
    }, 3000);
  }, [searchText, priceMin, priceMax, token]);

  if (loading && !refreshing) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00aa00" />
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
        style={{ borderRadius: 16 }}
        data={rooms}
        keyExtractor={(item, index) =>
          item?.id?.toString?.() || `room-${index}`
        }
        renderItem={({ item }) => (
          <RoomCard room={item} onLandlordClick={fetchDataByLandlord} />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={() => (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            Không có phòng nào phù hợp.
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    marginTop: 40,
    backgroundColor: "white",
    borderRadius: 16,
    marginBottom: 8,
  },
});
