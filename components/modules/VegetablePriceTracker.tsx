import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Dimensions, Image } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { IDailyPrice } from '@/types/dailyPriceInterface';
import { VegetableService } from '@/api/vegetableService';
import { Box } from '../ui/box';
import { AntDesign,  } from '@expo/vector-icons';

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
    <View className='flex-col flex gap-2'>
      
      <View  className='flex flex-row gap-x-6'>
        <Box className="bg-white px-3 h-28 gap-2 rounded-lg w-1/3 shadow-sm flex py-4 text-left"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 12,
          elevation: 12,
        }}>
          <View className='flex items-center'>            
              <Text className="font-poppins text-lg font-bold text-slate-600 leading-5">
                Market Snapshot:
              </Text>
          </View>

          <View  className='flex flex-row gap-x-2'>           
            <AntDesign name={latestPrice?.trend === 'up'? 'arrow-up': 'arrow-down' } size={22} color={latestPrice?.trend === 'up'? '#22c55e': '#d40d17'} />
            <Text className={`font-poppins text-xl font-black ${latestPrice?.trend === 'up'? 'text-green-500': 'text-red-500'}`}>{latestPrice?.daily_change} %</Text>
          </View>
          
        
        </Box>

        <Box className="bg-white px-4 h-28 rounded-lg flex-1 flex flex-row py-4 text-left"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 12,
            elevation: 12,
          }}>  
          

          <View className='flex flex-row mx-auto justify-around'>
            <View  className='flex flex-col  justify-between'>
              <Text className="font-poppins text-lg font-bold text-slate-600 ">
                Max Price
              </Text>
              <Box className='h-10 bg-[#253a6c]/80 px-2 border border-gray-300 py-1 flex flex-row items-center rounded-md'>
                <Text className='ps-1.5 text-base text-slate-50 font-medium '>Rs</Text>
                <Text className='px-3 font-black text-xl font-poppins text-white'>{latestPrice?.max_price}</Text>
              </Box>
            </View>
            

            <Text className='mx-3 mb-4 font-bold'>_</Text>

             <View className='flex flex-col justify-between  '>
              <Text className="font-poppins text-lg font-bold text-slate-600  ">
                Min Price
              </Text>
              <Box className='h-10 bg-[#253a6c]/80 px-2 border border-gray-300 py-1 flex flex-row items-center rounded-md'>
                <Text className='ps-1.5 text-base text-slate-50 font-medium '>Rs</Text>
                <Text className='px-3 font-black text-xl font-poppins text-white'>{latestPrice?.min_price}</Text>
              </Box>
            </View>
            
          </View>  
       
          
        </Box>
      </View>
    
  
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