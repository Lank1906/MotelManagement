import { View, TextInput, StyleSheet } from 'react-native';
import { Search } from 'lucide-react-native';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string
}

export default function SearchBar({ value, onChangeText, placeholder = 'Tìm Kiếm...' }: Props) {
  return (
    <View style={styles.container}>
      <Search size={20} color="#000" style={{ marginRight: 8 }} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#888"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
});
