import {View, Text, } from 'react-native';
import {
  FormControl,  
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control"
import { Input, InputField} from "@/components/ui/input"
// import { VStack } from "@/components/ui/vstack"
import React, { useImperativeHandle, forwardRef } from 'react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Feather from '@expo/vector-icons/Feather';

import { IUser } from '@/types/userInterface';
import Toast from 'react-native-simple-toast'


interface Step1Props {
  data: IUser;
  setData: React.Dispatch<React.SetStateAction<IUser>>;
}

const Step1 = forwardRef(({ data, setData }: Step1Props, ref) => {
  
    useImperativeHandle(ref, () => ({
    validate: () => {
     
      if (!data.full_name.trim()) {
        Toast.show('Full name is required.', Toast.LONG, {
          backgroundColor: '#253a6c',
        });
        return false;
      }
      if (!data.phone.trim()) {
        Toast.show('Phone number is required.', Toast.LONG, {
          backgroundColor: '#253a6c',
        });
        return false;
      }
      const digitsOnly = data.phone.replace(/\D/g, ''); 
      if (digitsOnly.length < 10) {
        Toast.show('Phone number must be at least 10 digits.', Toast.LONG, {
          backgroundColor: '#253a6c',
        });
        return false;
      }
      return true;
    },
  }));
 

  return (
    
    <View className='flex-col py-8 justify-center gap-y-8 font-poppins'>
      <View className="w-full rounded-md flex flex-col">
        <FormControl
          size="lg"
          isDisabled={false}
          isReadOnly={false}
          isRequired={true}
          className='gap-y-8 my-6'
        >
          <View>
            <FormControlLabel >
              <FormControlLabelText className='text-md font-poppins'>Full Name</FormControlLabelText>
            </FormControlLabel>
            <Input className="rounded-xl px-4 h-14 " >
              <FontAwesome5 name="user-alt" size={18} color="#2b2b2c" />  
              <InputField placeholder="Ravi Paudel"            
                className="text-md ml-2"
                value={data.full_name}
                onChangeText={(text) => setData({ ...data, full_name: text })}
              />
            </Input>
          </View>

          <View>
            <FormControlLabel >
              <FormControlLabelText className='text-md font-poppins'>Phone Number</FormControlLabelText>
            </FormControlLabel>
            <Input className="rounded-xl px-4 h-14 " >
              <Feather name="phone" size={20} color="black" />
              <InputField placeholder="98*****" keyboardType='numeric'           
                className="text-md ml-2"
                value={data.phone}
                onChangeText = {(text) => setData({...data, phone:text})}
              />
            </Input>
          </View>

               
          
        </FormControl>

        
      </View>
    </View>
  );
});

export default Step1;
