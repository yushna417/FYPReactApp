import React, { useState, useEffect } from 'react';
import {Text,  View, FlatList, TouchableOpacity } from 'react-native';
import { Spinner } from '@/components/ui/spinner';
import { useRoute, RouteProp } from '@react-navigation/native';
import { Input, InputField, InputSlot } from '@/components/ui/input';
import { Box } from '@/components/ui/box';
import { VegetableService } from '@/api/vegetableService';
import { IVeg } from '@/types/vegetableInterface';
import VegetablePriceTracker from '@/components/modules/VegetablePriceTracker';
import { Ionicons } from '@expo/vector-icons';
import VegetableSuggestions from '@/components/modules/vegetableSuggestion';
import { IDailyPrice } from '@/types/dailyPriceInterface';
import { ReceivePrice } from '@/types/dailyPriceInterface';


type RootStackParamList = {
  Vegetable: {vegetable:string}
}

type VegetableScreenRouteProp = RouteProp<RootStackParamList, 'Vegetable'>;

const VegetableScreen = () => {
  const route = useRoute<VegetableScreenRouteProp>();
  const passedVegetableName = route.params?.vegetable;
  const [vegetables, setVegetables] = useState<IVeg[]>([]);
  const [query, setQuery] = useState('');
  const [filteredVegetables, setFilteredVegetables] = useState<IVeg[]>([]);
  const [selectedVegetable, setSelectedVegetable] = useState<IVeg | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [todayVeg, setTodayVeg] = useState<ReceivePrice[]>([])

  useEffect(() => {
    const loadVegetables = async () => {
      setIsLoading(true);
      try {
        const data = await VegetableService.getAllVegetables();
        setVegetables(data);

        const currentVeg = await VegetableService.getPriceOnly();
        setTodayVeg(currentVeg)

         if (passedVegetableName) {
          const foundVeg = data.find(v => 
            v.name.toLowerCase() === passedVegetableName.toLowerCase()
          );
          if (foundVeg) {
            setSelectedVegetable(foundVeg);
            setQuery(foundVeg.name);
          }
        }
      } catch (error) {
        console.error('Failed to load vegetables:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadVegetables();
  }, [passedVegetableName]);

  useEffect(() => {
    if (query === '' || selectedVegetable) {
      setFilteredVegetables([]);
      setShowSuggestions(false);
      return;
    }

    const filtered = vegetables.filter(v =>
      v.name.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredVegetables(filtered);
    setShowSuggestions(true);
  }, [query, vegetables, selectedVegetable]);

  const handleSelect = (veg: IVeg) => {
    setSelectedVegetable(veg);
    setQuery(veg.name);
    setShowSuggestions(false);
    setFilteredVegetables([]);
  };

  const clearSelection = () => {
    setSelectedVegetable(null);
    setQuery('');
    setShowSuggestions(false);
  };

  const todayVegetableIds = todayVeg.map((t) => t.vegetable);

  const isVegetableAvailable =
    selectedVegetable !== null &&
    todayVegetableIds.includes(selectedVegetable.id);

  const hasSelectedVegetable = selectedVegetable !== null;



  return (
    <View className="flex-1 px-7 relative bg-[#f6f7f9] gap-5">
      <View className={`bg-MainTheme -mx-7 pt-24 pb-10 px-7 ${selectedVegetable ? "h-auto" :'h-2/5'}`}>
        <Text className="text-3xl font-black mb-6 text-white font-poppins text-left mx-auto">Vegetable Price Tracker</Text>
      
      <View  className="mb-4 border-l-slate-50 pe-5 py-8 rounded-xl flex flex-col gap-y-5" 
      style={{boxShadow: " 7px 7px 7px #0b1829",}}>        
        
          <Input className="rounded-xl mt-1 h-14 px-2 bg-white" >
            <InputField  size='lg'           
              className="text-md font-poppins "
              value={query}
              onChangeText={setQuery}
              placeholder="Type vegetable name..."
            />
          
          {query.length > 0 && (
            <InputSlot  className='mr-1' onPress={clearSelection} >
              <Ionicons name='close-outline' size={20} color="gray" />
            </InputSlot>
          )}
            
          </Input>

        <VegetableSuggestions
          showSuggestions={showSuggestions}
          query={query}
          filteredVegetables={filteredVegetables}
          onSelect={handleSelect}
        />

      </View>
      </View>
      

    {isLoading && (
      <Box className="items-center justify-center py-8 absolute">
        <Spinner size="large" />
        <Text className="mt-2 text-gray-600">Loading vegetables...</Text>
      </Box>
    )}

    {hasSelectedVegetable && isVegetableAvailable && (
      <View className="flex-col gap-2">
        <VegetablePriceTracker vegetableId={selectedVegetable.id} />
      </View>
    )}

    {!hasSelectedVegetable && !isLoading && (
      <Box className="items-center justify-center py-12">
        <Text className="text-gray-500 text-center">
          Search for a vegetable above to track its prices
        </Text>
      </Box>
    )}

    {hasSelectedVegetable && !isVegetableAvailable && !isLoading && (
      <Box className="items-center justify-center py-12">
        <Text className="text-gray-500 text-center">
          Out of season at the moment. Availability will resume in its harvest period. 
        </Text>
      </Box>
    )}

    </View>
  );
};

export default VegetableScreen;