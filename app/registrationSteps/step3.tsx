import { View} from 'react-native';
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control"
// import { VStack } from "@/components/ui/vstack"
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { 
  Select,
  SelectTrigger, 
  SelectInput, 
  SelectIcon, 
  SelectPortal, 
  SelectBackdrop, 
  SelectContent, 
  SelectDragIndicatorWrapper, 
  SelectDragIndicator, 
  SelectItem } from '@/components/ui/select';
  import { ChevronDownIcon } from "@/components/ui/icon"
import { IUser } from '@/types/userInterface';
import Toast from 'react-native-simple-toast';
import { Input, InputField } from '@/components/ui/input';

interface StepProps {
  data: IUser;
  setData: React.Dispatch<React.SetStateAction<IUser>>;
}

const Step3 = forwardRef(({ data, setData }: StepProps, ref) => {
 

    useImperativeHandle(ref, () => ({
    validate: () => {
      if (!data.city) {
        Toast.show('We need your city to proceed.', Toast.LONG, {
                  backgroundColor: '#253a6c',
                });
        return false;
      }
      return true;
    },
  }))
  return (
    
    <View className='flex-col py-8 justify-center gap-y-8 font-poppins'>
      <View className="w-full rounded-md flex flex-col ">
        <FormControl
          size="lg"
                  
        >
          <View className='relative '>
              <FormControlLabel className='mt-6 '>
                <FormControlLabelText className='text-md font-poppins'>City</FormControlLabelText>
              </FormControlLabel>
              <Input
              >
                <InputField value={data.city} onChangeText={(text) => setData({...data, city:text})}
                placeholder="Enter location here..." />
              </Input>
          </View>    
        </FormControl>

      </View>
    </View>
  );
});

export default Step3;

