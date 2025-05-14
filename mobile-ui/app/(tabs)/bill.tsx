import BillType from '@/interfaces/bill';
import RoomRenting from '@/interfaces/roomRenting';
import { GetFetch, PostImage, PutFetch } from '@/libs/fetch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';

const API_IMAGE_BASE64 = "https://ho-ng-b-i-1.paiza-user-free.cloud:5000/api/uploads/";

export default function FullPaymentScreen() {
  const [paymentImage, setPaymentImage] = useState<string | null>(null);
  const [data, setData] = useState<RoomRenting | null>(null);
  const [token, setToken] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [bill, setBill] = useState<BillType | null>(null);
  const info = useRef<any | null>(null);
  const [img, setImg] = useState<string | null>(null);

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (token) loadData();
  }, [token]);

  useEffect(() => {
    loadBill();
  }, [data?.id]);

  useEffect(() => {
    if (bill?.img_bill) fetchImage(bill.img_bill, setImg);
  }, [bill?.img_bill]);

  const getToken = async () => {
    const storedToken = await AsyncStorage.getItem('token');
    const storedInfo = await AsyncStorage.getItem('info');
    info.current = storedInfo ? JSON.parse(storedInfo) : null;
    if (storedToken) setToken(storedToken);
    else router.replace('/login');
  };

  const loadData = async () => {
    setLoading(true);
    GetFetch('mobile/renting', (res: RoomRenting) => setData(res), token, (err: any) => {
      // alert(err.message)
      setData(null)
    });
    setLoading(false);
  };

  const loadBill = async () => {
    if (!data) return;
    setLoading(true);
    GetFetch('mobile/bill/' + data.id, (res: BillType) => setBill(res), token, (err: any) => alert(err.message));
    setLoading(false);
  };

  const downloadQR = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') return Alert.alert('❌ Không có quyền truy cập thư viện ảnh');
    setLoading(true);
    const fileUri = FileSystem.documentDirectory + `QR_${Date.now()}.png`;
    const downloadResumable = FileSystem.createDownloadResumable(qrURL, fileUri);
    const downloadResult = await downloadResumable.downloadAsync();
    if (!downloadResult?.uri) return Alert.alert('❌ Lỗi', 'Không thể tải ảnh QR');
    const asset = await MediaLibrary.createAssetAsync(downloadResult.uri);
    await MediaLibrary.createAlbumAsync('Download', asset, false);
    Alert.alert('✅ Thành công', 'Đã lưu ảnh QR vào thư viện ảnh!');
    setLoading(false);
  };

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return Alert.alert("Không có quyền truy cập thư viện ảnh!");
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, allowsEditing: true, quality: 0.7 });
    if (!result.canceled && result.assets.length > 0) {
      const asset = result.assets[0];
      const localUri = asset.uri;
      const filename = localUri.split('/').pop() || 'photo.jpg';
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image`;
      const formData = new FormData();
      formData.append('image', { uri: localUri, name: filename, type } as any);
      setLoading(true);
      PostImage('api/upload', formData, (filename: string) => {
        setPaymentImage(filename);
        setBill((prev) => prev ? { ...prev, img_bill: filename } : prev);
        Alert.alert("✅ Thành công", "Ảnh đã được tải lên!");
        setLoading(false);
      }, token);
    }
  };

  const fetchImage = async (filename: string, setUri: (url: string) => void) => {
    try {
      const res = await fetch(API_IMAGE_BASE64 + filename, {
        headers: { Authorization: `Lank ${token}` },
      });
      const data = await res.json();
      if (data.base64) setUri(data.base64);
    } catch (error) {
      console.error("Failed to load secure image", error);
    }
  };

  const confirmBill = async () => {
    if (!bill?.img_bill) return alert("Hãy upload ảnh hóa đơn của bạn!");
    setLoading(true);
    PutFetch('mobile/bill/confirm/' + bill.id, { img_bill: bill.img_bill }, (data: any) => {
      alert(data.message + " Hãy chờ thông báo mới nhất từ chủ thuê!");
    }, token, (err: any) => alert(err.message));
    setLoading(false);
  };

  const handleLeave = async () => {
    setLoading(true);
    GetFetch('mobile/leave', (data: any) => {
      alert(data.message + " Hãy đợi thông báo mới nhất từ chủ thuê!");
    }, token, (err: any) => alert(err.message));
    setLoading(false);
  };

  const qrURL = data
    ? `https://img.vietqr.io/image/${data.bank}-${data.account_no}-compact.png?amount=1500&addInfo=${encodeURIComponent('Thanh toan tien phong thang nay')}&accountName=${encodeURIComponent(data.account_name)}`
    : '';

  if ((loading && !refreshing)) {
    return <View style={styles.loadingContainer}><ActivityIndicator size="large" color="#007bff" /></View>;
  }
  if(!data){
    return <View style={styles.loadingContainer}><Text>Bạn chưa thuê phòng nào!</Text></View>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadData} />}>
      <Text style={styles.header}>💼 Thanh toán phòng: {data.name}</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>📌 Chủ phòng</Text>
        <Text>👤 {data.username}</Text>
        <Text>📞 {data.phone}</Text>
        <Text>📧 {data.email}</Text>
        <Text>🏠 {data.address}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>🧾 Thông tin phòng</Text>
        <Text>👥 {data.CountPeople}/{data.person_limit} người</Text>
        <Text>⚡ Điện: {data.electric_number}</Text>
        <Text>💧 Nước: {data.water_number}</Text>
        <Text>📅 Hóa đơn: {data.bill_at ? new Date(data.bill_at).toDateString() : '---'}</Text>
        <Text>🗓️ Nhận phòng: {data.check_in ? new Date(data.check_in).toDateString() : '---'}</Text>
      </View>

      {bill && (
        <>
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>🏦 Thông tin chuyển khoản</Text>
            <Text>Ngân hàng: {data.bank}</Text>
            <Text>STK: {data.account_no}</Text>
            <Text>Tên người nhận: {data.account_name}</Text>
            <Text>Nội dung: Thanh toan tien phong thang nay</Text>
            <View style={styles.qrRow}>
              <TouchableOpacity style={styles.button} onPress={downloadQR}>
                <Text style={styles.buttonText}>⬇️ Tải QR</Text>
              </TouchableOpacity>
              {qrURL !== '' && <Image source={{ uri: qrURL }} style={styles.qrImage} />}
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>📋 Chi tiết thanh toán</Text>
            <Text>📅 Ngày tạo: {new Date(bill.day).toLocaleDateString()}</Text>
            <Text>💵 Giá phòng: {bill.room_price.toLocaleString()}đ</Text>
            <Text>⚡ Điện x {bill.electric_number_final-bill.electric_number}   = {(bill.electric_price).toLocaleString()}đ</Text>
            <Text>💧 Nước x {bill.water_number_final-bill.water_number}  = {(bill.water_price).toLocaleString()}đ</Text>
            <Text>🛎️ Dịch vụ: {bill.service_price.toLocaleString()}đ</Text>
            <View style={{ height: 1, backgroundColor: '#ccc', marginVertical: 8 }} />
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>🧾 Tổng cộng: {(bill.room_price + bill.electric_price + bill.water_price + bill.service_price).toLocaleString()}đ</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>📤 Ảnh chuyển khoản</Text>
            <TouchableOpacity style={styles.button} onPress={pickImage}>
              <Text style={styles.buttonText}>📁 Chọn ảnh từ thư viện</Text>
            </TouchableOpacity>
            {bill.img_bill || paymentImage ? (
              <Image source={{ uri: img || paymentImage! }} style={styles.uploadedImage} />
            ) : (
              <Text style={{ marginTop: 10, color: '#888' }}>Chưa có ảnh nào được chọn</Text>
            )}
            <TouchableOpacity style={styles.button} onPress={confirmBill}>
              <Text style={styles.buttonText}>✅ Xác nhận đã thanh toán</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      <View style={styles.card}>
        <TouchableOpacity style={styles.buttonRed} onPress={handleLeave}>
          <Text style={styles.buttonText}>📤 Rời phòng</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 20,
    borderRadius: 12,
    elevation: 1,
    borderColor: '#ddd',
    borderWidth: 1,
    gap: 6,
  },
  sectionTitle: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 8,
  },
  qrRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  qrImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    backgroundColor: '#eee',
  },
  uploadedImage: {
    width: '100%',
    height: 180,
    marginTop: 12,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    resizeMode: 'cover',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonRed: {
    backgroundColor: '#ff4d4f',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});