import React, { useMemo } from "react";
import { View, Text, Button } from "react-native";
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import { Input, InputField } from "../ui/input";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

interface OrderActionSheetProps {
  sheetRef: React.RefObject<BottomSheet | null>;
  close: () => void;
}

const OrderActionSheet: React.FC<OrderActionSheetProps> = ({ sheetRef, close }) => {
  const snapPoints = useMemo(() => ["25%", "50%", "85%"], []);

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
        <BottomSheetView className="bg-white h-full z-10 p-2"> 
          <View>
            <View className="flex flex-row">
              <Text className="text-MainTheme font-poppins font-bold text-2xl flex-1 text-center flex ">Place an Order</Text>
              <MaterialIcons name="close" size={24} color="#253a6c" onPress={close}/>
            </View>
            <View className="px-3">
              <Text></Text>
              <Input className=" rounded-xl px-4 mt-3 h-14">
                <FontAwesome5 name="lock" size={18} color="black" />
                <InputField placeholder="Enter a vegetable name" className="text-md ml-2" />                     
              </Input>  
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
  );
};

export default OrderActionSheet;
