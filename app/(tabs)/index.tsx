
// import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
// import { Box } from '@/components/ui/box';
// import { VStack } from '@/components/ui/vstack';
// import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
// import { HStack } from '@/components/ui/hstack';
// import { config } from '@/components/ui/gluestack-ui-provider/config';
// import { FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
// import * as Animatable from 'react-native-animatable';
// import { useNavigation } from 'expo-router';
// import { Actionsheet, ActionsheetContent, ActionsheetItem, ActionsheetItemText, ActionsheetDragIndicator, ActionsheetDragIndicatorWrapper, ActionsheetBackdrop } from "@/components/ui/actionsheet";
// import { Button, ButtonText } from "@/components/ui/button";
// import { useState } from 'react';


// const HomePage = () => {
//   const themeColor = '#253a6c';
//   const accentColor = '#3b82f6';
//   const navigation = useNavigation<any>();
//   const [showActionsheet, setShowActionsheet] = useState(false);
//   const handleClose = () => setShowActionsheet(false);

//   const user = {
//     name: 'Random Person',
//     profilePic: 'https://randomuser.me/api/portraits/men/1.jpg',
//     ordersCompleted: 24,
//   };

//   const vegetables = [
//      { id: 1, name: 'Tomatoes', change: '24%', trend: 'surge', price: '$2.99/lb' },
//     { id: 2, name: 'Onions', change: '18%', trend: 'drop',  price: '$1.49/lb' },
//     { id: 3, name: 'Carrots', change: '32%', trend: 'surge',  price: '$3.29/lb' },
//     { id: 4, name: 'Spinach', change: '12%', trend: 'drop',  price: '$2.19/bunch' },
//     { id: 5, name: 'Bell Peppers', change: '15%', trend: 'surge', price: '$4.99/lb' },
//     { id: 6, name: 'Potatoes', change: '8%', trend: 'drop',  price: '$0.99/lb' },
//     { id: 7, name: 'Sweet Potatoes', change: '8%', trend: 'drop',  price: '$0.99/lb' },
//     { id: 8, name: 'Potatoes', change: '8%', trend: 'drop',  price: '$0.99/lb' },
//     { id: 9, name: 'Radish', change: '8%', trend: 'surge',  price: '$0.99/lb' },
//     { id: 10, name: 'Cabbage', change: '8%', trend: 'surge',  price: '$0.99/lb' },
//   ];

//   const handleOrderPress = () => {
//     setShowActionsheet(true)
//     console.log('Order button pressed');
//   };

//   return (
//     <GluestackUIProvider>
//       <Box style={{ flex: 1, backgroundColor: '#DDE3E6', paddingBottom:40 }}>
//         <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }} className='bg-white '>
//           {/* Profile Section */}
//           <VStack space="md" className='px-5 py-14'>
//             <HStack space="sm" className='flex items-center justify-between'>
//               <HStack space="2xl" className='flex items-center bg-MainTheme px-3 w-[21rem] py-5 rounded-2xl'>
//                 <Image
//                   source={{ uri: user.profilePic }}
//                   style={{
//                     width: 60,
//                     height: 60,
//                     borderRadius: 12,
//                     borderWidth: 2,
//                     borderColor: 'white',
//                   }}
//                 />
//                 <VStack>
//                   <Text className="text-white text-lg font-poppins">Welcome back!</Text>
//                   <Text className="text-white text-2xl font-bold font-potta">{user.name}</Text>
//                 </VStack>
//               </HStack>
//               <View className="bg-[#eaeef1] p-2 h-28 w-24 rounded-2xl items-center justify-center drop-shadow-2xl">
//                 <Text className="text-MainTheme text-xl font-poppins font-extrabold">Orders</Text>
//                 <Text className="text-MainTheme font-bold text-lg">{user.ordersCompleted}</Text>
//               </View>
//             </HStack>
//           </VStack>

//           <View className="px-5 pt-4 pb-2 -mt-10">
//             <View className="relative h-72 rounded-xl overflow-hidden flex flex-row">
//               <Image 
//                 source={require('../../assets/images/map.jpeg')}
//                 className="w-[61%] h-full"
//                 resizeMode="cover"
//               />
              
//               <View className="w-[40%] h-full bg-[#93c6e1] flex flex-row justify-center pr-3 ">
//                 <Text className="text-MainTheme text-lg leading-6 font-bold text-center pt-14 -ml-4 font-poppins">
//                   Fresh vegetables delivered to your doorstep within hours
//                 </Text>
//               </View>
              
//               {/* Enhanced Order Button - Now centered and more eye-catching */}
//               <Animatable.View 
//                 animation="pulse" 
//                 easing="ease-out"
//                 iterationCount="infinite"
//                 className="absolute bottom-6 right-10 mx-auto"
//               >
//                 <TouchableOpacity
//                   className="bg-white px-3 py-1.5 w-44 rounded-full shadow-2xl flex-row items-center justify-center"
//                   onPress={handleOrderPress}
//                   activeOpacity={0.7}
//                   style={{
//                     shadowColor: '#253a6c',
//                     shadowOffset: { width: 0, height: 4 },
//                     shadowOpacity: 0.3,
//                     shadowRadius: 10,
//                     elevation: 8,
//                     borderWidth: 2,
//                     borderColor: '#253a6c',
//                     transform: [{ scale: 1.02 }]
//                   }}
//                 >
//                   <View className="bg-MainTheme p-2 rounded-full mr-2">
//                     <FontAwesome5 name="cart-plus" size={20} color="white" />
//                     {/* <MaterialCommunityIcons name="store-plus" size={24} color="white" /> */}
//                   </View>
//                   <Text className="text-MainTheme font-bold text-[1.05rem]">Order Now</Text>
//                 </TouchableOpacity>
//               </Animatable.View>
//             </View>
//           </View>

//           {/* Price Trends Sections - Enhanced UI */}
//           <View className="px-5 pt-6">
//             <Text className="text-xl font-bold mb-4" style={{ color: themeColor }}>
//               Market Trends
//             </Text>
            
//             <HStack space="md" className="w-full">
//               <View className="flex-1 w-[190px]">
//                 <View className="bg-white p-2.5 rounded-t-xl border-b-2 border-green-100 shadow-sm" style={{
//                   backgroundColor: '#4CAF70',
//                   shadowColor: '#10B981',
//                   shadowOffset: { width: 0, height: 2 },
//                   shadowOpacity: 0.1,
//                   shadowRadius: 6,
//                   elevation: 3,
//                 }}>
//                   <HStack className="items-center justify-between">
//                     <Text className="font-bold text-lg  text-white">Price Surge</Text>
//                     <View className="bg-green-100 p-1.5 rounded-full">
//                       <MaterialIcons name="trending-up" size={20} color="#10B981" />
//                     </View>
//                   </HStack>
//                 </View>
//                 <VStack space="sm" className="bg-gray-50 pt-2 px-3 rounded-b-xl" style={{
//                   shadowColor: '#10B981',
//                   shadowOffset: { width: 0, height: 2 },
//                   shadowOpacity: 0.05,
//                   shadowRadius: 6,
//                   elevation: 2,
//                 }}>
//                   {vegetables.filter(v => v.trend === 'surge').map((veg) => (
//                     <View key={veg.id} className=" last:mb-0 pb-2 border-b-2 border-gray-200">
//                       <HStack className="items-center justify-between ">
//                         <Text className="font-medium text-gray-800">{veg.name}</Text>
//                         <HStack className="items-center bg-[#4CAF70] px-1.5 py-1 rounded-full justify-center w-12">
//                           <Text className="text-white font-bold text-xs">+{veg.change}</Text>
//                         </HStack>
//                       </HStack>
//                       <Text className="text-gray-500 text-xs">{veg.price}</Text>
//                     </View>
//                   ))}
//                 </VStack>
//               </View>

//               <View className="flex-1 w-[190px]">
//                 <View className="bg-white p-2.5 rounded-t-xl border-b-2 border-red-100 shadow-sm" style={{
//                   backgroundColor: '#cf2233',
//                   shadowColor: '#EF4444',
//                   shadowOffset: { width: 0, height: 2 },
//                   shadowOpacity: 0.1,
//                   shadowRadius: 6,
//                   elevation: 3,
//                 }}>
//                   <HStack className="items-center justify-between">
//                     <Text className="font-bold text-lg text-white">Price Drop</Text>
//                     <View className="bg-red-100 p-1.5 rounded-full">
//                       <MaterialIcons name="trending-down" size={20} color="#EF4444" />
//                     </View>
//                   </HStack>
//                 </View>
//                 <VStack space="sm" className="bg-gray-50 pt-2 px-3 rounded-b-xl" style={{
//                   shadowColor: '#EF4444',
//                   shadowOffset: { width: 0, height: 2 },
//                   shadowOpacity: 0.05,
//                   shadowRadius: 6,
//                   elevation: 2,
//                 }}>
//                   {vegetables.filter(v => v.trend === 'drop').map((veg) => (
//                     <View key={veg.id} className="pb-2 border-b-2 border-gray-200 ">
//                       <HStack className="items-center justify-between">
//                         <Text className="font-medium text-gray-800">{veg.name}</Text>
//                         <HStack className="items-center justify-center bg-[#cf2233] px-2 py-1 rounded-full w-12">
//                           <Text className="text-white font-bold text-xs">-{veg.change}</Text>
//                         </HStack>
//                       </HStack>
//                       <Text className="text-gray-500 text-xs">{veg.price}</Text>
//                     </View>
//                   ))}
//                 </VStack>
//               </View>
//             </HStack>

//             <View className=" pt-2">
             

//               {/* <HStack className='justify-between'>
//               <View className="bg-white rounded-xl shadow-md border-gray-200 border p-3 w-[190px]">
//                 <HStack className="items-center justify-between mb-3">
//                   <HStack className="items-center">
//                     <Text className="ml-2 font-extrabold font-poppins text-lg text-green-700">Price Surge</Text>
//                   </HStack>
//                   <MaterialIcons name="trending-up" size={22} color="#10B981" />

//                 </HStack>

//                 {vegetables.filter(v => v.trend === 'surge').map(veg => (
//                   <HStack  
//                     key={veg.id} 
//                     className="flex-row items-start justify-between bg-green-50 rounded-lg p-2 mb-2"
//                   >
//                     <VStack>
//                       <Text className="flex-1 font-medium">{veg.name}</Text>
//                       <Text className="text-gray-500 text-xs">{veg.price}</Text>
//                     </VStack>
//                     <Text className="text-green-600 font-bold text-sm">+{veg.change}</Text>
//                   </HStack>
//                 ))}
//               </View>

//               <View className="bg-white rounded-xl shadow-md p-4 w-[190px] border-gray-200 border">
//                 <HStack className="items-center justify-between mb-3">
//                   <HStack className="items-center">
//                     <Text className="ml-2 font-extrabold font-poppins text-lg text-red-700">Price Drop</Text>
//                   </HStack>
//                   <MaterialIcons name="trending-down" size={22} color="#EF4444" />

//                 </HStack>

//                 {vegetables.filter(v => v.trend === 'drop').map(veg => (
//                   <HStack 
//                     key={veg.id} 
//                     className="flex-row items-start justify-between bg-red-50 rounded-lg p-2 mb-2"
//                   >
//                     <VStack>
//                       <Text className="flex-1 font-medium">{veg.name}</Text>
//                       <Text className="text-gray-500 text-xs">{veg.price}</Text>

//                     </VStack>
//                     <Text className="text-red-600 font-bold text-sm">-{veg.change}</Text>
//                   </HStack>
//                 ))}
//               </View>
//               </HStack> */}

              

              
//             </View>


//              <Actionsheet isOpen={showActionsheet} onClose={handleClose} className='h-96'>
//                 <ActionsheetBackdrop />
//                 <ActionsheetContent>
//                   <ActionsheetDragIndicatorWrapper>
//                     <ActionsheetDragIndicator />
//                   </ActionsheetDragIndicatorWrapper>
//                   <ActionsheetItem onPress={handleClose}>
//                     <ActionsheetItemText>Edit Message</ActionsheetItemText>
//                   </ActionsheetItem>
//                   <ActionsheetItem onPress={handleClose}>
//                     <ActionsheetItemText>Mark Unread</ActionsheetItemText>
//                   </ActionsheetItem>
//                   <ActionsheetItem onPress={handleClose}>
//                     <ActionsheetItemText>Remind Me</ActionsheetItemText>
//                   </ActionsheetItem>
//                   <ActionsheetItem onPress={handleClose}>
//                     <ActionsheetItemText>Add to Saved Items</ActionsheetItemText>
//                   </ActionsheetItem>
//                   <ActionsheetItem isDisabled onPress={handleClose}>
//                     <ActionsheetItemText>Delete</ActionsheetItemText>
//                   </ActionsheetItem>
//                 </ActionsheetContent>
//               </Actionsheet>

            

//           </View>
//         </ScrollView>
//       </Box>
//     </GluestackUIProvider>
//   );
// };

// export default HomePage;


import { View, Text, Image, ScrollView, TouchableOpacity, Animated, Easing } from 'react-native';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { HStack } from '@/components/ui/hstack';
import { config } from '@/components/ui/gluestack-ui-provider/config';
import { FontAwesome5, MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from 'expo-router';
import { Actionsheet, ActionsheetContent, ActionsheetItem, ActionsheetItemText, ActionsheetDragIndicator, ActionsheetDragIndicatorWrapper, ActionsheetBackdrop } from "@/components/ui/actionsheet";
import { Button, ButtonText } from "@/components/ui/button";
import { useState, useRef, useEffect } from 'react';

const HomePage = () => {
  const themeColor = '#253a6c';
  const accentColor = '#3b82f6';
  const navigation = useNavigation<any>();
  const [showActionsheet, setShowActionsheet] = useState(false);
  const handleClose = () => setShowActionsheet(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const user = {
    name: 'Random Person',
    profilePic: 'https://randomuser.me/api/portraits/men/1.jpg',
    ordersCompleted: 24,
    memberSince: '2022',
  };

  const vegetables = [
    { id: 1, name: 'Tomatoes', change: '24%', trend: 'surge', price: '$2.99/lb' },
    { id: 2, name: 'Onions', change: '18%', trend: 'drop',  price: '$1.49/lb' },
    { id: 3, name: 'Carrots', change: '32%', trend: 'surge',  price: '$3.29/lb' },
    { id: 4, name: 'Spinach', change: '12%', trend: 'drop',  price: '$2.19/bunch' },
    { id: 5, name: 'Bell Peppers', change: '15%', trend: 'surge', price: '$4.99/lb' },
    { id: 6, name: 'Potatoes', change: '8%', trend: 'drop',  price: '$0.99/lb' },
    { id: 7, name: 'Sweet Potatoes', change: '8%', trend: 'drop',  price: '$0.99/lb' },
    { id: 8, name: 'Potatoes', change: '8%', trend: 'drop',  price: '$0.99/lb' },
    { id: 9, name: 'Radish', change: '8%', trend: 'surge',  price: '$0.99/lb' },
    { id: 10, name: 'Cabbage', change: '8%', trend: 'surge',  price: '$0.99/lb' },
  ];

  useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();
    return () => pulseAnimation.stop();
  }, []);

  const handleOrderPress = () => {
    setShowActionsheet(true);
    console.log('Order button pressed');
  };

  return (
    <GluestackUIProvider>
      <Box style={{ flex: 1, backgroundColor: '#DDE3E6', paddingBottom:40 }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }} className='bg-[#eff8f7] '>
          {/* Enhanced Profile Section */}
          <VStack space="md" className='px-5 pt-16 bg-MainTheme rounded-br-3xl'>
             <View className="absolute -right-1 z-20 -top-10 w-32 h-32 bg-white opacity-10 rounded-full"></View>
              <View className="absolute -right-5 -bottom-5 w-20 h-20 bg-white opacity-10 rounded-full"></View>
            <HStack space="sm" className='flex items-center justify-between'>
              <HStack space="sm" className='flex items-center px-1 w-[20.5rem] py-5 h-32 rounded-tl-3xl relative overflow-hidden'
              style={{
                shadowColor: themeColor,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 6,
              }}>
               
                
                <Image
                  source={{ uri: user.profilePic }}
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 16,
                    borderWidth: 3,
                    borderColor: 'rgba(255,255,255,0.3)',
                  }}
                />
                <VStack className="ml-3">
                  <Text className="text-white text-lg font-poppins">Welcome back!</Text>
                  <Text className="text-white text-2xl font-bold font-potta">{user.name}</Text>
                  <HStack className="items-center mt-1">
                    <Text className="text-white text-xs">Member since {user.memberSince}</Text>
                  </HStack>
                </VStack>
              </HStack>
              
              <View className="bg-[#eaeef1] p-3 h-32 w-24 rounded-t-3xl items-center justify-center shadow-lg" style={{
                shadowColor: themeColor,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 6,
              }}>
                <View className="bg-MainTheme p-1 rounded-full mb-1">
                  <MaterialCommunityIcons name="truck-delivery" size={20} color="white" />
                </View>
                <Text className="text-MainTheme text-sm font-poppins font-extrabold">Orders</Text>
                <Text className="text-MainTheme font-bold text-xl">{user.ordersCompleted}</Text>
              </View>
            </HStack>
          </VStack>

          <View className="px-5 pt-6"
          style={{
              shadowColor: themeColor,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 10,
            }}>
            <View className="relative h-72 rounded-r-3xl  overflow-hidden flex flex-row " >
              <Image 
                source={require('../../assets/images/map.jpeg')}
                className="w-[61%] h-full"
                resizeMode="cover"
              />
              
              <View className="w-[40%] h-full bg-[#93c6e1] flex flex-row justify-center pr-3 relative">
                <View className="absolute -right-10 -top-10 w-32 h-32 bg-white opacity-10 rounded-full"></View>
                <View className="absolute right-5 -top-25 w-36 h-36 bg-white opacity-10 rounded-full"></View>
                <View className="absolute -right-5 -bottom-5 w-20 h-20 bg-white opacity-10 rounded-full"></View>
                <Text className="text-MainTheme text-xl leading-6 font-extrabold drop-shadow-lg text-right pr-5 pt-14 -ml-10 font-poppins relative z-10">
                  Fresh vegetables delivered to your doorstep within hours
                </Text>
              </View>
              
              <Animated.View 
                style={{
                  transform: [{ scale: pulseAnim }],
                  position: 'absolute',
                  bottom: 30,
                  left: 0,
                  right: 0,
                  alignItems: 'center',
                }}
              >
                <TouchableOpacity
                  className="px-5 py-3 rounded-full flex-row items-center justify-center"
                  onPress={handleOrderPress}
                  activeOpacity={0.7}
                  style={{
                    backgroundColor: themeColor,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 6 },
                    shadowOpacity: 0.3,
                    shadowRadius: 12,
                    elevation: 12,
                    borderWidth: 2,
                    borderColor: 'rgba(255,255,255,0.3)',
                  }}
                >
                  <View className="bg-white p-2 rounded-full mr-3">
                    <FontAwesome5 name="cart-plus" size={20} color={themeColor} />
                  </View>
                  <Text className="text-white font-bold text-lg">ORDER NOW</Text>
                  <View className="ml-2 w-2 h-2 bg-white rounded-full animate-ping opacity-75"></View>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </View>

          <View className="px-5 pt-6">
            <HStack className="items-center justify-between mb-4">
              <Text className="text-xl font-bold" style={{ color: themeColor }}>
                Market Trends
              </Text>
              <TouchableOpacity className="flex-row items-center">
                <Text className="text-MainTheme text-sm mr-1">View All</Text>
                <MaterialIcons name="arrow-forward-ios" size={14} color={themeColor} />
              </TouchableOpacity>
            </HStack>
            
            <HStack space="md" className="w-full">
              <View className="flex-1 w-[190px]">
                <View className="bg-white p-2.5 rounded-t-xl border-b-2 border-green-100 shadow-sm" style={{
                  backgroundColor: '#4CAF70',
                  shadowColor: '#e1e1e1',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 6,
                  elevation: 3,
                }}>
                  <HStack className="items-center justify-between">
                    <Text className="font-bold text-lg  text-white">Price Surge</Text>
                    <View className="bg-green-100 p-1.5 rounded-full">
                      <MaterialIcons name="trending-up" size={20} color="#10B981" />
                    </View>
                  </HStack>
                </View>
                <VStack space="sm" className="bg-gray-50 pt-2 px-3 rounded-b-xl" style={{
                  shadowColor: '#e1e1e1',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.05,
                  shadowRadius: 6,
                  elevation: 2,
                }}>
                  {vegetables.filter(v => v.trend === 'surge').map((veg) => (
                    <View key={veg.id} className=" last:mb-0 pb-2 border-b-2 border-gray-200">
                      <HStack className="items-center justify-between ">
                        <Text className="font-medium text-gray-800">{veg.name}</Text>
                        <HStack className="items-center bg-[#4CAF70] px-1.5 py-1 rounded-full justify-center w-12">
                          <Text className="text-white font-bold text-xs">+{veg.change}</Text>
                        </HStack>
                      </HStack>
                      <Text className="text-gray-500 text-xs">{veg.price}</Text>
                    </View>
                  ))}
                </VStack>
              </View>

              <View className="flex-1 w-[190px]">
                <View className="bg-white p-2.5 rounded-t-xl border-b-2 border-red-100 shadow-sm" style={{
                  backgroundColor: '#cf2233',
                  shadowColor: '#EF4444',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 6,
                  elevation: 3,
                }}>
                  <HStack className="items-center justify-between">
                    <Text className="font-bold text-lg text-white">Price Drop</Text>
                    <View className="bg-red-100 p-1.5 rounded-full">
                      <MaterialIcons name="trending-down" size={20} color="#EF4444" />
                    </View>
                  </HStack>
                </View>
                <VStack space="sm" className="bg-gray-50 pt-2 px-3 rounded-b-xl" style={{
                  shadowColor: '#EF4444',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.05,
                  shadowRadius: 6,
                  elevation: 2,
                }}>
                  {vegetables.filter(v => v.trend === 'drop').map((veg) => (
                    <View key={veg.id} className="pb-2 border-b-2 border-gray-200 ">
                      <HStack className="items-center justify-between">
                        <Text className="font-medium text-gray-800">{veg.name}</Text>
                        <HStack className="items-center justify-center bg-[#cf2233] px-2 py-1 rounded-full w-12">
                          <Text className="text-white font-bold text-xs">-{veg.change}</Text>
                        </HStack>
                      </HStack>
                      <Text className="text-gray-500 text-xs">{veg.price}</Text>
                    </View>
                  ))}
                </VStack>
              </View>
            </HStack>
          </View>

          <Actionsheet isOpen={showActionsheet} onClose={handleClose} className='h-96'>
            <ActionsheetBackdrop />
            <ActionsheetContent>
              <ActionsheetDragIndicatorWrapper>
                <ActionsheetDragIndicator />
              </ActionsheetDragIndicatorWrapper>
              
              <View className="w-full px-4 py-3 border-b border-gray-200">
                <Text className="text-xl font-bold text-center" style={{ color: themeColor }}>Start Your Order</Text>
              </View>
              
              <ActionsheetItem onPress={handleClose} className="flex-row items-center justify-between">
                <HStack className="items-center">
                  <View className="bg-green-100 p-2 rounded-full mr-3">
                    <MaterialCommunityIcons name="cart-outline" size={24} color="#4CAF70" />
                  </View>
                  <ActionsheetItemText>Regular Delivery</ActionsheetItemText>
                </HStack>
                <MaterialIcons name="chevron-right" size={24} color="#888" />
              </ActionsheetItem>
              
              <ActionsheetItem onPress={handleClose} className="flex-row items-center justify-between">
                <HStack className="items-center">
                  <View className="bg-blue-100 p-2 rounded-full mr-3">
                    <MaterialCommunityIcons name="clock-fast" size={24} color="#3b82f6" />
                  </View>
                  <ActionsheetItemText>Express Delivery</ActionsheetItemText>
                </HStack>
                <MaterialIcons name="chevron-right" size={24} color="#888" />
              </ActionsheetItem>
              
              <ActionsheetItem onPress={handleClose} className="flex-row items-center justify-between">
                <HStack className="items-center">
                  <View className="bg-purple-100 p-2 rounded-full mr-3">
                    <MaterialCommunityIcons name="calendar-clock" size={24} color="#8b5cf6" />
                  </View>
                  <ActionsheetItemText>Schedule Delivery</ActionsheetItemText>
                </HStack>
                <MaterialIcons name="chevron-right" size={24} color="#888" />
              </ActionsheetItem>
              
              <View className="w-full px-4 py-4">
                <Button onPress={handleClose} className="w-full" style={{ backgroundColor: themeColor }}>
                  <ButtonText>View Cart</ButtonText>
                </Button>
              </View>
            </ActionsheetContent>
          </Actionsheet>
        </ScrollView>
      </Box>
    </GluestackUIProvider>
  );
};

export default HomePage;