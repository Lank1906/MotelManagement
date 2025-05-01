import { useLocalSearchParams } from 'expo-router';
import { View, StyleSheet, Text, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RoomDetailType } from '@/interfaces/roomDetail';
import { GetFetch, PostFetch } from '@/libs/fetch';

const Details = () => {
  const { id } = useLocalSearchParams();
  const [token, setToken] = useState<string>('');
  const [room, setRoom] = useState<RoomDetailType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const info = useRef<any | null>(null);

  const getToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      const storedInfo = await AsyncStorage.getItem('info');

      info.current = storedInfo ? JSON.parse(storedInfo) : null;

      if (storedToken) {
        setToken(storedToken);
      } else {
        router.replace('/login');
      }
    } catch (error) {
      console.error('Lỗi khi lấy token', error);
    }
  };

  const fetchRoomDetails = async () => {
    GetFetch('mobile/' + id,
      (data: RoomDetailType) => {
        setRoom(data);
        setLoading(false);
      },
      token,
      (err: any) => {
        alert(err.message);
        console.log(err)
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    if (!id || isNaN(Number(id))) {
      router.replace('/(tabs)');
      return;
    }

    getToken();
    if(token)
      fetchRoomDetails();
  }, [token]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00aa00" />
      </View>
    );
  }

  if (!room) {
    return (
      <View style={styles.container}>
        <Text>Không tìm thấy thông tin phòng.</Text>
      </View>
    );
  }

  const canJoin = room.CountPeople < room.person_limit;

  const handleJoin = () => {
    if (room.room_now) {
      alert("Vui lòng thực hiện rời phòng cũ trước khi muốn thuê một phòng mới!")
      return;
    }
    PostFetch('mobile',
      { "message": info.current?.username || 'Người dùng' + " muốn thuê phòng " + room.name + "của bạn! Vui lòng phê duyệt hoặc tạo hóa đơn!" },
      () => { },
      token,
      () => { })
  };

  return (
    <View style={styles.card}>
      {room.img_room ? (
        <Image source={{ uri: room.img_room }} style={styles.image} />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text>No Image</Text>
        </View>
      )}
      <View style={styles.info}>
        <Text style={styles.username}>Chủ sở hữu: {room.username}</Text>
        <Text style={styles.address}>Địa chỉ: {room.address}</Text>
        <Text style={styles.price}>Giá: {room.priceFM}đ / Tháng</Text>
        <View style={styles.detailsRow}>
          <Text style={styles.detailLabel}>Số người hiện tại:</Text>
          <Text>{room.CountPeople}/{room.person_limit}</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.detailLabel}>Chỉ số điện:</Text>
          <Text>{room.electric_number}</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.detailLabel}>Chỉ số nước:</Text>
          <Text>{room.water_number}</Text>
        </View>
        <Text>{room.check_in ? (
          <>
            <Text style={styles.detailLabel}>Ngày thanh toán định kì: </Text>
            {room.check_in}
          </>
        ) : (
          'Phòng trống'
        )}</Text>

        <TouchableOpacity
          style={[styles.joinButton, !canJoin && styles.disabledButton]}
          onPress={handleJoin}
          disabled={!canJoin}
        >
          <Text style={styles.buttonText}>{canJoin ? "Thuê Phòng" : "Đã Đầy"}</Text>
        </TouchableOpacity>
      </View>
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
  card: {
    margin: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flex: 1
  },
  image: {
    width: '100%',
    height: 250,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  imagePlaceholder: {
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  info: {
    padding: 20,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  address: {
    fontSize: 16,
    color: '#555',
    marginVertical: 5,
  },
  price: {
    fontSize: 18,
    color: '#00aaff',
    fontWeight: 'bold',
    marginVertical: 5,
  },
  detailsRow: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  detailLabel: {
    fontSize: 16,
    color: '#777',
    marginRight: 10,
    fontWeight: 'bold',
  },
  joinButton: {
    marginTop: 20,
    paddingVertical: 12,
    backgroundColor: '#00aa00',
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
