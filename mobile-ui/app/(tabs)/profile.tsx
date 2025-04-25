import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native"

export default function Profile() {
    const handleLogout = async () => {
        await AsyncStorage.removeItem('token');
        router.replace('/login');
      };
    return (
        <View>
            <Text>Profile</Text>
            <TouchableOpacity onPress={handleLogout} style={styles.button}>
                <Text style={styles.buttonText}>Đăng xuất</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
      backgroundColor: '#FF3B30',
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 10,
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: 20,
    },
    buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  });

