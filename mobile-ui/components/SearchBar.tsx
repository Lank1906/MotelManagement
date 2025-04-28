import { View, TextInput, StyleSheet } from 'react-native';
import { Search } from 'lucide-react-native';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string
}

export default function SearchBar({ value, onChangeText, placeholder = 'Search...' }: Props) {
  return (
    <View style={styles.container}>
      <Search size={20} color="#888" style={{ marginRight: 8 }} />
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
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
});
