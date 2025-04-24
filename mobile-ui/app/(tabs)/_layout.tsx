import { Tabs } from "expo-router"
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            tabBarHideOnKeyboard:true,
        }}>
            <Tabs.Screen name="index" options={{ title: "Home", headerShown: false, tabBarIcon:({focused,color,size})=>(<Ionicons name={focused?'home':'home-outline'} size={size} color={color}/>) }} />
            <Tabs.Screen name="[id]" options={{ title: "Details", headerShown: false, tabBarIcon:({focused,color,size})=>(<Ionicons name={focused?'bed':'bed-outline'} size={size} color={color}/>) }} />
            <Tabs.Screen name="bill" options={{ title: "Living", headerShown: false, tabBarIcon:({focused,color,size})=>(<Ionicons name={focused?'receipt':'receipt-outline'} size={size} color={color}/>) }} />
            <Tabs.Screen name="announce" options={{ title: "Announce", headerShown: false, tabBarIcon:({focused,color,size})=>(<Ionicons name={focused?'notifications':'notifications-outline'} size={size} color={color}/>) }} />
            <Tabs.Screen name="profile" options={{ title: "Profile", headerShown: false, tabBarIcon:({focused,color,size})=>(<Ionicons name={focused?'person':'person-outline'} size={size} color={color}/>) }} />
        </Tabs>
    )
}