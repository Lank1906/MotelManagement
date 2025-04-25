import SearchBar from "@/components/SearchBar";
import { FlatList, Text, View } from "react-native";

export default function Index() {
  const list=["test","example","customer"]
  return (
    <View className="text-nowrap text-primary">
      <Text>heloo anh em</Text>
      <SearchBar/>
      <FlatList
        data={list}
        renderItem={({item})=>(<Text>{item}</Text>)}
      />
    </View>
  );
}
