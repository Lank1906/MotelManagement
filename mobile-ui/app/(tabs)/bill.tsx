import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { launchImageLibrary, Asset } from 'react-native-image-picker';

export default function FullPaymentScreen() {
  const [paymentImage, setPaymentImage] = useState<Asset | null>(null);

  const data = {
    name: 'P3',
    person_limit: 3,
    CountPeople: 1,
    electric_number: 0,
    water_number: 0,
    check_in: '2025-05-01',
    bill_at: '2025-03-09 00:00:00',
    username: 'Lank',
    phone: '0349852986',
    email: 'lank@gmail.com',
    address: 'hy-vl-nd',
    amount: 1500000,
    bankCode: 'MB',
    accountNo: '89696996696699',
    accountName: 'BUI XUAN HOANG',
    addInfo: 'Thanh toan phong P3 - Thang 5',
  };

  const qrURL = `https://img.vietqr.io/image/${data.bankCode}-${data.accountNo}-compact.png?amount=${data.amount}&addInfo=${encodeURIComponent(
    data.addInfo
  )}&accountName=${encodeURIComponent(data.accountName)}`;

  const requestAndroidPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const downloadQR = async () => {
    try {
      const hasPermission = await requestAndroidPermission();
      if (!hasPermission) {
        Alert.alert('Không có quyền lưu ảnh');
        return;
      }

      const RNFS = await import('react-native-fs');
      const filePath = `${RNFS.default.DownloadDirectoryPath}/QR_${Date.now()}.png`;

      const result = await RNFS.default.downloadFile({
        fromUrl: qrURL,
        toFile: filePath,
      }).promise;

      if (result.statusCode === 200) {
        Alert.alert('✅ Thành công', `Đã lưu QR tại: ${filePath}`);
      } else {
        Alert.alert('❌ Lỗi', 'Không thể tải ảnh QR');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('❌ Lỗi', 'Lưu QR thất bại');
    }
  };

  const selectImage = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.8 }, (response) => {
      if (response.didCancel) return;
      if (response.assets && response.assets.length > 0) {
        setPaymentImage(response.assets[0]);
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Phòng {data.name}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>👤 Chủ phòng</Text>
        <Text>Họ tên: {data.username}</Text>
        <Text>📞 SĐT: {data.phone}</Text>
        <Text>📧 Email: {data.email}</Text>
        <Text>🏠 Địa chỉ: {data.address}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🏡 Thông tin phòng</Text>
        <View style={styles.infoRow}>
          <Text>👥 {data.CountPeople}/{data.person_limit} người</Text>
          <Text>⚡ Điện: {data.electric_number}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text>💧 Nước: {data.water_number}</Text>
          <Text>🧾 Hóa đơn: {data.bill_at.split(' ')[0]}</Text>
        </View>
        <Text>🗓️ Nhận phòng: {data.check_in}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🏦 Thông tin chuyển khoản</Text>
        <Text>💳 Ngân hàng: {data.bankCode}</Text>
        <Text>🔢 STK: {data.accountNo}</Text>
        <Text>👤 Tên người nhận: {data.accountName}</Text>
        <Text>📝 Nội dung: {data.addInfo}</Text>
        <View style={styles.sectionRow}>
          <TouchableOpacity style={styles.buttonSmall} onPress={downloadQR}>
            <Text style={styles.buttonText}>⬇️ Tải QR</Text>
          </TouchableOpacity>
          <Image
            source={{ uri: qrURL }}
            style={styles.qrImageSmall}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📷 Ảnh chuyển khoản</Text>
        <View style={styles.sectionRow}>
          <TouchableOpacity style={styles.buttonSmall} onPress={selectImage}>
            <Text style={styles.buttonText}>📤 Chọn ảnh</Text>
          </TouchableOpacity>
          {paymentImage?.uri ? (
            <Image source={{ uri: paymentImage.uri }} style={styles.qrImageSmall} />
          ) : (
            <View style={styles.qrImageSmall}>
              <Text style={{ fontSize: 12 }}>Chưa có ảnh</Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  section: { marginBottom: 20 },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    gap: 16,
  },
  sectionTitle: { fontWeight: '600', fontSize: 16, marginBottom: 8 },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  buttonSmall: {
    backgroundColor: '#007bff',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 14,
  },
  qrImageSmall: {
    width: 120,
    height: 120,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
  },
});