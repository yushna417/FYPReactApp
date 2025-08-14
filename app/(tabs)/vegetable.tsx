// screens/VegetableScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text,} from 'react-native';
import {Picker} from "@react-native-picker/picker"
import { VegetableService } from '@/api/axios';
import { IVeg } from '@/types/vegetableInterface';
import VegetablePriceTracker from '@/components/VegetablePriceTracker';


const VegetableScreen = () => {
  const [vegetables, setVegetables] = useState<IVeg[]>([]);
  const [selectedVegetable, setSelectedVegetable] = useState<number | null>(null);

  useEffect(() => {
    const loadVegetables = async () => {
      const data = await VegetableService.getAllVegetables();
      setVegetables(data);
      if (data.length) setSelectedVegetable(data[0].id);
    };
    
    loadVegetables();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Picker
        selectedValue={selectedVegetable}
        onValueChange={(itemValue:any) => setSelectedVegetable(itemValue)}
      >
        {vegetables.map(veg => (
          <Picker.Item 
            key={veg.id} 
            label={`${veg.name} (${veg.unit})`} 
            value={veg.id} 
          />
        ))}
      </Picker>

      {selectedVegetable && (
        <VegetablePriceTracker vegetableId={selectedVegetable} />
      )}
    </View>
  );
};

export default VegetableScreen;