import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router"; // expo-router v2 dùng router.push
import { RoomType } from "@/interfaces/room";

interface Props {
  room: RoomType;
}

export default function RoomCard({ room }: Props) {
  const handlePress = () => {
    router.push(`/${room.id}`);
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
      <View style={styles.card}>
        <Image source={{ uri: room.img_room }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.username}>{room.username}</Text>
          <Text style={styles.address}>{room.address}</Text>
          <Text style={styles.price}>{room.priceFM}đ / Tháng</Text>
          {room.check_in && (
            <Text style={styles.checkIn}>Check-in: {room.check_in}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: { width: '100%', height: 180 },
  info: { padding: 12 },
  username: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  address: { fontSize: 14, color: '#666', marginBottom: 8 },
  price: { fontSize: 16, fontWeight: '600', color: '#2a9d8f', marginBottom: 6 },
  checkIn: { fontSize: 13, color: '#888' },
});
