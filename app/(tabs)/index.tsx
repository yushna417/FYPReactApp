import { View, Text, Image, ScrollView, TouchableOpacity, Animated, Easing, ActivityIndicator } from 'react-native';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { HStack } from '@/components/ui/hstack';
import { FontAwesome5, MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { Actionsheet, ActionsheetContent, ActionsheetItem, ActionsheetItemText, ActionsheetDragIndicator, ActionsheetDragIndicatorWrapper, ActionsheetBackdrop } from "@/components/ui/actionsheet";
import { Button, ButtonText } from "@/components/ui/button";
import { useState, useRef, useEffect } from 'react';
import { IVeg } from '@/types/vegetableInterface';
import { IDailyPrice } from '@/types/dailyPriceInterface';
import { VegetableService } from '@/api/vegetableService';
import { navigate } from 'expo-router/build/global-state/routing';



const HomePage = () => {
  const themeColor = '#253a6c';
  const navigation = useNavigation<any>();
  const [trendingData, setTrendingData] = useState<{
    surging: IDailyPrice[];
    dropping: IDailyPrice[];
  }>({ surging: [], dropping: [] });
  const [loading, setLoading] = useState(true);

  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const fetchData = async () => {
      try{
        setLoading(true);
        const [pricesResponse, veggiesResponse] = await Promise.all([
          VegetableService.getLatestPrices(),
          VegetableService.getAllVegetables()
        ]);

        const vegMap = new Map(
          veggiesResponse.map(veg => [veg.id, veg])
        );

        const processedPrices = pricesResponse.map(price => ({
          ...price,
          vegetable:vegMap.get(
            typeof price.vegetable === 'number' 
            ? price.vegetable
            : price.vegetable.id) || {id:0, name:'Unknown', unit:'unit'}
        }));

        const surging = processedPrices
          .filter(p => p.trend === 'up')
          .sort((a, b) => (b.daily_change || 0) - (a.daily_change || 0))
          .slice(0, 5);
        
        const dropping = processedPrices
          .filter(p => p.trend === 'down')
          .sort((a, b) => (a.daily_change || 0) - (b.daily_change || 0))
          .slice(0, 5);
        
        setTrendingData({ surging, dropping });
    }
     catch (error) {
      console.error ('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };
   fetchData();  
  }, []);

   const formatChange = (change: number | null) => {
    if (change === null) return '0%';
    return `${change > 0 ? '+' : ''}${Math.abs(change).toFixed(0)}%`;
  };

  

  const user = {
    name: 'Random Person',
    profilePic: 'https://randomuser.me/api/portraits/men/1.jpg',
    ordersCompleted: 24,
    memberSince: '2022',
  };


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


  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <GluestackUIProvider>
      <Box style={{ flex: 1, backgroundColor: '#DDE3E6', paddingBottom:40 }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }} className='bg-[#eff8f7] '>
          {/* Enhanced Profile Section */}
          <VStack space="md" className='px-5 pt-16 bg-MainTheme rounded-br-[2rem]'>
             <View className="absolute -right-1 z-20 -top-10 w-32 h-32 bg-white opacity-10 rounded-full"></View>
              <View className="absolute -right-5 -bottom-5 w-20 h-20 bg-white opacity-10 rounded-full"></View>
            <HStack space="sm" className='flex items-center'>
              <HStack space="xl" className='flex py-2 w-[20.5rem] h-32 relative overflow-hidden'
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
                    borderColor: 'white',
                  }}
                />
                <VStack >
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
              <TouchableOpacity className="flex-row items-center" onPress={()=> navigation.navigate("vegetable")}>
                <Text className="text-MainTheme text-sm mr-1">View All</Text>
                <MaterialIcons name="arrow-forward-ios" size={14} color={themeColor} />
              </TouchableOpacity>
            </HStack>
            
            <HStack space='xl' className="w-full">
              <View className="flex-1 rounded-xl"
              style={{
                     boxShadow: " 7px 7px 7px #d9d9e1",

              }}>
                <View className="bg-[#4CAF70] p-2.5 rounded-t-xl border-b-2 border-green-100 shadow-sm">
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
                  {trendingData.surging.map((veg) => (
                    <TouchableOpacity onPress={() => navigation.navigate('Analytics', { vegetable: veg.vegetable.name })}
                     key={veg.id} className=" last:mb-0 pb-2 border-b-2 border-gray-200">
                      <HStack className="items-center justify-between ">
                        <Text className="font-medium text-gray-800 text-[0.9rem] w-32" numberOfLines={1} ellipsizeMode="tail">{veg.vegetable.name}</Text>
                        <HStack className="items-center bg-[#4CAF70] py-1 rounded-xl justify-center w-14">
                          <Text className="text-white font-bold text-xs">+{veg.daily_change !== null ? veg.daily_change.toFixed(1):"0.0"}%</Text>
                        </HStack>
                      </HStack>
                      <Text className="text-gray-500 text-xs">Rs {veg.avg_price} /{veg.vegetable.unit}</Text>
                    </TouchableOpacity>
                  ))}
                </VStack>
              </View>

              <View className="flex-1 rounded-xl"
              style={{
                     boxShadow: " 7px 7px 7px #d9d9e1",

              }}>
                <View className=" p-2.5 rounded-t-xl border-b-2 border-red-100 shadow-sm bg-[#cf2233]" >
                  <HStack className="items-center justify-between">
                    <Text className="font-bold text-lg text-white">Price Drop</Text>
                    <View className="bg-red-100 p-1.5 rounded-full">
                      <MaterialIcons name="trending-down" size={20} color="#EF4444" />
                    </View>
                  </HStack>
                </View>
                <VStack space="sm" className="bg-gray-50 pt-2 px-3 rounded-b-xl" >
                  {trendingData.dropping.map((veg) => (
                    <TouchableOpacity onPress={() => navigation.navigate('Analytics', { vegetable: veg.vegetable.name })}
                     key={veg.id} className="pb-2 border-b-2 border-gray-200 ">
                      <HStack className="items-center justify-between">
                        <Text className="font-medium text-gray-800 text-[0.9rem] w-32" numberOfLines={1} ellipsizeMode="tail">{veg.vegetable.name}</Text>
                        <HStack className="items-center justify-center bg-[#cf2233] py-1 rounded-2xl w-14">
                        <Text className="text-white font-bold text-xs">{veg.daily_change !== null ? veg.daily_change.toFixed(1):"0.0"}%</Text>
                        </HStack>
                      </HStack>
                      <Text className="text-gray-500 text-xs">Rs {veg.avg_price} /{veg.vegetable.unit}</Text>
                    </TouchableOpacity>
                  ))}
                </VStack>
              </View>
            </HStack>
          </View>

         
        </ScrollView>
      </Box>
    </GluestackUIProvider>
  );
};

export default HomePage;