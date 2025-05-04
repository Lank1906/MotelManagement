import AnnounceType from "@/interfaces/announce";
import { TouchableOpacity, View, Text,StyleSheet} from "react-native";

 export const AnnounceItem = (item: AnnounceType, isMine: boolean, handleDelete: (id: number) => void) => (
    <View
      style={[
        styles.item,
        item.viewed ? styles.itemRead : styles.itemUnread,
      ]}
    >
      <View style={styles.itemContent}>
        <Text style={styles.message}>{item.message}</Text>
        <Text style={styles.username}>
          👤 {item.username} {isMine ? "(bạn gửi)" : ""}
        </Text>
      </View>
      {isMine && (
        <TouchableOpacity
          onPress={() => handleDelete(item.id)}
          style={styles.deleteBtn}
        >
          <Text style={styles.deleteText}>🗑️</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        padding: 12,
        borderRadius: 10,
        marginVertical: 6,
        elevation: 1,
      },
      itemUnread: {
        backgroundColor: "#e6f7ff",
      },
      itemRead: {
        backgroundColor: "#f2f2f2",
      },
      itemContent: {
        flex: 1,
        paddingRight: 10,
      },
      message: {
        fontSize: 15,
        color: "#333",
        marginBottom: 4,
      },
      username: {
        fontSize: 12,
        color: "#666",
        fontStyle: "italic",
      },
      deleteBtn: {
        backgroundColor: "#ff4d4f",
        borderRadius: 12,
        width: 32,
        height: 32,
        alignItems: "center",
        justifyContent: "center",
      },
      deleteText: {
        color: "white",
        fontSize: 16,
      },
  })