import { View, Text, TextInput, StyleSheet } from 'react-native';

interface Props {
  priceMin: number;
  priceMax: number;
  setPriceMin: (value: number) => void;
  setPriceMax: (value: number) => void;
}

export default function RoomFilter({ priceMin, priceMax, setPriceMin, setPriceMax }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filter Rooms</Text>

      <TextInput
        placeholder="Min Price"
        value={priceMin?.toString() || ''}
        onChangeText={(text) => {
          const num = Number(text);
          if (!isNaN(num)) setPriceMin(num);
          else setPriceMin(0); // nếu user xóa trắng, gán 0
        }}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Max Price"
        value={priceMax?.toString() || ''}
        onChangeText={(text) => {
          const num = Number(text);
          if (!isNaN(num)) setPriceMax(num);
          else setPriceMax(0);
        }}
        keyboardType="numeric"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
});
