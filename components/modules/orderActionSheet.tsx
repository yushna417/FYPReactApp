import React, { useEffect, useMemo, useState } from "react";
import { View, Text, Button, TouchableOpacity, Pressable } from "react-native";
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import { Input, InputField, InputSlot } from "../ui/input";
import { FontAwesome6, MaterialIcons, Ionicons, Feather, SimpleLineIcons, Entypo, MaterialCommunityIcons} from "@expo/vector-icons";
import { IVeg } from "@/types/vegetableInterface";
import { ReceivePrice } from "@/types/dailyPriceInterface";
import { VegetableService } from "@/api/vegetableService";
import VegetableSuggestions from "./vegetableSuggestion";
import { Divider } from "../ui/divider";
import { Box } from "../ui/box";
import { IDailyPrice } from "@/types/dailyPriceInterface";


interface OrderActionSheetProps {
  sheetRef: React.RefObject<BottomSheet | null>;
  close: () => void;
}

const OrderActionSheet: React.FC<OrderActionSheetProps> = ({ sheetRef, close }) => {
  const snapPoints = useMemo(() => [ "50%", "90%"], []);
  const [vegetables, setVegetables] = useState<IVeg[]>([]);
  const [query, setQuery] = useState('');
  const [filteredVegetables, setFilteredVegetables] = useState<IVeg[]>([]);
  const [selectedVegetable, setSelectedVegetable] = useState<IVeg | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [todayVeg, setTodayVeg] = useState<ReceivePrice[]>([]);
  const [latestPrice, setLatestPrice] = useState<IDailyPrice>();
  const [price, setPrice] = useState<string>("");
  const [unit, setUnit] = useState<string>("1");
  const minPrice = latestPrice?.min_price ?? 0;

  const handleIncrease = () => {
    setPrice((prev) => {
      const num = parseInt(prev) || minPrice;
      return (num + 5).toString();
    });
  };

  const handleDecrease = () => {
    setPrice((prev) => {
      const num = parseInt(prev) || minPrice;
      const newVal = num - 5 >= minPrice ? num - 5 : minPrice;
      return newVal.toString();
    });
  };
  
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

  useEffect(() => {
    const loadData = async () => {
      try {
        if (!selectedVegetable) return; 
        const data = await VegetableService.getDailyPrices(selectedVegetable.id);
        const sortedData = data.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setLatestPrice(sortedData[0] || null);
      } catch (error) {
        console.error("Failed to fetch prices:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [selectedVegetable]); 

  useEffect(() => {
    if (latestPrice?.avg_price) {
      setPrice(latestPrice.avg_price.toString());
    }
  }, [latestPrice]);

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
      <BottomSheet ref={sheetRef} snapPoints={snapPoints} index={-1}  backdropComponent={(props) => (
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
        <BottomSheetView className="bg-gray-100 h-full z-10 "> 
          <MaterialIcons name="close" size={24} color="#253a6c" onPress={close} className="self-end mr-5"/>
          <View className="">
            <View className="w-full flex flex-row justify-center items-baseline gap-x-4">
              <Feather name="shopping-bag" size={24} color="#1f2937" />
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

            {hasSelectedVegetable && isVegetableAvailable && (  
            <View className="px-5 flex flex-col gap-y-7 mt-2">
              <View className="flex flex-row gap-x-5  ">
                <View className="flex flex-1 ">
                  <Text className="font-bold font-poppins text-MainTheme text-xl">
                    Offer Price
                  </Text>
                  <View className="">
                      <Input className="rounded-xl py-2 px-1 mt-3 h-14 bg-white" style={{ boxShadow: " 3px 3px 3px #d1d5db",}}>
                    
                    <InputField placeholder="₨ 0"  className="text-xl font-poppins" keyboardType="numeric"
                    value={price} onChangeText={(text) => { let num = parseInt(text) || 0; setPrice(num < minPrice ? minPrice.toString() : num.toString());}} />

                      <InputSlot  className='mr-1' onPress={handleDecrease}>
                        {/* <Entypo name="squared-minus" size={35} color="#253a6c" /> */}
                        <MaterialCommunityIcons name="minus" size={28} color="#253a6c" />
                      </InputSlot>

                      <Divider className="bg-gray-300 my-4 mx-2 font-bold" orientation="vertical" />

                      <InputSlot  className='mr-1' onPress={handleIncrease}>
                        {/* <Entypo name="squared-plus" size={28} color="#253a6c" /> */}
                        <MaterialCommunityIcons name="plus" size={28} color="#253a6c" />
                      </InputSlot>
                                      
                    </Input>
                    
                  </View>
                  
                <Text className="ps-2 pt-3 text-base text-MainTheme/70 "> Price Range: {latestPrice?.min_price} - {latestPrice?.max_price}</Text> 
                </View>

                <View className="flex w-1/3 ">
                      <Text className="font-bold font-poppins text-MainTheme text-xl">
                        {selectedVegetable.unit !== "Per Dozen" ? "Quantity /" : ""}{" "}
                        <Text>{selectedVegetable.unit}</Text>
                      </Text>

                      <Input
                        className="rounded-xl px-2 mt-3 h-14 py-2 bg-white flex flex-row items-center justify-between"
                        style={{ boxShadow: "3px 3px 3px #d1d5db" }}
                      >
                        <InputField
                          placeholder="0"
                          className="text-xl ml-2 flex-1"
                          value={unit}
                          onChangeText={setUnit}
                          keyboardType="numeric"
                        />

                        <Divider orientation="vertical" className="bg-gray-300 " />

                        {/* Up/Down buttons */}
                        <View className="flex flex-col ml-2">
                          <Entypo
                            name="chevron-up"
                            size={22}
                            color="#253a6c"
                          onPress={() => {
                            const current = parseFloat(unit) || 0;
                            const newVal = current + 0.5;
                            setUnit(newVal.toString());
                          }}
                          />
                          <Entypo
                            name="chevron-down"
                            size={22}
                            color="#253a6c"
                            onPress={() => {
                              const current = parseFloat(unit) || 0;
                              const newVal = Math.max(0.5, current - 0.5); // min 0.5
                              setUnit(newVal.toString());
                            }}
                          />
                        </View>
                      </Input>
                </View>

              </View>

              <View>
                <Text className="font-bold font-poppins text-MainTheme text-xl">
                  Your location
                </Text>
                <Input className="rounded-xl px-2 mt-3 h-14 bg-white" style={{ boxShadow: " 3px 3px 3px #d1d5db",}}>
                  <InputField placeholder="Enter your location" className="text-md ml-2" 
                  />

                  {query.length > 0 && (
                    <InputSlot  className='mr-1' onPress={clearSelection} >
                      <Ionicons name='close-outline' size={20} color="gray" />
                    </InputSlot>
                  )}                     
                </Input>  
              </View>

              <Pressable  className="w-full justify-center flex flex-row items-center mt-5 rounded-lg h-16 bg-[#243c6b]">
                <Text className='text-xl text-white font-bold' disabled={isLoading}>
                  Order Now
                </Text>
              </Pressable>
            </View>            
           
            )}

              {hasSelectedVegetable && !isVegetableAvailable && !isLoading && (
                <Box className="items-center justify-center py-12 px-5">
                  <Text className="text-gray-500 text-center">
                    The given vegetable is currently not available in the market. 
                  </Text>
                </Box>
              )}
            
          </View>
        </BottomSheetView>
      </BottomSheet>
  );
};

export default OrderActionSheet;
