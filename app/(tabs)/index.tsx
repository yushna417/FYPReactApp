import { View, Text, Image, ScrollView, TouchableOpacity, Pressable, ActivityIndicator, Alert} from 'react-native';
import { Box } from '@/components/ui/box';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { FontAwesome, FontAwesome5, MaterialCommunityIcons, MaterialIcons, Octicons} from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { useState, useRef, useEffect } from 'react';
import { IDailyPrice } from '@/types/dailyPriceInterface';
import { VegetableService } from '@/api/vegetableService';
import { UserData } from '@/types/userInterface';
import { checkAuth } from '@/api/auth';
import React from "react"
import Animated, {useSharedValue, useAnimatedStyle, withRepeat, withSequence, withTiming} from 'react-native-reanimated';
import ImageSourceModal from '@/components/modules/imageSourceModal';


const HomePage = () => {
  const themeColor = '#253a6c';
  const navigation = useNavigation<any>();
  const [trendingData, setTrendingData] = useState<{
    surging: IDailyPrice[];
    dropping: IDailyPrice[];
  }>({ surging: [], dropping: [] });
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserData | null> (null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const pulse = useSharedValue(1);


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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const authResult = await checkAuth();
        if (authResult.isAuthenticated && authResult.user){
          setUser(authResult.user)
        } else{
          Alert.alert('Authentication Error', "You are not authenicated to view this page")
        }
      } catch(error:any){
        console.log('Error fetching user data:', error)
        Alert.alert('Authentication Error', "An error occurred during authentication.");
      } finally {
        setLoading(false)
        setIsCheckingAuth(false)
      }      
    }  
    fetchUserData();
  }, [])

  useEffect(() => {
    pulse.value = withRepeat(
      withSequence(
        withTiming(1.03, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1, // infinite
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
  }));
  
  if (isCheckingAuth) {
    return <ActivityIndicator />
  }

  if (!user){
    return null
  }
   

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <GluestackUIProvider>
      <Box style={{ flex: 1, backgroundColor: '#DDE3E6'}} >
        <ScrollView showsVerticalScrollIndicator={false} className='bg-slate-100 '>
          <View  className='px-5 pt-14  rounded-b-2xl bg-MainTheme flex flex-col gap-y-5'>
             <View className="absolute -right-1 z-20 -top-10 w-32 h-32 bg-white opacity-10 rounded-full"></View>
              <View className="absolute -right-5 -bottom-5 w-20 h-20 bg-white opacity-10 rounded-full"></View>
            <View className='flex items-center rounded-xl justify-between flex-row gap-x-5'>
              <View  className='flex flex-row gap-x-5 py-3 w-[21rem] rounded-xl ps-1 h-28 relative overflow-hidden bg-MainTheme'
              style={{
                shadowColor: themeColor,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 6,
              }}>
                
                <TouchableOpacity onPress={()=> navigation.navigate('settings')}>
                  {user.profile_image ? (
                    <Image
                      source={{ uri: user.profile_image }}
                      style={{
                        width: 75,
                        height: 75,
                        borderRadius: 16,
                        borderWidth: 3,
                        borderColor: 'white',
                      }}
                    />
                  ) : (
                    <Image
            source={{ uri: "https://thumbs.dreamstime.com/b/man-profile-cartoon-smiling-round-icon-vector-illustration-graphic-design-135443422.jpg" }} // random image
                      style={{
                        width: 75,
                        height: 75,
                        borderRadius: 16,
                        borderWidth: 3,
                        borderColor: 'white',
                      }}
                    />
                  )}
                 
                </TouchableOpacity>
               
               

                <View className='flex flex-col' >
                  <Text className="text-white text-lg font-poppins">Welcome back!</Text>
                  <Text className="text-white text-2xl font-bold font-potta">{user.full_name}</Text>
                  <View className=" mt-1">
                    <Text className="text-white text-xs">Member since {user.date_joined}</Text>
                  </View>
                </View>
              </View>
              
              <View className="bg-slate-400 p-3 h-28 w-24 rounded-t-3xl items-center justify-center " style={{
                shadowColor: themeColor,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 6,
              }}>
                <View className="bg-MainTheme p-1 rounded-full mb-1">
                  <MaterialCommunityIcons name="truck-delivery" size={20} color="white" />
                </View>
                <Text className="text-MainTheme text-sm font-poppins font-extrabold">Orders</Text>
                <Text className="text-MainTheme font-bold text-xl">0</Text>
              </View>
            </View>
          </View>

          <View className="px-5 pt-6"
          style={{
              shadowColor: themeColor,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 10,
            }}>
            <View className="relative h-72 rounded-2xl  overflow-hidden flex flex-row " >
              <Image 
                source={require('../../assets/images/projectImages/map.jpeg')}
                className="w-[61%] h-full"
                resizeMode="cover"
              />
              
              <View className="w-[40%] h-full bg-[#93c6e1] flex flex-row justify-center pr-3 relative">
                <Text className="text-MainTheme text-xl leading-6 font-bold  text-right pr-5 pt-14 -ml-10 font-poppins relative z-10">
                  Fresh vegetables delivered to your doorstep within hours
                </Text>
              </View>
              
               <Animated.View
                  style={animatedStyle}
                  className="absolute bottom-9 right-8 items-center"
                >
                  <TouchableOpacity className='py-3 px-5 rounded-full bg-MainTheme flex flex-row items-center'
                          style={{boxShadow: " 7px 7px 7px #1c2a44",}}>
                              <View className="bg-white p-2 rounded-full mr-3">
                                  <FontAwesome5 name="cart-plus" size={20} color={themeColor} />
                                </View>
                              <Text className='text-white font-jakarta font-semibold text-xl '>Order Now</Text>
                              <View className="ml-5 w-2 h-2 bg-white/40 rounded-full opacity-75"></View>
                              <View className="ml-2 w-2 h-2 bg-white rounded-full opacity-75"></View>
                              <View className="ml-2 w-2 h-2 bg-white/40 rounded-full opacity-75"></View>
                            </TouchableOpacity>
                </Animated.View>           
            </View>
          </View>

          <View className="px-5 pt-6">
            <View className="items-center justify-between mb-4 flex flex-row">
              <Text className="text-xl font-bold" style={{ color: themeColor }}>
                Market Trends
              </Text>
              <TouchableOpacity className="flex-row items-center" onPress={()=> navigation.navigate("Analytics")}>
                <Text className="text-MainTheme text-sm mr-1">View All</Text>
                <MaterialIcons name="arrow-forward-ios" size={14} color={themeColor} />
              </TouchableOpacity>
            </View>
            
            <View className="w-full flex flex-row gap-x-5">
              <View className="flex-1 rounded-xl"
              style={{
                     boxShadow: " 7px 7px 7px #d9d9e1",
              }}>
                <View className="bg-[#4CAF70] p-2.5 rounded-t-xl border-b-2 border-green-100 ">
                  <View className="items-center justify-between flex  flex-row">
                    <Text className="font-bold text-lg  text-white">Price Surge</Text>
                    <View className="bg-green-100 p-1.5 rounded-full">
                      <MaterialIcons name="trending-up" size={20} color="#10B981" />
                    </View>
                  </View>
                </View>
                <View className="bg-gray-50 pt-2 px-3 rounded-b-xl flex flex-col gap-y-2"  >
                  {trendingData.surging.map((veg) => (
                    <Pressable onPress={() => navigation.navigate('Analytics', { vegetable: veg.vegetable.name })}
                     key={veg.id} className=" pb-2 border-b-2 border-gray-200">
                      <View className="items-center justify-between flex flex-row">
                        <Text className="font-medium text-gray-800 text-[0.9rem] w-32" numberOfLines={1} ellipsizeMode="tail">{veg.vegetable.name}</Text>
                        <View className="items-center bg-[#4CAF70] py-1 rounded-xl justify-center w-14 flex">
                          <Text className="text-white font-bold text-xs">+{veg.daily_change !== null ? veg.daily_change.toFixed(1):"0.0"}%</Text>
                        </View>
                      </View>
                      <Text className="text-gray-500 text-xs">Rs {veg.avg_price} /{veg.vegetable.unit}</Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              <View className="flex-1 rounded-xl"
              style={{boxShadow: " 7px 7px 7px #d9d9e1"}}>
                <View className=" p-2.5 rounded-t-xl border-b-2 border-red-100 bg-[#cf2233]" >
                  <View className="items-center justify-between flex flex-row">
                    <Text className="font-bold text-lg text-white">Price Drop</Text>
                    <View className="bg-red-100 p-1.5 rounded-full">
                      <MaterialIcons name="trending-down" size={20} color="#EF4444" />
                    </View>
                  </View>
                </View>
                <View className="bg-white pt-2 px-3 rounded-b-xl flex flex-col gap-y-2" >
                  {trendingData.dropping.map((veg) => (
                    <Pressable onPress={() => navigation.navigate('Analytics', { vegetable: veg.vegetable.name })}
                     key={veg.id} className="pb-2 border-b-2 border-gray-200 ">
                      <View className="items-center justify-between flex flex-row">
                        <Text className="font-medium text-gray-800 text-[0.9rem] w-32" numberOfLines={1} ellipsizeMode="tail">{veg.vegetable.name}</Text>
                        <View className="items-center justify-center flex bg-[#cf2233] py-1 rounded-2xl w-14">
                        <Text className="text-white font-bold text-xs">{veg.daily_change !== null ? veg.daily_change.toFixed(1):"0.0"}%</Text>
                        </View>
                      </View>
                      <Text className="text-gray-500 text-xs">Rs {veg.avg_price} /{veg.vegetable.unit}</Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            </View>
          </View>

         
        </ScrollView>
      </Box>
    </GluestackUIProvider>
  );
};

export default HomePage;