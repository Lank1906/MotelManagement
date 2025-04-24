import { useLocalSearchParams } from "expo-router"
import { View, StyleSheet, Text } from "react-native"

const Details=()=>{
    const {id}=useLocalSearchParams()
    return (
        <View><Text>HHH {id}</Text></View>
    )
}

export default Details;

const styles=StyleSheet.create({})

