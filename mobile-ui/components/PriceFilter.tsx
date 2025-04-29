import { View, Text, TextInput, StyleSheet } from 'react-native';
import { MoveRight,CircleDollarSign } from 'lucide-react-native';

interface Props {
  priceMin: number;
  priceMax: number;
  setPriceMin: (value: number) => void;
  setPriceMax: (value: number) => void;
}

export default function RoomFilter({ priceMin, priceMax, setPriceMin, setPriceMax }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}><CircleDollarSign size={20} color="#000" style={{ marginRight: 8 }}/></Text>

      <TextInput
        placeholder="Min Price"
        value={priceMin?.toString() || ''}
        onChangeText={(text) => {
          const num = Number(text);
          if (!isNaN(num)) setPriceMin(num);
          else setPriceMin(0);
        }}
        keyboardType="numeric"
        style={styles.input}
      />
      <MoveRight size={30} color="#000" style={{ margin: 8 }}/>
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
    padding:12,
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    flex:1
  },
});
