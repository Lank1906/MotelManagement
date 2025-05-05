import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { GetFetch, PutFetch, PostImage } from "@/libs/fetch";
import { ProfileType } from "@/interfaces/profile";

const API_IMAGE_BASE64 = "https://ho-ng-b-i-1.paiza-user-free.cloud:5000/api/uploads/";

export default function Profile() {
  const [info, setInfo] = useState<ProfileType>({
    username: "",
    phone: "",
    email: "",
    cccd: "",
    address: "",
    img_font: null,
    img_back: null,
  });

  const [token, setToken] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [imgFontUri, setImgFontUri] = useState<string | null>(null);
  const [imgBackUri, setImgBackUri] = useState<string | null>(null);

  useEffect(() => {
    getTokenAndInfo();
  }, []);

  useEffect(() => {
    if (info.img_font) fetchImage(info.img_font, setImgFontUri);
    if (info.img_back) fetchImage(info.img_back, setImgBackUri);
  }, [info.img_font, info.img_back]);

  const getTokenAndInfo = async () => {
    const storedToken = await AsyncStorage.getItem("token");
    if (!storedToken) {
      router.replace("/login");
      return;
    }
    setToken(storedToken);

    GetFetch(
      "mobile/profile",
      (data: ProfileType) => setInfo(data),
      storedToken,
      (err: any) => alert(err.message)
    );
  };

  const fetchImage = async (filename: string, setUri: (url: string) => void) => {
    try {
      const res = await fetch(API_IMAGE_BASE64 + filename, {
        headers: { Authorization: `Lank ${token}` },
      });
      const data = await res.json();
      if (data.base64) {
        setUri(data.base64);
      }
    } catch (error) {
      console.error("Failed to load secure image", error);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    router.replace("/login");
  };

  const pickImage = async (field: "img_font" | "img_back") => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result.canceled && result.assets[0]?.uri) {
      const asset = result.assets[0];
      const localUri = asset.uri;
      const filename = localUri.split("/").pop() || "image.jpg";
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image`;

      const formData = new FormData();
      formData.append("image", {
        uri: localUri,
        name: filename,
        type: type,
      } as any);

      PostImage(
        "api/upload",
        formData,
        (filename: string) => {
          setInfo((prev) => ({ ...prev, [field]: filename }));
        },
        token
      );
    }
  };

  const handleUpdate = () => {
    setLoading(true);
    PutFetch(
      "mobile/profile",
      info,
      (data: any) => {
        alert(data.message || "Cập nhật thành công!");
        setLoading(false);
      },
      token,
      (err: any) => {
        alert(err.message);
        setLoading(false);
      }
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>👤 Hồ sơ cá nhân</Text>

      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Họ và tên"
          value={info.username}
          onChangeText={(text) => setInfo({ ...info, username: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Số điện thoại"
          keyboardType="phone-pad"
          value={info.phone}
          onChangeText={(text) => setInfo({ ...info, phone: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={info.email}
          onChangeText={(text) => setInfo({ ...info, email: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="CCCD"
          value={info.cccd}
          onChangeText={(text) => setInfo({ ...info, cccd: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Địa chỉ"
          value={info.address}
          onChangeText={(text) => setInfo({ ...info, address: text })}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Ảnh CCCD mặt trước</Text>
        {imgFontUri && <Image source={{ uri: imgFontUri }} style={styles.image} />}
        <TouchableOpacity onPress={() => pickImage("img_font")} style={styles.imageButton}>
          <Text style={styles.imageButtonText}>Chọn ảnh mặt trước</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Ảnh CCCD mặt sau</Text>
        {imgBackUri && <Image source={{ uri: imgBackUri }} style={styles.image} />}
        <TouchableOpacity onPress={() => pickImage("img_back")} style={styles.imageButton}>
          <Text style={styles.imageButtonText}>Chọn ảnh mặt sau</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.updateButton}
        onPress={handleUpdate}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Lưu thay đổi</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator color="#007bff" style={{ marginTop: 10 }} />}

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Đăng xuất</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f2f2f2",
    flexGrow: 1,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 10,
    fontSize: 15,
    marginBottom: 12,
  },
  label: {
    fontWeight: "600",
    marginBottom: 6,
    fontSize: 15,
  },
  image: {
    width: "100%",
    height: 180,
    marginBottom: 10,
    borderRadius: 8,
  },
  imageButton: {
    backgroundColor: "#555",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  imageButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  updateButton: {
    backgroundColor: "#007bff",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
