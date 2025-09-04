import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Dimensions, Image } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { IDailyPrice } from '@/types/dailyPriceInterface';
import { VegetableService } from '@/api/vegetableService';
import { Box } from '../ui/box';
import { HStack } from '../ui/hstack';
import { AntDesign, FontAwesome6, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { VStack } from '../ui/vstack';
import { Divider } from '../ui/divider';

interface Props {
  vegetableId: number;
}

const VegetablePriceTracker = ({ vegetableId }: Props) => {
  const [prices, setPrices] = useState<IDailyPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [latestPrice, setLatestPrice] = useState<IDailyPrice>()


  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await VegetableService.getDailyPrices(vegetableId);
        const sortedData = data.sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setLatestPrice(sortedData[0] || null)
        const latest7Days = sortedData.slice(0, 7);
        setPrices(latest7Days.reverse());
      } catch (error) {
        console.error('Failed to fetch prices:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [vegetableId]);

 

  if (loading) return <ActivityIndicator size="large" />;

  if (!prices.length) return <Text>No price data available</Text>;

  return (
    <View className='flex-col gap-2'>
      
      <HStack space='2xl' className='grid grid-cols-3'>
        <Box className="bg-white w-1/3 px-3 h-28 gap-2 rounded-lg col-span-1 shadow-sm flex py-4 text-left"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 12,
          elevation: 12,
        }}>
          <HStack className='flex items-center'>            
              <Text className="font-poppins text-lg font-bold text-slate-600 leading-5">
                Market Snapshot:
              </Text>
          </HStack>

          <HStack space='xs' >           
            <AntDesign name={latestPrice?.trend === 'up'? 'arrowup': 'arrowdown' } size={22} color={latestPrice?.trend === 'up'? '#22c55e': '#d40d17'} />
            <Text className={`font-poppins text-xl font-black ${latestPrice?.trend === 'up'? 'text-green-500': 'text-red-500'}`}>{latestPrice?.daily_change} %</Text>
          </HStack>
          
        
        </Box>

        <Box className="bg-white  flex-1 px-4 h-28 gap-4 rounded-lg shadow-sm col-span-2 flex-col py-4 text-left"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 12,
            elevation: 12,
          }}>  
          

          <HStack className='grid grid-cols-2 grid-rows-1 mx-auto'>
            <VStack space='md' className='flex col-span-1 '>
              <Text className="font-poppins text-lg font-bold text-slate-600 ">
                Max Price
              </Text>
              <Box className='h-10 bg-[#253a6c]/80 px-2 border border-gray-300 py-1 flex flex-row items-center rounded-md'>
                <Text className='ps-1.5 text-base text-slate-50 font-medium '>Rs</Text>
                <Text className='px-3 font-black text-xl font-poppins text-white'>{latestPrice?.max_price}</Text>
              </Box>
            </VStack>
            

            <Text className='mx-3 self-end mb-4'>_</Text>

             <VStack space='md' className='flex col-span-1 '>
              <Text className="font-poppins text-lg font-bold text-slate-600  ">
                Min Price
              </Text>
              <Box className='h-10 bg-[#253a6c]/80 px-2 border border-gray-300 py-1 flex flex-row items-center rounded-md'>
                <Text className='ps-1.5 text-base text-slate-50 font-medium '>Rs</Text>
                <Text className='px-3 font-black text-xl font-poppins text-white'>{latestPrice?.min_price}</Text>
              </Box>
            </VStack>
            
          </HStack>  
       
          
        </Box>
      </HStack>
    
  
      <Text className='font-poppins text-lg font-bold mt-6 text-MainTheme'>Market Trend</Text>
      <LineChart
        data={{
          labels: prices.map(p => {
            const date = new Date(p.date);
            return date.toLocaleDateString('en-US', { day: 'numeric', month: 'numeric' });
          }),
          datasets: [{
            data: prices.map(p => p.avg_price),
          }]
        }}
        width={Dimensions.get('window').width - 50}
        height={250}
        chartConfig={{
          backgroundColor: '#697fbd',
          backgroundGradientFrom: '#253a6c', 
          backgroundGradientTo: '#7dbef4',   
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, 
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
         
          propsForDots: {
            r: 5,
            strokeWidth: 2,
            stroke: '#ffffff'
          },
          propsForBackgroundLines: {
            strokeDasharray: "5", 
            stroke: 'rgba(255, 255, 255, 0.2)' 
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 6
        }}
      />
    </View>
  );
};



export default VegetablePriceTracker;