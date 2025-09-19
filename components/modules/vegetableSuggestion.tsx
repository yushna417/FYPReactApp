import React from 'react';
import { Text, FlatList, TouchableOpacity } from 'react-native';
import { Box } from '@/components/ui/box';
import { IVeg } from '@/types/vegetableInterface';

interface VegetableSuggestionsProps {
  showSuggestions: boolean;
  query: string;
  filteredVegetables: IVeg[];
  onSelect: (veg: IVeg) => void;
}

const VegetableSuggestions: React.FC<VegetableSuggestionsProps> = ({
  showSuggestions,
  query,
  filteredVegetables,
  onSelect,
}) => {
  if (!showSuggestions) return null;

  if (query.length > 0 && filteredVegetables.length === 0) {
    return (
      <Box className="px-4 py-3 border border-gray-300 rounded-lg bg-white">
        <Text className="text-gray-500">No vegetables found</Text>
      </Box>
    );
  }

  return (
    showSuggestions &&
    filteredVegetables.length > 0 && (
      <Box className="border border-gray-300 rounded-lg bg-white shadow-md max-h-48">
        <FlatList
          data={filteredVegetables}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => onSelect(item)}
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
    )
  );
};

export default VegetableSuggestions;
