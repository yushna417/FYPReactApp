import React, { forwardRef } from 'react';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { IVeg } from '@/types/vegetableInterface';
// import VegetableSuggestions from './VegetableSuggestions';
import VegetableSuggestions from './vegetableSuggestion';

interface Props {
  query: string;
  showSuggestions: boolean;
  filteredVegetables: IVeg[];
  onSelect: (veg: IVeg) => void;
}

const VegetableActionSheet = forwardRef<ActionSheetRef, Props>(
  ({ query, showSuggestions, filteredVegetables, onSelect }, ref) => {
    return (
      <ActionSheet
        ref={ref}
        gestureEnabled
        containerStyle={{ padding: 16 }}
      >
        <VegetableSuggestions
          showSuggestions={showSuggestions}
          query={query}
          filteredVegetables={filteredVegetables}
          onSelect={onSelect}
        />
      </ActionSheet>
    );
  }
);

export default VegetableActionSheet;
