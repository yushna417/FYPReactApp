import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Redirect, Tabs } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useAuth } from '@/context/useAuth';
import { View, ActivityIndicator } from 'react-native';


export default function TabLayout() {
  const {isAuthenticated, isLoading} = useAuth();
  if (isLoading){
    return(
       <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    )
  }

  if (!isAuthenticated) {
    return <Redirect href="/login" />
  }

  return (
    <Tabs 
      screenOptions={{ 
        tabBarActiveTintColor: 'white',
        headerShown:false,
        tabBarStyle:{
          height:110,
          paddingTop:3,
          backgroundColor:'#253a6c',
          borderBottomWidth:35,
          borderColor:'black'
        },
        // tabBarLabelStyle:{ 
        //   fontSize:12,
        //   marginTop:4,
        //   fontWeight:600,
        // },
        tabBarInactiveTintColor:'#A0AEC0' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) =>  <FontAwesome6 name="house" size={25} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Analytics"
        options={{
          title: 'Analytics',
          tabBarIcon: ({ color }) => <MaterialIcons size={32} name="analytics" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account-box" size={32} color={color} /> ,
        }}
      />
    </Tabs>
  );
}
