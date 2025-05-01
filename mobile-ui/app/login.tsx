import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PostFetch } from '@/libs/fetch';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const login = () => {
    if (!username || !password) {
      alert('Vui lòng nhập đầy đủ tài khoản và mật khẩu!');
      return;
    }
    setLoading(true);
    PostFetch(
      'login',
      { username, password },
      (data: any) => {
        setLoading(false);
        AsyncStorage.setItem('token', data.token);
        AsyncStorage.setItem('info', JSON.stringify(data.info));
        router.replace('/(tabs)');
      },
      undefined,
      (err: any) => {
        setLoading(false);
        alert(err?.message || 'Đăng nhập thất bại!');
      }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Đăng nhập</Text>

        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Tên đăng nhập"
          placeholderTextColor="#888"
        />

        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Mật khẩu"
          placeholderTextColor="#888"
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={login} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Đăng nhập</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{router.push('/signup')}}>
          <Text style={styles.link}>Chưa có tài khoản? Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8f9fa' },
  card: {
    width: '90%',
    backgroundColor: 'transparent',
    padding: 24,
  },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 24, textAlign: 'center', color: '#333' },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#fefefe',
    color: '#333',
    textAlign:'center'
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  link: { color: '#007AFF', textAlign: 'center', fontSize: 14 },
});
