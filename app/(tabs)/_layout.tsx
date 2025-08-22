import { Tabs, Redirect } from 'expo-router';
import React from 'react';
import { Platform, ActivityIndicator, View, Text, TouchableWithoutFeedback } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuth } from '@/context/useAuth';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Entypo, Ionicons } from '@expo/vector-icons';
import Foundation from '@expo/vector-icons/Foundation';
// import { View } from 'react-native';



export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return (
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: '#243c6a',
            tabBarInactiveTintColor: '#e6e8ea',
            headerShown: false,
            tabBarStyle: {
              position: 'absolute',
              height: 105,
              backgroundColor: '#243c6a',
              shadowColor: '#253a6c',
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.25,
              shadowRadius: 10,
              paddingTop: 15,
              borderColor: 'black',
              borderWidth: 2,
              borderBottomWidth: 36,
            },
            tabBarLabelStyle: {
              display: 'none',
            }, // remove default label, we handle it manually
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  className={`flex items-center justify-center ${
                    focused ? 'bg-white rounded-2xl h-14 w-28' : ''
                  }`}
                >
                  {focused ? (
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                      {/* <AntDesign name="home" size={28} color="#253a6c" /> */}
                      <MaterialCommunityIcons name="view-dashboard" size={28} color="#253a6c" />
                      {/* <Entypo name="home" size={26} color="#253a6c" /> */}
                      <Text className='text-MainTheme font-black font-poppins text-base'>
                        Home
                      </Text>
                    </View>
                  ) : (
                    <>
                      {/* <Entypo name="home" size={26} color="white" /> */}
                      <MaterialCommunityIcons name="view-dashboard" size={28} color="white" />

                    </>
                  )}
                </View>
              ),
            }}
          />

          <Tabs.Screen
            name="Analytics"
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  className={`flex items-center justify-center ${
                    focused ? 'bg-white rounded-2xl h-14 w-32' : ''
                  }`}
                >
                  {focused ? (
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                      {/* <Entypo name="bar-graph" size={26} color="#253a6c" /> */}

                      <MaterialCommunityIcons name="google-analytics" size={28} color="#253a6c" />
                      <Text className='text-MainTheme font-black font-poppins text-base'>
                        Analytics
                      </Text>
                    </View>
                  ) : (
                    <>
                      {/* <Foundation name="graph-bar" size={28} color="white" /> */}
                      <Entypo name="bar-graph" size={28} color="white" />
                      {/* <MaterialCommunityIcons name="google-analytics" size={28} color="white" /> */}
                    </>
                  )}
                </View>
              ),
            }}
          />

          <Tabs.Screen
            name="settings"
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  className={`flex items-center justify-center ${
                    focused ? 'bg-white rounded-2xl h-14 w-[115px]' : ''
                  }`}
                >
                  {focused ? (
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                      <Ionicons name="settings-sharp" size={26} color="#253a6c" />
                      <Text className='text-MainTheme font-black font-poppins text-base'>
                        Settings
                      </Text>
                    </View>
                  ) : (
                    <>
                      <Ionicons name="settings-sharp" size={26} color="white" />
                    </>
                  )}
                </View>
              ),
            }}
          />
        </Tabs>

  );
}


// import { Tabs, Redirect } from 'expo-router';
// import React from 'react';
// import { Platform, ActivityIndicator, View, Text, TouchableWithoutFeedback } from 'react-native';
// import { useColorScheme } from '@/hooks/useColorScheme';
// import { useAuth } from '@/context/useAuth';
// import AntDesign from '@expo/vector-icons/AntDesign';
// import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
// import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { Entypo, Ionicons } from '@expo/vector-icons';
// import Foundation from '@expo/vector-icons/Foundation';

// export default function TabLayout() {
//   const colorScheme = useColorScheme();
//   const { isAuthenticated, isLoading } = useAuth();

//   // if (isLoading) {
//   //   return (
//   //     <View className="flex-1 justify-center items-center">
//   //       <ActivityIndicator size="large" />
//   //     </View>
//   //   );
//   // }

//   // if (!isAuthenticated) {
//   //   return <Redirect href="/login" />;
//   // }

//   return (
//         <Tabs
//           screenOptions={{
//             tabBarActiveTintColor: '#e6e8ea',
//             tabBarInactiveTintColor: '#243c6a',
//             headerShown: false,
//             tabBarStyle: {
//               position: 'absolute',
//               height: 105,
//               backgroundColor: 'white',
//               shadowColor: '#253a6c',
//               shadowOffset: { width: 0, height: 3 },
//               shadowOpacity: 0.25,
//               shadowRadius: 10,
//               paddingTop: 15,
//               borderColor: 'black',
//               borderTopWidth:0.5,
//               borderBottomWidth: 36,
//             },
//             tabBarLabelStyle: {
//               display: 'none',
//             }, // remove default label, we handle it manually
//           }}
//         >
//           <Tabs.Screen
//             name="index"
//             options={{
//               tabBarIcon: ({ focused }) => (
//                 <View
//                   className={`flex items-center justify-center ${
//                     focused ? 'bg-MainTheme rounded-2xl h-14 w-28' : ''
//                   }`}
//                 >
//                   {focused ? (
//                     <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
//                       <MaterialCommunityIcons name="view-dashboard" size={24} color="white" />
//                       {/* <Entypo name="home" size={26} color="white" /> */}
//                       <Text className='text-white font-poppins text-base'>
//                         Home
//                       </Text>
//                     </View>
//                   ) : (
//                     <>
//                       <MaterialCommunityIcons name="view-dashboard" size={30} color="#253a6c" />
//                       {/* <AntDesign name="home" size={28} color="#253a6c" /> */}
//                     </>
//                   )}
//                 </View>
//               ),
//             }}
//           />

//           <Tabs.Screen
//             name="vegetable"
//             options={{
//               tabBarIcon: ({ focused }) => (
//                 <View
//                   className={`flex items-center justify-center ${
//                     focused ? 'bg-MainTheme rounded-2xl h-14 w-32' : ''
//                   }`}
//                 >
//                   {focused ? (
//                     <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
//                       <MaterialCommunityIcons name="google-analytics" size={28} color="white" />
//                       <Text className='text-white font-poppins text-base'>
//                         Analytics
//                       </Text>
//                     </View>
//                   ) : (
//                     <>
//                       <Entypo name="bar-graph" size={28} color="#253a6c" />
//                     </>
//                   )}
//                 </View>
//               ),
//             }}
//           />

//           <Tabs.Screen
//             name="settings"
//             options={{
//               tabBarIcon: ({ focused }) => (
//                 <View
//                   className={`flex items-center justify-center ${
//                     focused ? 'bg-MainTheme rounded-2xl h-14 w-[115px]' : ''
//                   }`}
//                 >
//                   {focused ? (
//                     <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
//                       <Ionicons name="settings-sharp" size={26} color="white" />
//                       <Text className='text-white font-poppins text-base'>
//                         Settings
//                       </Text>
//                     </View>
//                   ) : (
//                     <>
//                       <Ionicons name="settings-sharp" size={26} color="#253a6c" />
//                     </>
//                   )}
//                 </View>
//               ),
//             }}
//           />
//         </Tabs>
//   );
// }