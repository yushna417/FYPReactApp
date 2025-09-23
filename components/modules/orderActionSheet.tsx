import React, { useEffect, useMemo, useState } from "react";
import { View, Text, Button } from "react-native";
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import { Input, InputField, InputSlot } from "../ui/input";
import { FontAwesome5, MaterialIcons, Ionicons} from "@expo/vector-icons";
import { IVeg } from "@/types/vegetableInterface";
import { ReceivePrice } from "@/types/dailyPriceInterface";
import { VegetableService } from "@/api/vegetableService";
import VegetableSuggestions from "./vegetableSuggestion";
import { Grid, GridItem } from "../ui/grid";



interface OrderActionSheetProps {
  sheetRef: React.RefObject<BottomSheet | null>;
  close: () => void;
}

const OrderActionSheet: React.FC<OrderActionSheetProps> = ({ sheetRef, close }) => {
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);
  const [vegetables, setVegetables] = useState<IVeg[]>([]);
  const [query, setQuery] = useState('');
  const [filteredVegetables, setFilteredVegetables] = useState<IVeg[]>([]);
  const [selectedVegetable, setSelectedVegetable] = useState<IVeg | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [todayVeg, setTodayVeg] = useState<ReceivePrice[]>([])
  
  useEffect(() => {
    const loadVegetables = async() => {
      setIsLoading (true);
      try {
        const data = await VegetableService.getAllVegetables();
        setVegetables(data);

        const availableVeg = await VegetableService.getPriceOnly();
        setTodayVeg(availableVeg)
      }
     catch (error) {
      console.error ('Failed to load vegetable:', error)
    } finally {
      setIsLoading (false)
    } 
  }; loadVegetables();  
  }, [])

  useEffect(() => {
    if (query === '' || selectedVegetable){
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
      <BottomSheet ref={sheetRef} snapPoints={snapPoints} index={1}  backdropComponent={(props) => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}    // hides backdrop when sheet is closed
      appearsOnIndex={0}        // shows backdrop when sheet is open
      pressBehavior="close"     // optional: tap backdrop to close
      opacity={0.5}             // dark transparency (0 to 1)
      enableTouchThrough={false} // disables touch-through
      style={{ backgroundColor: "black" }} // ensures black overlay
    />
  )} >
        <BottomSheetView className="bg-white h-full z-10 px-2"> 
          <MaterialIcons name="close" size={24} color="#253a6c" onPress={close} className="self-end"/>
          <View className="">
            <View className="w-full flex flex-row justify-center items-baseline gap-x-4">
              <FontAwesome5 name="shopping-basket" size={24} color="black" />   
              <Text className="text-gray-800 font-poppins font-bold text-2xl  text-center flex ">Place an Order</Text>
            </View>
            <View className="px-5 py-8 bg-MainTheme mt-3 mb-14">
              <Text className="font-poppins text-xl font-semibold text-white px-2">Vegetable</Text>
              <Input className="rounded-xl px-2 mt-3 h-14 bg-white">
                <InputField placeholder="Enter a vegetable name" className="text-md ml-2" 
                value={query}
                onChangeText={setQuery}/>

                {query.length > 0 && (
                  <InputSlot  className='mr-1' onPress={clearSelection} >
                    <Ionicons name='close-outline' size={20} color="gray" />
                  </InputSlot>
                )}                     
              </Input>  
            </View>
            <View className="px-5 -mt-8">
                <VegetableSuggestions showSuggestions={showSuggestions} query={query} 
                filteredVegetables={filteredVegetables} onSelect={handleSelect}/>
            </View>
            <Text className="font-poppins text-lg font-semibold text-center">
              this Price - to that Price
            </Text>
            <View className="mt-10 flex flex-row gap-x-5 px-5 ">
              <View className="flex flex-1 p-2 border">
              </View>
              <View className="flex w-1/3 p-2 border"></View>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
  );
};

export default OrderActionSheet;
