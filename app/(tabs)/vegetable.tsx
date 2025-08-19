// screens/VegetableScreen.tsx
import React, { useState, useEffect } from 'react';
import {Text,  View, FlatList, TouchableOpacity } from 'react-native';
import { Spinner } from '@/components/ui/spinner';
import { Button, ButtonText } from '@/components/ui/button';
import { Input, InputField } from '@/components/ui/input';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { VegetableService } from '@/api/vegetableService';
import { IVeg } from '@/types/vegetableInterface';
import VegetablePriceTracker from '@/components/VegetablePriceTracker';

const VegetableScreen = () => {
  const [vegetables, setVegetables] = useState<IVeg[]>([]);
  const [query, setQuery] = useState('');
  const [filteredVegetables, setFilteredVegetables] = useState<IVeg[]>([]);
  const [selectedVegetable, setSelectedVegetable] = useState<IVeg | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadVegetables = async () => {
      setIsLoading(true);
      try {
        const data = await VegetableService.getAllVegetables();
        setVegetables(data);
      } catch (error) {
        console.error('Failed to load vegetables:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadVegetables();
  }, []);

  useEffect(() => {
    if (query === '') {
      setFilteredVegetables([]);
      setShowSuggestions(false);
      return;
    }

    const filtered = vegetables.filter(v =>
      v.name.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredVegetables(filtered);
    setShowSuggestions(true);
  }, [query, vegetables]);

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

  return (
    <View className="flex-1 px-7 py-20  bg-gray-50">
      <Text className="text-xl font-bold mb-6 text-gray-800">Vegetable Price Tracker</Text>
      
      <VStack space="md" className="mb-4">
        <Text className="text-sm font-semibold text-gray-700">Search for a Vegetable</Text>
        
        <Box className="relative">
          <Input variant="outline" size="md" className="border-gray-300 rounded-lg">
            <InputField
              value={query}
              onChangeText={setQuery}
              placeholder="Type vegetable name..."
              onFocus={() => query.length > 0 && setShowSuggestions(true)}
            />
          </Input>
          
          {query.length > 0 && (
            <Button 
              variant="link" 
              size="sm" 
              className="absolute right-2 top-2"
              onPress={clearSelection}
            >
              <ButtonText>Clear</ButtonText>
            </Button>
          )}
        </Box>

        {showSuggestions && filteredVegetables.length > 0 && (
          <Box className="border border-gray-300 rounded-lg bg-white shadow-md max-h-48">
            <FlatList
              data={filteredVegetables}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  onPress={() => handleSelect(item)} 
                  className="px-4 py-3 border-b border-gray-100 active:bg-gray-100"
                >
                  <Text className="text-gray-800">
                    {item.name} {item.unit && `(${item.unit})`}
                  </Text>
                </TouchableOpacity>
              )}
              keyboardShouldPersistTaps="handled"
            />
          </Box>
        )}

        {showSuggestions && query.length > 0 && filteredVegetables.length === 0 && (
          <Box className="px-4 py-3 border border-gray-300 rounded-lg bg-white">
            <Text className="text-gray-500">No vegetables found</Text>
          </Box>
        )}
      </VStack>

      {isLoading && (
        <Box className="items-center justify-center py-8">
          <Spinner size="large" />
          <Text className="mt-2 text-gray-600">Loading vegetables...</Text>
        </Box>
      )}

      {selectedVegetable && (
        <VegetablePriceTracker vegetableId={selectedVegetable.id} />
      )}

      {!selectedVegetable && !isLoading && (
        <Box className="items-center justify-center py-12">
          <Text className="text-gray-500 text-center">
            Search for a vegetable above to track its prices
          </Text>
        </Box>
      )}
    </View>
  );
};

export default VegetableScreen;