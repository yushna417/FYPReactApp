import { 
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  FormControl,  
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control"
// import { VStack } from "@/components/ui/vstack"
import React from 'react';
import { Box } from '@/components/ui/box';
// import { HStack } from '@/components/ui/hstack';
import { IUser, Role } from '@/types/userInterface';
import { forwardRef, useImperativeHandle } from 'react';
import Toast from 'react-native-simple-toast'

interface Step1Props {
  data: IUser;
  setData: React.Dispatch<React.SetStateAction<IUser>>;
}

const Step2 = forwardRef(({ data, setData }: Step1Props, ref) => {
  const [isInvalid, setIsInvalid] = React.useState(false);

  const handleRoleSelect = (role:Role) => {
    setData({...data, role})
    setIsInvalid(false);
  };

    useImperativeHandle(ref, () => ({
    validate: () => {
      if (!data.role) {
        Toast.show('Select role to continue', Toast.LONG, {
                  backgroundColor: '#253a6c',
                });
        return false;
      }
      return true;
    },
  }));

  return (
    <View className='flex-1 pt-14 pb-3'>
      <View className="flex-1 flex-col ">
        <FormControl >
          <View className='mb-8'>
            <FormControlLabel>
              <FormControlLabelText className='text-2xl font-poppins-bold text-gray-900'>
                What brings you here?
              </FormControlLabelText>
            </FormControlLabel>
            <Text className='text-MainTheme font-poppins mt-2'>
              Select your role to continue
            </Text>
          </View>

          <View className=' flex-row justify-between mb-8 flex'>
            <TouchableOpacity 
              onPress={() => handleRoleSelect('customer')}
              className={`items-center px-2 w-[45%] rounded-md pb-3 ${
                data.role === 'customer' 
                  ? ' bg-MainTheme border-blue-950' 
                  : ' border border-dashed border-gray-400 '
              }`}
            >
              <Box className="h-[9.5rem] w-28 ">
                <Image 
                  source={require('../../assets/images/projectImages/Customer.png')} 
                  className='w-full h-full'
                  resizeMode='contain'
                />
              </Box>
              <Text className={`font-poppins font-semibold text-xl ${data.role=== 'customer'?'text-white':'text-gray-900'}`}>Customer</Text>
              
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => handleRoleSelect('vendor')}
              className={`items-center px-1 w-[45%]  rounded-md pb-3 ${
                data.role === 'vendor' 
                
                  ? 'bg-MainTheme border-blue-950' 

                  : ' border border-dashed border-gray-400 '
              }`}
            >
              <Box className="h-[9.5rem] w-28  ">
                <Image 
                  source={require('../../assets/images/projectImages/Vendor.png')} 
                  className='w-full h-full'
                  resizeMode='contain'
                />
              </Box>
              <Text className={`font-poppins font-semibold text-xl ${data.role=== 'vendor'?'text-white':'text-gray-900'}`}>Vendor</Text>
              
            </TouchableOpacity>
          </View>

        </FormControl>

      </View>
    </View>
  );
});

export default Step2;