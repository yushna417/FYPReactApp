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
import Toast from 'react-native-simple-toast'

interface StepProps {
  data: IUser;
  setData: React.Dispatch<React.SetStateAction<IUser>>;
}

const Step3 = forwardRef(({ data, setData }: StepProps, ref) => {
   const handleCityChange = (city: string) => {
    setData({ ...data, city });
  };

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
          // isDisabled={false}
          // isReadOnly={false}
          // isRequired={true}        
        >
          <View className='relative '>
              <FormControlLabel className='mt-6 '>
                <FormControlLabelText className='text-md font-poppins'>City</FormControlLabelText>
              </FormControlLabel>
              <Select onValueChange={handleCityChange} defaultValue={data.city} >
                <SelectTrigger variant="outline" size="lg" className='border h-14 rounded-xl justify-between'>
                  <SelectInput placeholder="Select option" />
                  <SelectIcon className="text-xl mr-2" as={ChevronDownIcon} size='lg' />
                </SelectTrigger>
                <SelectPortal className='absolute bottom-[22rem]'>
                  <SelectBackdrop />
                  <SelectContent  >
                    <SelectDragIndicatorWrapper>
                      <SelectDragIndicator />
                    </SelectDragIndicatorWrapper>
                    <SelectItem className='h-14' label="Kathmandu" value="KTM" />
                    <SelectItem className='h-14' label="Lalitpur" value="Lalitpur" />
                    <SelectItem className='h-14' label="Bhaktpur" value="Bhaktpur"  />
                  </SelectContent>
                </SelectPortal>
              </Select>
          </View>    
        </FormControl>

      </View>
    </View>
  );
});

export default Step3;

