import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Alert,
    RefreshControl,
    TextInput,
    Button,
    ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { DeleteFetch, GetFetch, PostFetch } from "@/libs/fetch";
import AnnounceType from "@/interfaces/announce";
import { AnnounceItem } from "@/components/AnnounceItem";

export default function AnnounceScreen() {
    const [byMe, setByMe] = useState<AnnounceType[]>([]);
    const [forMe, setForMe] = useState<AnnounceType[]>([]);
    const [token, setToken] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [newMessage, setNewMessage] = useState<string>("");
    const info = useRef<any | null>(null);

    useEffect(() => {
        getToken();
    }, []);

    useEffect(() => {
        if (token) {
            loadData();
        }
    }, [token]);

    const getToken = async () => {
        try {
            const storedToken = await AsyncStorage.getItem("token");
            const storedInfo = await AsyncStorage.getItem("info");
            info.current = storedInfo ? JSON.parse(storedInfo) : null;

            if (storedToken) {
                setToken(storedToken);
            } else {
                router.replace("/login");
            }
        } catch (error) {
            console.error("Lỗi khi lấy token", error);
        }
    };

    const loadData = async () => {
        setLoading(true);
        setRefreshing(true);

        GetFetch(
            "mobile/announce/by-me",
            (data: AnnounceType[]) => setByMe(data),
            token,
            (err: any) => alert(err.message)
        );
        GetFetch(
            "mobile/announce/for-me",
            (data: AnnounceType[]) => setForMe(data),
            token,
            (err: any) => alert(err.message)
        );

        setLoading(false);
        setRefreshing(false);
    };

    const handleDelete = (id: number) => {
        Alert.alert("Xác nhận", "Bạn có chắc muốn xóa thông báo này?", [
            { text: "Hủy" },
            {
                text: "Xóa",
                style: "destructive",
                onPress: () => {
                    DeleteFetch(
                        `mobile/announce/${id}`,
                        (data: any) => {
                            alert(data.message);
                            setByMe((prev) => prev.filter((item) => item.id !== id));
                        },
                        token,
                        (err: any) => alert(err.message)
                    );
                },
            },
        ]);
    };

    const handleSend = async () => {
        if (!newMessage.trim()) {
            alert("Vui lòng nhập nội dung thông báo.");
            return;
        }
        setLoading(true);
        PostFetch('mobile/announce/',
            { 'message': newMessage },
            (data: any) => {
                const newAnnounce: AnnounceType = {
                    id: data.id,
                    user_id: info.current.id,
                    message: newMessage,
                    viewed: false,
                    username: info.current?.username || "Bạn",
                };

                setByMe((prev) => [newAnnounce, ...prev]);
                setNewMessage("");
                setLoading(false);
            },
            token,
            (err: any) => {
                alert(err.message)
                setLoading(false)
            })
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#00aa00" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>📤 Gửi thông báo đến chủ thuê</Text>
            <TextInput
                placeholder="Nhập nội dung thông báo..."
                value={newMessage}
                onChangeText={setNewMessage}
                style={styles.input}
            />
            <Button title="Gửi thông báo" onPress={handleSend} disabled={loading} />
            {loading && <ActivityIndicator size="small" color="#007bff" style={{ marginTop: 10 }} />}

            <Text style={styles.heading}>🔔 Thông báo bạn gửi</Text>
            <FlatList
                data={byMe}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => AnnounceItem(item, true, handleDelete)}
                ListEmptyComponent={
                    <Text style={styles.empty}>Không có thông báo.</Text>
                }
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={loadData} />
                }
            />

            <Text style={styles.heading}>📨 Thông báo gửi đến bạn</Text>
            <FlatList
                data={forMe}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => AnnounceItem(item, false, handleDelete)}
                ListEmptyComponent={
                    <Text style={styles.empty}>Không có thông báo.</Text>
                }
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={loadData} />
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
    },
    heading: {
        fontSize: 20,
        fontWeight: "600",
        marginTop: 24,
        marginBottom: 8,
        color: "#222",
    },
    input: {
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginBottom: 12,
        fontSize: 14,
    },
    empty: {
        textAlign: "center",
        color: "#aaa",
        marginVertical: 16,
        fontStyle: "italic",
    },
});
