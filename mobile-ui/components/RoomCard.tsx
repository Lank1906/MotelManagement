import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router"; // expo-router v2 dùng router.push
import { RoomType } from "@/interfaces/room";

interface Props {
  room: RoomType;
  onLandlordClick: (landlordID: number) => void;
}

export default function RoomCard({ room, onLandlordClick }: Props) {
  const handlePress = () => {
    router.push(`/${room.id}`);
  };

  const handleLandlordPress = () => {
    onLandlordClick(room.user_id);
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
      <View style={styles.card}>
        <Image source={{ uri: room.img_room }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.username} onPress={handleLandlordPress}>
            {room.username} - {room.name}
          </Text>
          <Text style={styles.address}>{room.address}</Text>
          <Text style={styles.price}>{room.priceFM}đ / Tháng</Text>
          {room.check_in ? (
            <Text style={styles.checkIn}>Hạn đóng tiền: {room.check_in}</Text>
          ) : (
            <Text style={styles.availability}>Phòng Còn Trống</Text>
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
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  image: { 
    width: '100%', 
    height: 180, 
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  info: { 
    padding: 16, 
    backgroundColor: '#f9f9f9',
    borderBottomLeftRadius: 12, 
    borderBottomRightRadius: 12 
  },
  username: { 
    fontSize: 18, 
    fontWeight: '600', 
    marginBottom: 8,
    color: '#333',
    textDecorationLine: 'underline',
  },
  address: { 
    fontSize: 14, 
    color: '#555', 
    marginBottom: 6, 
    fontStyle: 'italic'
  },
  price: { 
    fontSize: 18, 
    fontWeight: '700', 
    color: '#00aaff', 
    marginBottom: 8,
  },
  checkIn: { 
    fontSize: 13, 
    color: '#888', 
    marginTop: 6, 
  },
  availability: { 
    fontSize: 16, 
    color: '#2ecc71',
    fontWeight: 'bold', 
    marginTop: 6,
  },
});
