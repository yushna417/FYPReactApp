import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { IDailyPrice } from '@/types/dailyPriceInterface';
import { VegetableService } from '@/api/vegetableService';
import { Box } from './ui/box';
import { HStack } from './ui/hstack';
import { AntDesign, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

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
      
      <HStack space='2xl'>
        <Box className="bg-white w-[50%] px-3 h-28 gap-4 rounded-lg  shadow-sm flex-col py-4 text-left"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 12,
          elevation: 12,
        }}>
          <HStack space='sm' className='flex items-center'>
            <MaterialCommunityIcons name="label-percent" size={24} color="black" />
            <Text className="font-poppins text-base font-semibold text-slate-600">
            Market Snapshot:
          </Text>
          </HStack>

          <HStack space='sm' >
            <AntDesign name={latestPrice?.trend === 'up'? 'arrowup': 'arrowdown' } size={24} color={latestPrice?.trend === 'up'? '#22c55e': '#d40d17'} />
            <Text className={`font-poppins text-2xl font-bold ${latestPrice?.trend === 'up'? 'text-green-500': 'text-red-500'}`}>{latestPrice?.daily_change} %</Text>
          </HStack>
          
        
        </Box>

        <Box className="bg-white  flex-1 px-5 h-28 gap-4 rounded-lg shadow-sm flex-col py-4 text-left"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 12,
            elevation: 12,
          }}>  
          <HStack space='md' className='items-center'>
            <MaterialIcons name="money" size={24} color="black" />
            <Text className="font-poppins text-base font-semibold text-slate-600 ">
              Price Range:
            </Text>
          </HStack>      
       
          <Text className="font-poppins text-2xl font-bold text-slate-800">
            Rs {latestPrice?.min_price} - Rs {latestPrice?.max_price}
          </Text>
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